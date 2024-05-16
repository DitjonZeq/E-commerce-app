import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
 
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
