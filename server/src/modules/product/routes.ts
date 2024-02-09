import { Application } from "express";
import TriggerValidator from "./validator";
import TriggerController from "./controller";
import { responseHandler } from "../../helpers/HTTPResponseHandler";
import { upload } from "../../library/multer";

export const ProductRoutes = (app: Application) => {
  const Validator = TriggerValidator();
  const Controller = TriggerController();

  app.get(
    "/api/product",
    responseHandler({
      validator: Validator.getAllProducts,
      controller: Controller.getAllProducts,
    })
  );

  app.post(
    "/api/product",
    responseHandler({
      validator: Validator.addProduct,
      controller: Controller.addProduct,
      props: (req) => [req.body],
    })
  );

  app.put(
    "/api/product",
    responseHandler({
      validator: Validator.updateProduct,
      controller: Controller.updateProduct,
      props: (req) => [req.body],
    })
  );

  app.delete(
    "/api/product/:_id",
    responseHandler({
      validator: Validator.deleteProduct,
      controller: Controller.deleteProduct,
      props: (req) => [req.params],
    })
  );

  app.post(
    "/api/product/upload/:_id",
    upload.single("image"),
    responseHandler({
      validator: Validator.upload,
      controller: Controller.upload,
      props: (req) => [req.file, req.params],
    })
  );
};
