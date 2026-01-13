// Configuration for frontend
const config = {
    // API base URL - change this to your deployed backend URL
    API_BASE_URL: 'http://localhost:3000/api',

    // Alternative: If using production, uncomment below
    // API_BASE_URL: 'https://your-backend-url.com/api',
};

// Export for browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
}
