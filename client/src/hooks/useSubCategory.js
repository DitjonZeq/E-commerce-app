import { useState, useEffect } from "react";
import axios from "axios";

export default function useSubCategory() {
  const [subcategories, setSubCategories] = useState([]);

  //get subcat
  const getSubCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/subcategory/get-subcategory");
      setSubCategories(data?.subcategory);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubCategories();
  }, []);

  return subcategories;
}
