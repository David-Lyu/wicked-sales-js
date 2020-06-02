--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE ONLY public."cartItems" DROP CONSTRAINT "cartItems_pkey";
ALTER TABLE public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE public."products_productId_seq";
DROP TABLE public.products;
DROP SEQUENCE public."orders_orderId_seq";
DROP TABLE public.orders;
DROP SEQUENCE public."carts_cartId_seq";
DROP TABLE public.carts;
DROP SEQUENCE public."cartItems_cartItemId_seq";
DROP TABLE public."cartItems";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
1	30	1	2999
2	31	1	2999
3	32	1	2999
4	33	1	2999
5	34	1	2999
6	35	1	2999
7	36	1	2999
8	37	1	2999
9	38	1	2999
10	39	1	2999
11	40	1	2999
12	41	1	2999
13	42	1	2999
14	43	1	2999
15	44	1	2999
16	45	1	2999
17	46	1	2999
18	47	1	2999
19	48	1	2999
20	49	1	2999
21	50	2	2595
22	50	2	2595
23	50	2	2595
24	50	1	2999
25	50	1	2999
26	51	1	2999
27	51	1	2999
28	52	1	2999
29	52	2	2595
30	52	1	2999
31	52	2	2595
32	52	3	2900
33	52	2	2595
34	52	2	2595
35	52	2	2595
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
1	2020-04-24 15:29:11.763731-07
2	2020-04-24 15:30:55.52783-07
3	2020-04-24 15:31:29.708039-07
4	2020-04-24 15:31:57.135295-07
5	2020-04-24 15:32:20.350676-07
6	2020-04-24 15:33:43.852279-07
7	2020-04-24 15:36:07.943179-07
8	2020-04-24 15:37:39.922012-07
9	2020-04-24 15:39:31.21586-07
10	2020-04-24 15:39:37.766337-07
11	2020-04-24 15:44:55.876833-07
12	2020-04-24 16:51:14.160557-07
13	2020-04-24 16:51:41.795913-07
14	2020-04-24 16:53:37.279145-07
15	2020-04-24 16:54:01.797506-07
16	2020-04-24 16:57:31.99239-07
17	2020-04-24 16:57:44.525859-07
18	2020-04-24 16:59:10.104554-07
19	2020-04-24 17:03:57.172142-07
20	2020-04-24 17:07:55.028343-07
21	2020-04-24 17:11:38.171648-07
22	2020-04-24 17:11:55.790837-07
23	2020-04-24 17:12:20.289218-07
24	2020-04-24 17:16:48.7182-07
25	2020-04-24 20:47:24.721755-07
26	2020-04-24 20:48:24.525645-07
27	2020-04-24 20:50:46.024311-07
28	2020-04-24 20:58:19.362726-07
29	2020-04-24 20:59:05.095186-07
30	2020-04-24 21:15:43.109552-07
31	2020-04-24 21:43:10.102697-07
32	2020-04-24 21:43:47.501775-07
33	2020-04-24 21:44:03.199185-07
34	2020-04-24 21:44:52.783115-07
35	2020-04-24 21:51:53.886146-07
36	2020-04-24 21:52:07.00768-07
37	2020-04-24 21:52:32.590371-07
38	2020-04-24 21:54:27.089818-07
39	2020-04-24 21:55:17.688515-07
40	2020-04-24 21:55:28.272205-07
41	2020-04-24 21:56:04.701406-07
42	2020-04-24 21:58:25.12907-07
43	2020-04-24 21:59:02.648466-07
44	2020-04-24 22:00:22.448767-07
45	2020-04-24 22:06:53.749296-07
46	2020-04-24 22:08:29.560538-07
47	2020-04-24 22:10:08.85798-07
48	2020-04-24 22:10:18.286822-07
49	2020-04-24 22:11:13.184039-07
50	2020-04-24 22:11:37.038702-07
51	2020-04-25 08:19:36.898404-07
52	2020-04-25 10:11:07.032542-07
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
1	Cristian Table Lamp	1999	/images/Cristian_Table_Lamp.jpg	A 9.45 in. ceramic lamp with a 60 in. electrical cord	Perfect for the bedside table, this petite 9.45" table lamp brightens any space in modern style! Crafted of ceramic in a colored eggshell finish, this lamp strikes a smooth, round silhouette. Up top, a matching fabric tapered drum shade ensconces one 40 W incandescent E12 candelabra base bulb (not included) to diffuse bright light as it’s dispersed throughout your space. Powered by a 60" length of a black electric cord, this lamp is operated by a simple rotary switch
2	Prometheus Torchiere Floor Lamp	125286	/images/Prometheus_Torchiere_Floor_Lamp.jpg	6.2ft sculpture of Prometheus from Greek Mythology	Prometheus, just as when he bestowed Zeus's stolen fire upon mortals, lights night with this exquisite sculptural lamp patterned after 19th century original sculpture. Our more than six-foot-tall, near life-sized masterpiece incorporates idealized male form into blend of art and architecture. Our exclusive, faux verdigris bronze, quality designer resin lamp with pedal switch becomes an exquisite 360-degree sculptural work of art topped with stunning quality glass shade for your 60-watt bulb.
3	Tripod Floor Lamp	46500	/images/Tripod_Floor_Lamp.png	4.4ft Lamp with a tripod base	Designed by Chapman & Myers This lamp with a French Waxed Wood finish can decore any room. With a height of 61in and width of 21in. Socket uses an E26 Hi-Lo
4	Fiddle Leaf Fig	19500	/images/bloomscape_product-fiddle-leaf-fig-stone-2.jpg	Tall, sculptural, and dramatic. This plant will flourish in the right conditions.	The Fiddle Leaf Fig grows to about 44in - 58in tall and needs moderate care with indirect sunlight. Can cause slight discomfort with pets such as irritation and digestive reactions. Can help clean formaldehyde from air
5	Faux Potted Trailing Succulent	19500	/images/Faux-Potted-Trailing-Succulent+Eva-White-Ceramic-Planter Bundle.jpg	A faux(fake) Succulent that looks good year round, with a Ceramic pot.	Always on trend, succulents instantly add life to any space. Potted in a ceramic container, you'd never know this Trailing Succulent is faux. It’ll look fresh year round—best of all, you never have to water it.
6	Juniper Bonsai	2799	/images/Juniper-bonsai.jpg	A juniper bonsai plant, that's green all year	Surprise someone special with one of our most popular bonsai plants! Easy to care for, this unique variety is a wonderful choice for beginners or experts alike and keeps its beautiful green color throughout the year. Each one is skillfully sculpted and nurtured with great care, making it a truly original gift that will grow into an individual work of art.
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 35, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 52, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 1, false);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

