import './dotenv.js';
import { pool } from './database.js';
import sneakersData from '../data/sneakers.js';

const createSneakersTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS sneakers;

        CREATE TABLE IF NOT EXISTS sneakers (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            brand VARCHAR(255) NOT NULL,
            releaseYear INT NOT NULL,
            description TEXT,
            image TEXT
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('👟 Sneakers table created successfully');
    } catch (err) {
        console.error('⚠️ Error creating sneakers table', err);
    }
};

const seedSneakersTable = async () => {
    await createSneakersTable();

    for (const sneaker of sneakersData) {
        const insertQuery = {
            text: 'INSERT INTO sneakers (name, brand, releaseYear, description, image) VALUES ($1, $2, $3, $4, $5)',
            values: [sneaker.name, sneaker.brand, sneaker.releaseYear, sneaker.description, sneaker.image]
        };

        try {
            await pool.query(insertQuery);
            console.log(`✅ Added ${sneaker.name}`);
        } catch (err) {
            console.error('⚠️ Error inserting sneaker', err);
        }
    }
};

seedSneakersTable();