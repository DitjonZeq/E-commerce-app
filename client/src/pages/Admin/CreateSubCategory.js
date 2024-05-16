import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal, Select } from "antd";

import SubCategoryForm from "../../components/Form/SubCategoryForm";

const { Option } = Select;

const CreateSubCategory = () => {

    const [subCategories, setSubCategories] = useState([]);
  const [subname, setSubName] = useState("");
  
  const [visible, setVisible] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchKeyword, setSearchKeyword] = useState(""); // Shtimi i state për fjalën kyçe të kërkimit

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/subcategory/create-subcategory", {
        subname,
    
      });
      if (data?.success) {
        toast.success(`${subname} is created`);
    
        getAllSubCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while creating the subcategory");
    }
  };


 
  const getAllSubCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/subcategory/get-subcategory");
      if (data?.success) {
        setSubCategories(data?.subcategory);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting subcategories");
    }
  };

  useEffect(() => {
    getAllSubCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/subcategory/update-subcategory/${selectedSubCategory._id}`,
        { 
          subname: updatedName,
          category: selectedCategory
        }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelectedSubCategory(null);
        setUpdatedName("");

        setVisible(false);
     
        getAllSubCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating the subcategory");
    }
  };

  const handleDelete = async (subCategoryId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/subcategory/delete-subcategory/${subCategoryId}`
      );
      if (data.success) {
        toast.success(`Subcategory is deleted`);
    
        getAllSubCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting the subcategory");
    }
  };

  // Filtrimi i nën-kategorive në bazë të fjalës kyçe të kërkimit
  const filteredSubCategories = subCategories.filter((subcategory) =>
    subcategory.subname.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <Layout title={"Dashboard - Create SubCategory"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Subcategories</h1>
              <div className="p-3 w-50">
            

              <SubCategoryForm
                handleSubmit={handleSubmit}
                value={subname}
                setValue={setSubName}
      
              />
            </div>
            <div className="w-100">
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search subcategories..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <table className="table text-black">
                <thead>
                  <tr>
                    <th scope="col">Subcategory</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubCategories.map((s) => (
                    <tr key={s._id}>
                      <td>{s.subname}</td>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(s.subname);
                            setSelectedCategory(s.category);
                            setSelectedSubCategory(s);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => {
                            handleDelete(s._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <div className="p-3">
               
                <SubCategoryForm
                  value={updatedName}
                  setValue={setUpdatedName}
                  handleSubmit={handleUpdate}
                 s
                />
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateSubCategory;
