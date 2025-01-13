const accessKey = "MiiwpOYiPq_ozExYPpi8dGMZyz3PGG08MKyqASYPCG0";
const url = `https://api.unsplash.com/search/photos?query=`;
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const imagesContainer = document.getElementById("images-container");
const loadMoreButton = document.getElementById("load-more-button");
const darkModeButton = document.getElementById("dark-mode-button");

let page = 1;
loadMoreButton.style.display = 'none';
// Fetch Images Function
const fetchImages = async (query, pageNo) => {
    try {
        if (pageNo === 1) {
            imagesContainer.innerHTML = "";
        }
        const response = await fetch(
            `${url}${query}&per_page=20&page=${pageNo}&client_id=${accessKey}`
        );
        const data = await response.json();

        if (data.results.length > 0) {
            data.results.forEach((photo) => {
                const card = document.createElement("div");
                card.classList.add("image-card");

                const img = document.createElement("img");
                img.src = photo.urls.small;
                img.alt = photo.alt_description;

                const overlay = document.createElement("div");
                overlay.classList.add("image-overlay");
                overlay.textContent = photo.alt_description || "No description";

                card.appendChild(img);
                card.appendChild(overlay);
                imagesContainer.appendChild(card);
            });

            if (data.total_pages === pageNo) {
                loadMoreButton.style.display = "none";
            } else {
                loadMoreButton.style.display = "block";
            }
        } else {
            imagesContainer.innerHTML = `<h2>No images found</h2>`;
        }
    } catch (error) {
        imagesContainer.innerHTML = `<h2>Failed to fetch images. Please try again later.</h2>`;
    }
};

// Search Form Submit
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        page = 1;
        fetchImages(query, page);
    } else {
        alert("Please enter a search term.");
    }
});

// Load More Button
loadMoreButton.addEventListener("click", () => {
    fetchImages(searchInput.value.trim(), ++page);
});

// Dark Mode Toggle
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    darkModeButton.textContent = "☀️";
} else {
    darkModeButton.textContent = "🌙";
}

darkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    darkModeButton.textContent = isDarkMode ? "☀️" : "🌙";
});
