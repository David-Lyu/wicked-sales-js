require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    select "productId",
            "name",
            "price",
            "image",
            "shortDescription"
      from "products";
  `;
  db.query(sql)
    .then(results => res.json(results.rows))
    .catch(err => next(err));
});

app.get('/api/products/:id', (req, res, next) => {
  const parameterizedArray = [req.params.id];
  const sql = `
    select *
      from "products"
      where "productId" = $1;`;
  db.query(sql, parameterizedArray)
    .then(results => {
      if (results.rows.length === 0) {
        next(new ClientError(`cannot find id of ${req.params.id}`, 404));
      } else {
        res.json(results.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    return (
      res.status(200).json([])
    );
  }
  const parameterizedArray = [req.session.cartId];
  const sql = `
  select  "c"."cartItemId",
          "p"."image",
          "p"."name",
          "p"."price",
          "p"."productId",
          "p"."shortDescription"
    from "cartItems" as "c"
    join "products" as "p" using ("productId")
  where "cartId" = $1;`;
  db.query(sql, parameterizedArray)
    .then(results => res.status(200).json(results.rows))
    .catch(err => next(err));
});

app.post('/api/cart', (req, res, next) => {
  const productId = parseInt(req.body.productId);
  if (productId <= 0 || !productId) {
    return res.status(400).json({
      error: 'please input a valid product Id'
    });
  }

  const parameterizedArray = [productId];
  const sql1 = `
  select "price"
    from "products"
    where "productId" = $1;`;
  db.query(sql1, parameterizedArray)
    .then(results => {
      if (!results.rows.length) {
        throw new ClientError(`cannot find id at ${productId}`, 400);
      } else {

        let sql2 = null;
        if (req.session.cartId) {
          return ({
            cartId: req.session.cartId,
            price: results.rows[0].price
          });
        } else {
          sql2 = `
              insert into "carts" ("cartId","createdAt")
                values (default,default)
              returning "cartId";`;
        }

        return (
          db.query(sql2)
            .then(data => {
              return {
                cartId: data.rows[0].cartId,
                price: results.rows[0].price
              };
            })
        );
      }
    })
    .then(results => {
      req.session.cartId = results.cartId;
      const parametrizedArray2 = [results.cartId, productId, results.price];
      const sql3 = `
      insert into "cartItems" ("cartId", "productId", "price")
        values($1, $2, $3)
      returning "cartItemId"`;

      return (
        db.query(sql3, parametrizedArray2)
          .then(data => {
            return data.rows[0].cartItemId;
          })
      );
    })
    .then(results => {
      const parameterizedArray3 = [results];
      const sql4 = `
        select "c"."cartItemId",
                "c"."price",
                "p"."productId",
                "p"."image",
                "p"."name",
                "p"."shortDescription"
          from "cartItems" as "c"
          join "products" as "p" using ("productId")
        where "c"."cartItemId" = $1`;

      return (
        db.query(sql4, parameterizedArray3)
          .then(data => {
            res.status(201).json(data.rows[0]);
          })
      );
    })
    .catch(err => next(err));
});

app.delete('/api/cart/:cartItemId', (req, res, next) => {
  const cartItemId = req.params.cartItemId;
  if (!cartItemId) return res.status(404).json({ error: 'cartItemId not found' });
  const sql = `
  delete from "cartItems"
  where "cartItemId" = $1
  returning *
  `;
  db.query(sql, [cartItemId])
    .then(data => res.status(201).json(data.rows))
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  if (req.session.cartId) {
    const bodyData = req.body;
    if (bodyData.name && bodyData.creditCard && bodyData.shippingAddress) {
      const parameterizedArray = [req.session.cartId, bodyData.name, bodyData.creditCard, bodyData.shippingAddress];
      const sql = `
      insert into "orders" ("cartId","name","creditCard","shippingAddress")
        values($1,$2,$3,$4)
      returning "orderId",
                "createdAt",
                "name",
                "creditCard",
                "shippingAddress";`;
      db.query(sql, parameterizedArray)
        .then(results => {
          req.session.destroy(err => console.error(err));
          res.status(201).json(results.rows[0]);
        })
        .catch(err => next(err));
    } else {
      return res.status(404).json({ error: 'missing name creditcard or shipping address information' });
    }
  } else {
    return res.status(400).json({ error: 'no cartId on session' });
  }
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
