const sneakerListContainer = document.getElementById('sneaker-list');

const renderSneakers = (sneakers) => {
    sneakerListContainer.innerHTML = ''; // Clear any old content

    sneakers.forEach(sneaker => {
        const sneakerCard = document.createElement('article');

        sneakerCard.innerHTML = `
            <header>
                <img src="${sneaker.image}" alt="${sneaker.name}">
            </header>
            <div class="card-body">
                <h3>${sneaker.name}</h3>
                <p><strong>${sneaker.brand}</strong> - ${sneaker.releaseyear}</p>
                <p>${sneaker.description}</p>
            </div>
        `;
        sneakerListContainer.appendChild(sneakerCard);
    });
};

const fetchAndRenderSneakers = async () => {
    try {
        const response = await fetch('/api/sneakers');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const sneakers = await response.json();
        renderSneakers(sneakers);
    } catch (error) {
        console.error('Failed to fetch sneakers:', error);
        sneakerListContainer.innerHTML = '<p>Could not load sneakers. Please try again later.</p>';
    }
};

// Initial load
fetchAndRenderSneakers();