import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../client')));

app.get('/api/sneakers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM sneakers ORDER BY releaseyear ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.use((req, res) => {
    res.status(404).sendFile(path.resolve(__dirname, '..', 'client', '404.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});