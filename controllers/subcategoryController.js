import subcategoryModel from "../models/subcategoryModel.js";
import slugify from "slugify";
export const createSubCategoryController = async (req, res) => {
  try {
    const { subname, category } = req.body; 

    if (!subname) {
      return res.status(401).send({ message: "SubName is required" });
    }
    if (!category) { 
      return res.status(401).send({ message: "Category is required" });
    }

    const existingSubCategory = await subcategoryModel.findOne({ subname });

    if (existingSubCategory) {
      return res.status(200).send({
        success: false,
        message: "SubCategory Already Exists",
      });
    }

    const subcategory = await new subcategoryModel({
      subname,
      category, // Include category in the subcategory creation
      slug: slugify(subname),
    }).save();

    res.status(201).send({
      success: true,
      message: "New subcategory created",
      subcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in SubCategory",
    });
  }
};

//update category
export const updateSubCategoryController = async (req, res) => {
  try {
    const { subname, category } = req.body; // Destructure subname and category from req.body
    const { id } = req.params;

    // Check if subname is provided and it's a string
    if (!subname || typeof subname !== 'string') {
      return res.status(400).send({ message: "Valid SubName is required" });
    }

    const subcategory = await subcategoryModel.findByIdAndUpdate(
      id,
      { subname, category, slug: slugify(subname) }, // Update subname, category, and slug
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "SubCategory Updated Successfully",
      subcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating subcategory",
    });
  }
};


// get all cat
export const SubCategoryControlller = async (req, res) => {
  try {
    const subcategory = await subcategoryModel.find({})
    res.status(200).send({
      success: true,
      message: "All SubCategories List",
      subcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

// single category
export const singleSubCategoryController = async (req, res) => {
  try {
    const subname = await subcategoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get SIngle SubCategory SUccessfully",
      subname,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single SubCategory",
    });
  }
};

//delete category
export const deleteSubCategoryCOntroller = async (req, res) => {
  try {
    const { id } = req.params;
    await subcategoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "SubCategry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting subcategory",
      error,
    });
  }
};
