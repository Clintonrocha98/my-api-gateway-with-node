import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.disable('x-powered-by');

const services = [
  { route: "/users", target: "http://localhost:3333/users" },
  { route: "/orders", target: "http://localhost:4444/orders" },
  { route: "/products", target: "http://localhost:5555/products" },
]

const rateLimit = 20;
const interval = 60 * 1000;

const requestCounts = {};

setInterval(() => {
  Object.keys(requestCounts).forEach((ip) => {
    requestCounts[ip] = 0;
  });
}, interval);

function rateLimitAndTimeout(req, res, next) {
  const ip = req.ip;

  requestCounts[ip] = (requestCounts[ip] || 0) + 1;

  if (requestCounts[ip] > rateLimit) {
    return res.status(429).json({
      code: 429,
      status: "Error",
      message: "Rate limit exceeded.",
      data: null,
    });
  }

  req.setTimeout(15000, () => {
    res.status(504).json({
      code: 504,
      status: "Error",
      message: "Gateway timeout.",
      data: null,
    });
    req.abort();
  });
  next();
}

app.use(rateLimitAndTimeout);

services.forEach(({ route, target }) => {
  const proxyOptions = {
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^${route}`]: "",
    },
  };

  app.use(route, rateLimitAndTimeout, createProxyMiddleware(proxyOptions));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
 console.log(`Gateway is running on port ${PORT}`);
});