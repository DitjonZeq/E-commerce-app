import { useState, useEffect } from "react";
import axios from "axios";

export default function useNews() {
  const [News, setNews] = useState([]);

  //get news
  const getNews = async () => {
    try {
      const response = await axios.get('/api/v1/news/get-all-news');
      setNews(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return News;
}
