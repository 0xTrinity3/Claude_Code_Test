// Global variables
let currentYachts = [];
let allYachts = [];
let currentFilters = {
    search: '',
    types: [],
    price: '',
    length: '',
    year: '',
    builder: ''
};

// API base URL
const API_BASE_URL = config.API_BASE_URL || 'http://localhost:3000/api';

// Utility functions
function formatPrice(price) {
    if (price >= 1000000) {
        return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${(price / 1000).toLocaleString()}`;
}

function formatNumber(num) {
    return num.toLocaleString();
}

function getYachtIcon(type) {
    const icons = {
        motor: '🛥️',
        sailing: '⛵',
        catamaran: '🚤',
        expedition: '🚢'
    };
    return icons[type] || '🛥️';
}

// API functions
async function fetchYachts(filters = {}) {
    try {
        const params = new URLSearchParams();

        if (filters.search) params.set('search', filters.search);
        if (filters.types && filters.types.length > 0) {
            filters.types.forEach(type => params.append('type', type));
        }
        if (filters.builder) params.set('builder', filters.builder);
        if (filters.location) params.set('location', filters.location);

        // Price range
        if (filters.price) {
            const [min, max] = filters.price.split('-');
            if (min) params.set('minPrice', min);
            if (max) params.set('maxPrice', max);
        }

        // Length range
        if (filters.length) {
            const [min, max] = filters.length.split('-');
            if (min) params.set('minLength', min);
            if (max) params.set('maxLength', max);
        }

        // Year range
        if (filters.year) {
            const [min, max] = filters.year.split('-');
            if (min) params.set('minYear', min);
            if (max) params.set('maxYear', max);
        }

        const response = await fetch(`${API_BASE_URL}/yachts?${params.toString()}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.yachts || [];
    } catch (error) {
        console.error('Error fetching yachts:', error);
        showError('Unable to load yachts. Please make sure the backend server is running.');
        return [];
    }
}

async function fetchFeaturedYachts() {
    try {
        const response = await fetch(`${API_BASE_URL}/yachts/featured`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.yachts || [];
    } catch (error) {
        console.error('Error fetching featured yachts:', error);
        showError('Unable to load featured yachts.');
        return [];
    }
}

async function fetchYachtById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/yachts/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.yacht || null;
    } catch (error) {
        console.error('Error fetching yacht:', error);
        return null;
    }
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #dc3545; color: white; padding: 1rem 2rem; border-radius: 4px; z-index: 10000; box-shadow: 0 4px 8px rgba(0,0,0,0.2);';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Create yacht card HTML
function createYachtCard(yacht) {
    return `
        <div class="yacht-card" onclick="viewYacht(${yacht.id})">
            <div class="yacht-image">
                ${yacht.featured ? '<span class="yacht-featured">Featured</span>' : ''}
                ${getYachtIcon(yacht.type)}
            </div>
            <div class="yacht-info">
                <h3 class="yacht-name">${yacht.name}</h3>
                <p class="yacht-builder">${yacht.builder} ${yacht.year}</p>
                <div class="yacht-specs">
                    <div class="spec-item">
                        <span class="spec-label">Length:</span>
                        <span class="spec-value">${yacht.length}ft</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Guests:</span>
                        <span class="spec-value">${yacht.guests}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Type:</span>
                        <span class="spec-value">${yacht.type.charAt(0).toUpperCase() + yacht.type.slice(1)}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Location:</span>
                        <span class="spec-value">${yacht.location}</span>
                    </div>
                </div>
                <div class="yacht-price">${formatPrice(parseFloat(yacht.price))}</div>
            </div>
        </div>
    `;
}

// Display yachts on page
function displayYachts(yachts, containerId = 'yacht-listings') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (yachts.length === 0) {
        container.innerHTML = '';
        const noResults = document.getElementById('no-results');
        if (noResults) noResults.style.display = 'block';
        return;
    }

    const noResults = document.getElementById('no-results');
    if (noResults) noResults.style.display = 'none';

    container.innerHTML = yachts.map(yacht => createYachtCard(yacht)).join('');
}

// Update results count
function updateResultsCount(count) {
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        resultsCount.textContent = `${count} yacht${count !== 1 ? 's' : ''} found`;
    }
}

// Filter functions
async function applyFilters() {
    updateResultsCount('Loading...');
    currentYachts = await fetchYachts(currentFilters);
    displayYachts(currentYachts);
    updateResultsCount(currentYachts.length);
}

// Reset all filters
async function resetFilters() {
    currentFilters = {
        search: '',
        types: [],
        price: '',
        length: '',
        year: '',
        builder: ''
    };

    // Reset form inputs
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';

    const typeCheckboxes = document.querySelectorAll('.type-filter');
    typeCheckboxes.forEach(cb => cb.checked = false);

    const selects = ['price-filter', 'length-filter', 'year-filter', 'builder-filter'];
    selects.forEach(id => {
        const select = document.getElementById(id);
        if (select) select.value = '';
    });

    await applyFilters();
}

// Sort listings
function sortListings() {
    const sortSelect = document.getElementById('sort-select');
    if (!sortSelect) return;

    const sortValue = sortSelect.value;
    let sorted = [...currentYachts];

    switch (sortValue) {
        case 'price-desc':
            sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            break;
        case 'price-asc':
            sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            break;
        case 'length-desc':
            sorted.sort((a, b) => b.length - a.length);
            break;
        case 'year-desc':
            sorted.sort((a, b) => b.year - a.year);
            break;
        case 'name-asc':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }

    currentYachts = sorted;
    displayYachts(currentYachts);
}

// Search yachts from home page
function searchYachts() {
    const type = document.getElementById('yacht-type')?.value;
    const priceRange = document.getElementById('price-range')?.value;
    const length = document.getElementById('length')?.value;

    // Build query string
    const params = new URLSearchParams();
    if (type) params.set('type', type);
    if (priceRange) params.set('price', priceRange);
    if (length) params.set('length', length);

    // Navigate to listings page with filters
    window.location.href = `listings.html?${params.toString()}`;
}

// View yacht detail
function viewYacht(id) {
    window.location.href = `detail.html?id=${id}`;
}

// Load yacht detail page
async function loadYachtDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const yachtId = parseInt(urlParams.get('id'));
    const yacht = await fetchYachtById(yachtId);

    if (!yacht) {
        document.getElementById('yacht-detail').innerHTML = `
            <div class="no-results">
                <h3>Yacht not found</h3>
                <p>The yacht you're looking for doesn't exist or couldn't be loaded.</p>
                <a href="listings.html" class="btn btn-secondary">Back to Listings</a>
            </div>
        `;
        return;
    }

    // Update breadcrumb
    const breadcrumb = document.getElementById('breadcrumb-name');
    if (breadcrumb) breadcrumb.textContent = yacht.name;

    // Parse features if they're a string
    let features = yacht.features;
    if (typeof features === 'string') {
        try {
            features = JSON.parse(features);
        } catch (e) {
            features = [];
        }
    }

    // Create detail HTML
    const detailHTML = `
        <div class="detail-header">
            <h1>${yacht.name}</h1>
            <p class="detail-builder">${yacht.builder} - ${yacht.year}</p>
        </div>

        <div class="detail-layout">
            <div class="detail-main">
                <div class="detail-image">${getYachtIcon(yacht.type)}</div>

                <div class="detail-description">
                    <h2>Description</h2>
                    <p>${yacht.description}</p>
                </div>

                <div class="detail-description">
                    <h2>Key Features</h2>
                    <ul style="list-style: none; padding-left: 0;">
                        ${features.map(f => `<li style="padding: 0.5rem 0; border-bottom: 1px solid var(--border-color);">✓ ${f}</li>`).join('')}
                    </ul>
                </div>

                <div class="detail-description">
                    <div class="detail-specs-grid">
                        <h2>Specifications</h2>
                        <div class="spec-detail">
                            <span class="spec-detail-label">Builder</span>
                            <span class="spec-detail-value">${yacht.builder}</span>
                        </div>
                        <div class="spec-detail">
                            <span class="spec-detail-label">Year Built</span>
                            <span class="spec-detail-value">${yacht.year}</span>
                        </div>
                        <div class="spec-detail">
                            <span class="spec-detail-label">Length</span>
                            <span class="spec-detail-value">${yacht.length} ft</span>
                        </div>
                        <div class="spec-detail">
                            <span class="spec-detail-label">Beam</span>
                            <span class="spec-detail-value">${yacht.beam} ft</span>
                        </div>
                        <div class="spec-detail">
                            <span class="spec-detail-label">Draft</span>
                            <span class="spec-detail-value">${yacht.draft} ft</span>
                        </div>
                        <div class="spec-detail">
                            <span class="spec-detail-label">Max Speed</span>
                            <span class="spec-detail-value">${yacht.speed} knots</span>
                        </div>
                        <div class="spec-detail">
                            <span class="spec-detail-label">Guests</span>
                            <span class="spec-detail-value">${yacht.guests}</span>
                        </div>
                        <div class="spec-detail">
                            <span class="spec-detail-label">Cabins</span>
                            <span class="spec-detail-value">${yacht.cabins}</span>
                        </div>
                        <div class="spec-detail">
                            <span class="spec-detail-label">Crew</span>
                            <span class="spec-detail-value">${yacht.crew}</span>
                        </div>
                        <div class="spec-detail">
                            <span class="spec-detail-label">Location</span>
                            <span class="spec-detail-value">${yacht.location}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="detail-sidebar">
                <div class="detail-price">${formatPrice(parseFloat(yacht.price))}</div>

                <form class="contact-form" onsubmit="handleInquiry(event, ${yacht.id})">
                    <h3>Inquire About This Yacht</h3>
                    <input type="text" placeholder="Your Name" required>
                    <input type="email" placeholder="Your Email" required>
                    <input type="tel" placeholder="Phone Number">
                    <textarea placeholder="Message" required></textarea>
                    <button type="submit" class="btn btn-primary btn-full">Send Inquiry</button>
                </form>

                <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border-color);">
                    <h3 style="margin-bottom: 1rem; color: var(--primary-color);">Contact Information</h3>
                    <p style="color: var(--text-light); margin-bottom: 0.5rem;">Email: info@luxeyachts.com</p>
                    <p style="color: var(--text-light); margin-bottom: 0.5rem;">Phone: +1 (555) 123-4567</p>
                </div>
            </div>
        </div>
    `;

    document.getElementById('yacht-detail').innerHTML = detailHTML;
}

// Handle inquiry form
function handleInquiry(event, yachtId) {
    event.preventDefault();
    alert('Thank you for your inquiry! A yacht specialist will contact you shortly.');
    event.target.reset();
}

// Mobile menu toggle
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
}

// Initialize page based on URL
async function initPage() {
    const path = window.location.pathname;

    // Initialize mobile menu on all pages
    initMobileMenu();

    // Home page
    if (path.endsWith('index.html') || path.endsWith('/')) {
        const featuredYachts = await fetchFeaturedYachts();
        displayYachts(featuredYachts, 'featured-yachts');
    }

    // Listings page
    if (path.includes('listings.html')) {
        // Parse URL parameters
        const urlParams = new URLSearchParams(window.location.search);

        if (urlParams.get('type')) {
            currentFilters.types = [urlParams.get('type')];
            const checkbox = document.querySelector(`.type-filter[value="${urlParams.get('type')}"]`);
            if (checkbox) checkbox.checked = true;
        }

        if (urlParams.get('price')) {
            currentFilters.price = urlParams.get('price');
            const select = document.getElementById('price-filter');
            if (select) select.value = urlParams.get('price');
        }

        if (urlParams.get('length')) {
            currentFilters.length = urlParams.get('length');
            const select = document.getElementById('length-filter');
            if (select) select.value = urlParams.get('length');
        }

        // Apply filters
        await applyFilters();

        // Set up event listeners
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                currentFilters.search = e.target.value;
                searchTimeout = setTimeout(() => {
                    applyFilters();
                }, 500); // Debounce search
            });
        }

        const typeCheckboxes = document.querySelectorAll('.type-filter');
        typeCheckboxes.forEach(cb => {
            cb.addEventListener('change', (e) => {
                if (e.target.checked) {
                    currentFilters.types.push(e.target.value);
                } else {
                    currentFilters.types = currentFilters.types.filter(t => t !== e.target.value);
                }
                applyFilters();
            });
        });

        const priceFilter = document.getElementById('price-filter');
        if (priceFilter) {
            priceFilter.addEventListener('change', (e) => {
                currentFilters.price = e.target.value;
                applyFilters();
            });
        }

        const lengthFilter = document.getElementById('length-filter');
        if (lengthFilter) {
            lengthFilter.addEventListener('change', (e) => {
                currentFilters.length = e.target.value;
                applyFilters();
            });
        }

        const yearFilter = document.getElementById('year-filter');
        if (yearFilter) {
            yearFilter.addEventListener('change', (e) => {
                currentFilters.year = e.target.value;
                applyFilters();
            });
        }

        const builderFilter = document.getElementById('builder-filter');
        if (builderFilter) {
            builderFilter.addEventListener('change', (e) => {
                currentFilters.builder = e.target.value;
                applyFilters();
            });
        }
    }

    // Detail page
    if (path.includes('detail.html')) {
        await loadYachtDetail();
    }
}

// Run initialization when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}
