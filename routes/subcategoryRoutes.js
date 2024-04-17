import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  createSubCategoryController,
  updateSubCategoryController,
  deleteSubCategoryCOntroller,
  singleSubCategoryController,
  SubCategoryControlller,
} from "./../controllers/subcategoryController.js";

const router = express.Router();

//routes
// create subcategory
router.post(
  "/create-subcategory",
  requireSignIn,
  isAdmin,
  createSubCategoryController
);

//update subcategory
router.put(
  "/update-subcategory/:id",
  requireSignIn,
  isAdmin,
  updateSubCategoryController
);

//getALl subcategory
router.get("/get-subcategory",  SubCategoryControlller);

//single subcategory
router.get("/single-subcategory/:slug", singleSubCategoryController);

//delete subcategory
router.delete(
  "/delete-subcategory/:id",
  requireSignIn,
  isAdmin,
  deleteSubCategoryCOntroller
);

export default router;
