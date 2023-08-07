const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");
const OrderRouter = require("./OrderRouter");
const PaymentRouter = require("./PaymentRouter");

const routes = (app) => {
  app.use("/api/User", UserRouter);
  app.use("/api/Product", ProductRouter);
  app.use("/api/Order", OrderRouter);
  app.use("/api/Payment", PaymentRouter);
};

module.exports = routes;
