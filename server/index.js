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
  const sql = `
  select *
    from "carts";`;
  db.query(sql)
    .then(results => process.stdout.write(results.rows))
    .catch(err => next(err));
});

app.post('/api/cart', (req, res, next) => {
  const productId = req.body.productId;
  if (productId <= 0) {
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
        return next(new ClientError(`cannot find id at ${productId}`), 400);
      } else {
        const innerSql = `
          insert into "carts" ("cartId","createdAt")
            values (default,default)
          returning "cartId";`;
        process.stdout.write(innerSql);
        return db.query(innerSql);
      }
    })
    .then(data => process.stdout.write(data.rows));
  // .catch(err => next(err));
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
