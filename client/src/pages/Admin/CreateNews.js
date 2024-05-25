import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";

function CreateNews() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState(""); 
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('/api/v1/news/get-all-news');
      setNewsList(response.data);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  const addOrUpdateNews = async () => {
    if (!title.trim() || !description.trim()) {
      console.log("Title and description are required");
      return;
    }

    try {
      if (editId) {
        await axios.put(`/api/v1/news/update-news/${editId}`, { title, description });
        console.log("News updated successfully");
      } else {
        await axios.post('/api/v1/news/create-news', { title, description });
        console.log("News added successfully");
      }
      setTitle('');
      setDescription('');
      setEditId(null);
      fetchNews(); // Refresh news list after adding/updating news
    } catch (err) {
      console.error("Error adding/updating news:", err);
    }
  };

  const deleteNews = async (id) => {
    try {
      await axios.delete(`/api/v1/news/delete-news/${id}`);
      console.log("News deleted successfully");
      fetchNews(); // Refresh news list after deleting news
    } catch (err) {
      console.error("Error deleting news:", err);
    }
  };

  const startEdit = (data) => {
    setTitle(data.title);
    setDescription(data.description);
    setEditId(data.id);
  };

  // Filter news based on searchKeyword
  const filteredNewsList = newsList.filter(news =>
    news.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className='container-fluid'>
      <div className='row justify-content-center align-items-center' style={{ height: '60vh' }}>
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
          <div className="mb-3">
            <button className='btn btn-success' onClick={addOrUpdateNews}>
              {editId ? "Update News" : "Add News"}
            </button>
          </div>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search news..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
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
                    <button className="btn btn-danger" onClick={() => deleteNews(news.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CreateNews;
 
