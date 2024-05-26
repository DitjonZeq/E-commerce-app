import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "./../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import toast from "react-hot-toast";
import * as XLSX from "xlsx"; 

function CreateNews() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState(""); 
  const [newsList, setNewsList] = useState([]);
  const [importedFile, setImportedFile] = useState(null); 

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('/api/v1/news/get-all-news');
      setNewsList(response.data);
    } catch (err) {
      toast.error("Error fetching news");
      console.error("Error fetching news:", err);
    }
  };

  const addOrUpdateNews = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Title and description are required");
      return;
    }

    try {
      if (editId) {
        await axios.put(`/api/v1/news/update-news/${editId}`, { title, description });
        toast.success("News updated successfully");
      } else {
        await axios.post('/api/v1/news/create-news', { title, description });
        toast.success("News added successfully");
      }
      setTitle('');
      setDescription('');
      setEditId(null);
      fetchNews();
    } catch (err) {
      toast.error("Error adding/updating news");
      console.error("Error adding/updating news:", err);
    }
  };

  const deleteNews = async (id) => {
    try {
      await axios.delete(`/api/v1/news/delete-news/${id}`);
      toast.success("News deleted successfully");
      fetchNews();
    } catch (err) {
      toast.error("Error deleting news");
      console.error("Error deleting news:", err);
    }
  };

  const startEdit = (data) => {
    setTitle(data.title);
    setDescription(data.description);
    setEditId(data.id);
  };

  const filteredNewsList = newsList.filter(news =>
    news.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const exportToExcel = () => {
    const data = newsList.map(news => [news.title, news.description]);
    const ws = XLSX.utils.aoa_to_sheet([["Title", "Description"], ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "News");
    XLSX.writeFile(wb, "news.xlsx");
    toast.success("News exported to Excel");
  };

  const importFromExcel = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const importedNewsList = data.slice(1).map(row => ({ title: row[0], description: row[1] }));
      setImportedFile(importedNewsList);
      toast.success("File imported successfully. Click 'Save Imported File' to apply changes.");
    };
    reader.readAsBinaryString(file);
  };

  const saveImportedFile = async () => {
    if (importedFile) {
      try {
        for (const news of importedFile) {
          await axios.post('/api/v1/news/create-news', news);
        }
        setImportedFile(null); 
        toast.success("File imported successfully");
        fetchNews();
      } catch (error) {
        toast.error("Error importing file");
        console.error("Error saving imported news:", error);
      }
    } else {
      toast.error("No file imported");
    }
  };

  return (
    <Layout title={"Dashboard - Manage News"}>
      <div className='container-fluid'>
        <div className='row justify-content-center align-items-center' style={{ height: '100vh' }}>
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className='col-lg-8'>
            <h1 className="text-center">Manage News</h1>
            
            <div className="mb-3">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
                placeholder="Title"
              />
            </div>
            <div className="mb-3">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
                placeholder="Description"
              ></textarea>
            </div>
            <div className="mb-3 d-flex justify-content-between">
              <button className='btn btn-success' onClick={addOrUpdateNews}>
                {editId ? "Update News" : "Add News"}
              </button>
              <button className='btn btn-info' onClick={exportToExcel}>Export to Excel</button>
            </div>
            <div className="mb-3 d-flex justify-content-between">
              <input
                type="file"
                className="form-control"
                onChange={importFromExcel}
              />
              <button className='btn btn-success' onClick={saveImportedFile}>Save Imported File</button>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search news..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNewsList.map((news) => (
                  <tr key={news.id}>
                    <td>{news.title}</td>
                    <td>{news.description}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => startEdit(news)}>Edit</button>
                    </td>
                    <td>
                      <button className="btn btn-danger" onClick={() => deleteNews(news.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateNews;
