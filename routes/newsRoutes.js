import express from 'express';

const router = express.Router();

const newsRoutes = (db) => {
  // Create news
  router.post('/create-news', (req, res) => {
    const { title, description } = req.body;
    const sql = 'INSERT INTO news (title, description) VALUES (?, ?)';
    db.query(sql, [title, description], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        console.log("News created successfully");
        res.status(201).send('News created successfully');
      }
    });
  });

  // Update news
  router.put('/update-news/:id', (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const sql = 'UPDATE news SET title = ?, description = ? WHERE id = ?';
    db.query(sql, [title, description, id], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send('News updated successfully');
      }
    });
  });

  // Delete news
  router.delete('/delete-news/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM news WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send('News deleted successfully');
      }
    });
  });

  // Get all news
  router.get('/get-all-news', (req, res) => {
    const sql = 'SELECT * FROM news';
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(result);
      }
    });
  });

  return router;
};

export default newsRoutes;
