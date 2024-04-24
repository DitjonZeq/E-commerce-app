import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal, Select } from "antd";

import SubCategoryForm from "../../components/Form/SubCategoryForm";

const { Option } = Select;

const CreateSubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subname, setSubname] = useState("");
  const [category, setCategory] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/subcategory/create-subcategory", {
        subname,
        category
      });
      if (data?.success) {
        toast.success(`${subname} is created`);
        getAllCategory();
        getAllSubCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while creating the subcategory");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

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
        setSelectedCategory("");
        setVisible(false);
        getAllCategory();
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
        getAllCategory();
        getAllSubCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting the subcategory");
    }
  };

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
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <SubCategoryForm
                handleSubmit={handleSubmit}
                value={subname}
                setValue={setSubname}
                categories={categories}
              />
            </div>
            <div className="w-100">
              <table className="table text-black">
                <thead>
                  <tr>
                    <th scope="col">Category</th>
                    <th scope="col">Subcategory</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subCategories.map((s) => (
                    <tr key={s._id}>
                      <td>{categories.find(c => c._id === s.category)?.name}</td>
                      <td>{s.subname}</td>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(s.subname);
                            setSelectedCategory(s.category._id);
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
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => setSelectedCategory(value)}
                  value={selectedCategory}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
                <SubCategoryForm
                  value={updatedName}
                  setValue={setUpdatedName}
                  handleSubmit={handleUpdate}
                  categories={categories}
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
