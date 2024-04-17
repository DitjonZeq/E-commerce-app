import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  category: {
    type: mongoose.ObjectId,
    ref: "Category",
    required: true,
  },
 subname: {
    type: String,
   // required: true,
    // unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

export default mongoose.model("SubCategory", subcategorySchema);
