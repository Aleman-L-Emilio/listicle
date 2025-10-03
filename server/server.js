import express from 'express';
import path from 'path';
import { pool } from './config/database.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('client'));

app.get('/api/sneakers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM sneakers ORDER BY releaseYear ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.resolve('client', '404.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});