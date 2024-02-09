import { Application } from "express";
import TriggerValidator from "./validator";
import TriggerController from "./controller";
import { responseHandler } from "../../helpers/HTTPResponseHandler";

export const CartRoutes = (app: Application) => {
  const Validator = TriggerValidator();
  const Controller = TriggerController();

  // app.get(
  //   "/api/cart",
  //   responseHandler({
  //     validator: Validator.getAllProducts,
  //     controller: Controller.getAllProducts,
  //   })
  // );

  app.post(
    "/api/cart",
    responseHandler({
      validator: Validator.addToCart,
      controller: Controller.addToCart,
      props: (req) => [req.body],
    })
  );

  // app.put(
  //   "/api/cart",
  //   responseHandler({
  //     validator: Validator.updateProduct,
  //     controller: Controller.updateProduct,
  //     props: (req) => [req.body],
  //   })
  // );

  // app.delete(
  //   "/api/cart/:_id",
  //   responseHandler({
  //     validator: Validator.deleteProduct,
  //     controller: Controller.deleteProduct,
  //     props: (req) => [req.params],
  //   })
  // );
};
