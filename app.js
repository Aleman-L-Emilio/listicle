const express = require('express');
const path = require('path');
const sneakers = require('./data/sneakers');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const sneakerCards = sneakers.map(sneaker => {
    return `
      <article>
        <header>
          <a href="/sneakers/${sneaker.id}">
            <h3>${sneaker.name}</h3>
          </a>
        </header>
        <img src="${sneaker.image}" alt="${sneaker.name}" style="width:100%; border-radius:8px;">
        <footer>
          <strong>${sneaker.brand}</strong> - ${sneaker.releaseYear}
        </footer>
      </article>
    `;
  }).join('');

  res.send(`
    <!DOCTYPE html>
    <html lang="en" data-theme="light">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>The Ultimate Sneaker Collection</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css">
    </head>
    <body>
      <main class="container">
        <h1 style="text-align: center;">The Ultimate Sneaker Collection 👟</h1>
        <div class="grid">
          ${sneakerCards}
        </div>
      </main>
    </body>
    </html>
  `);
});

app.get('/sneakers/:id', (req, res) => {
  const sneaker = sneakers.find(s => s.id === req.params.id);

  if (!sneaker) {
    return res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="en" data-theme="light">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${sneaker.name}</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css">
    </head>
    <body>
      <main class="container">
        <article>
          <header>
            <a href="/" role="button" class="secondary">&larr; Back to Collection</a>
            <h2>${sneaker.name}</h2>
          </header>
          <img src="${sneaker.image}" alt="${sneaker.name}">
          <p>
            <strong>Brand:</strong> ${sneaker.brand} <br>
            <strong>Release Year:</strong> ${sneaker.releaseYear}
          </p>
          <p>${sneaker.description}</p>
        </article>
      </main>
    </body>
    </html>
  `);
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT} 👟`);
});