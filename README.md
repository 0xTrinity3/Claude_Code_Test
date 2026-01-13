# LuxeYachts - Premium Yacht Listings Website with Backend

A modern, full-stack yacht listings website built to rival industry leaders like yachts.com. Features a comprehensive collection of luxury yachts with advanced search and filtering capabilities, backed by a REST API and database.

## Features

### Core Functionality
- **Home Page**: Hero section, quick search, and featured yachts showcase
- **Listings Page**: Complete yacht catalog with advanced filtering
- **Detail Pages**: Individual yacht pages with full specifications and inquiry forms
- **Backend API**: RESTful API with full CRUD operations
- **Database**: SQLite database with yacht data persistence
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Search & Filtering
- Real-time search by yacht name, builder, or location
- Filter by yacht type (Motor, Sailing, Catamaran, Expedition)
- Price range filtering
- Length filtering
- Year built filtering
- Builder filtering
- Multiple sort options (price, length, year, name)

### Design Features
- Professional color scheme with navy blue and gold accents
- Elegant typography using Playfair Display and Montserrat fonts
- Smooth animations and transitions
- Card-based layout for easy browsing
- Sticky navigation
- Intuitive user interface

## Technology Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Custom styling with CSS Grid and Flexbox
- **JavaScript**: Vanilla JS with Fetch API
- **Google Fonts**: Playfair Display & Montserrat

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **Sequelize**: ORM for database operations
- **SQLite**: Lightweight SQL database
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment configuration

## File Structure

```
├── Frontend
│   ├── index.html          # Home page
│   ├── listings.html       # Full yacht listings with filters
│   ├── detail.html         # Individual yacht detail pages
│   ├── styles.css          # Main stylesheet
│   ├── scripts.js          # JavaScript functionality
│   └── config.js           # API configuration
├── Backend
│   ├── server.js           # Express server
│   ├── package.json        # Dependencies
│   ├── seed.js             # Database seeding script
│   ├── config/
│   │   └── database.js     # Database configuration
│   ├── models/
│   │   ├── index.js        # Model exports
│   │   └── Yacht.js        # Yacht model
│   ├── controllers/
│   │   └── yachtController.js  # Business logic
│   ├── routes/
│   │   └── yachtRoutes.js  # API routes
│   └── data/
│       └── yachtsData.js   # Seed data
├── .env                    # Environment variables
├── .gitignore             # Git ignore rules
└── README.md              # Documentation
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Backend Setup

#### 1. Install Dependencies
```bash
npm install
```

This installs:
- express: Web server framework
- sequelize: Database ORM
- sqlite3: Database driver
- cors: Cross-origin support
- body-parser: Request parsing
- dotenv: Environment variables

#### 2. Initialize Database
```bash
npm run seed
```

This will:
- Create the SQLite database
- Set up the yachts table
- Seed it with 15 luxury yacht listings

#### 3. Start the Server
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

#### 4. Test the API
Open your browser and visit:
- `http://localhost:3000` - API info
- `http://localhost:3000/health` - Health check
- `http://localhost:3000/api/yachts` - All yachts
- `http://localhost:3000/api/yachts/featured` - Featured yachts

### Frontend Setup

#### 1. Configure API URL
Edit `config.js` and set your API URL:
```javascript
const config = {
    API_BASE_URL: 'http://localhost:3000/api'
};
```

For production, change to your deployed backend URL.

#### 2. Open in Browser
Simply open `index.html` in any modern web browser:
- Chrome
- Firefox
- Safari
- Edge

Or use a local server:
```bash
npx http-server -p 8080
```

Then visit `http://localhost:8080`

### Quick Start (All-in-One)
```bash
npm run init
```

This command will:
1. Install all dependencies
2. Seed the database
3. Start the server

## API Endpoints

### Public Endpoints

#### GET /api/yachts
Get all yachts with optional filtering
```
Query Parameters:
- search: Search term
- type: Yacht type (motor, sailing, catamaran, expedition)
- minPrice, maxPrice: Price range
- minLength, maxLength: Length range
- minYear, maxYear: Year range
- builder: Builder name
- location: Location
- featured: Boolean
- sortBy: Field to sort by
- sortOrder: ASC or DESC
- limit: Results per page (default: 100)
- offset: Pagination offset

Example: /api/yachts?type=motor&minPrice=10000000&maxPrice=50000000
```

#### GET /api/yachts/featured
Get featured yachts
```
Query Parameters:
- limit: Number of results (default: 6)

Example: /api/yachts/featured?limit=6
```

#### GET /api/yachts/:id
Get single yacht by ID
```
Example: /api/yachts/1
```

#### GET /api/yachts/stats
Get statistics
```
Returns:
- Total yachts count
- Featured yachts count
- Average, min, max prices
- Type distribution
```

### Admin Endpoints (CRUD Operations)

#### POST /api/yachts
Create a new yacht
```json
{
  "name": "New Yacht",
  "builder": "Builder Name",
  "type": "motor",
  "year": 2024,
  "length": 150,
  "beam": 28,
  "draft": 9,
  "guests": 12,
  "cabins": 6,
  "crew": 10,
  "speed": 18,
  "price": 45000000,
  "location": "Monaco",
  "featured": true,
  "description": "Description here",
  "features": ["Feature 1", "Feature 2"]
}
```

#### PUT /api/yachts/:id
Update yacht by ID
```json
{
  "price": 50000000,
  "featured": true
}
```

#### DELETE /api/yachts/:id
Delete yacht by ID

## Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_NAME=luxeyachts.db

# CORS Configuration
CORS_ORIGIN=*
```

## Database Schema

### Yachts Table
```sql
- id: INTEGER (Primary Key)
- name: STRING (Required)
- builder: STRING (Required)
- type: ENUM ('motor', 'sailing', 'catamaran', 'expedition')
- year: INTEGER (1900-2100)
- length: FLOAT (feet)
- beam: FLOAT (feet)
- draft: FLOAT (feet)
- guests: INTEGER
- cabins: INTEGER
- crew: INTEGER
- speed: FLOAT (knots)
- price: DECIMAL(15,2)
- location: STRING
- featured: BOOLEAN
- description: TEXT
- features: JSON
- status: ENUM ('available', 'sold', 'pending', 'charter')
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

## Yacht Data

The database includes 15 luxury yachts:
- **Motor Yachts**: 9 vessels (68ft - 295ft)
- **Sailing Yachts**: 4 vessels (98ft - 125ft)
- **Catamarans**: 1 vessel (72ft)
- **Expedition Yachts**: 1 vessel (210ft)

Price range: $3.8M - $425M

Each listing includes:
- Complete specifications
- Detailed descriptions
- Key features list
- Builder information
- Current location
- Status availability

## Deployment

### Backend Deployment

#### Option 1: Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Push to Heroku
git push heroku main

# Run seed
heroku run npm run seed
```

#### Option 2: DigitalOcean / AWS / VPS
1. Set up Node.js on server
2. Clone repository
3. Install dependencies: `npm install`
4. Seed database: `npm run seed`
5. Use PM2 for process management: `pm2 start server.js`
6. Set up Nginx as reverse proxy

### Frontend Deployment

#### GitHub Pages
Already configured! Just merge to main branch.

#### Netlify / Vercel
1. Connect repository
2. Set build command: (none needed)
3. Set publish directory: `/` (root)
4. Update `config.js` with production API URL
5. Deploy

## Development

### Adding New Yachts
Edit `data/yachtsData.js` and re-run:
```bash
npm run seed
```

### Modifying the Schema
1. Update `models/Yacht.js`
2. Delete `luxeyachts.db`
3. Run `npm run seed`

### API Testing
Use tools like:
- Postman
- Insomnia
- curl
- Thunder Client (VS Code extension)

Example curl commands:
```bash
# Get all yachts
curl http://localhost:3000/api/yachts

# Create yacht
curl -X POST http://localhost:3000/api/yachts \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Yacht","builder":"Test","type":"motor","year":2024,...}'

# Update yacht
curl -X PUT http://localhost:3000/api/yachts/1 \
  -H "Content-Type: application/json" \
  -d '{"price":60000000}'

# Delete yacht
curl -X DELETE http://localhost:3000/api/yachts/1
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Backend**: Fast SQL queries with indexed fields
- **Frontend**: Lightweight with minimal dependencies
- **Database**: Efficient SQLite for small-to-medium datasets
- **API**: RESTful design with proper HTTP methods
- **SEO**: Semantic HTML structure

## Security Notes

⚠️ **Important for Production:**

1. **Authentication**: Add authentication middleware for admin endpoints
2. **Input Validation**: Implement request validation (use express-validator)
3. **Rate Limiting**: Add rate limiting to prevent abuse (use express-rate-limit)
4. **HTTPS**: Always use HTTPS in production
5. **Environment Variables**: Never commit `.env` file
6. **SQL Injection**: Sequelize protects against this by default
7. **CORS**: Restrict CORS_ORIGIN to your frontend domain only

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Image upload and storage (AWS S3 / Cloudinary)
- [ ] Advanced search with Elasticsearch
- [ ] Favorites/saved searches
- [ ] Email notifications for inquiries
- [ ] Admin dashboard
- [ ] Yacht comparison tool
- [ ] Virtual tours / 360° images
- [ ] Charter booking system
- [ ] Multi-language support
- [ ] Payment integration

## Troubleshooting

### Backend won't start
- Check if port 3000 is available: `lsof -i :3000`
- Verify Node.js is installed: `node --version`
- Check for errors in console

### Frontend shows "Unable to load yachts"
- Make sure backend is running on port 3000
- Check `config.js` has correct API_BASE_URL
- Open browser console for error messages
- Check CORS settings in backend

### Database errors
- Delete `luxeyachts.db` and run `npm run seed` again
- Check file permissions
- Verify SQLite is installed

### API returns empty results
- Check database has data: `sqlite3 luxeyachts.db "SELECT COUNT(*) FROM yachts;"`
- Verify filter parameters are correct
- Check backend console for errors

## Credits

- Design & Development: LuxeYachts Team
- Fonts: Google Fonts (Playfair Display, Montserrat)
- Icons: Unicode emoji characters
- Database: SQLite
- Server: Node.js + Express

## License

This project is created for demonstration purposes.

## Contact

For questions or support:
- Email: info@luxeyachts.com
- Phone: +1 (555) 123-4567

---

Built with passion for luxury yachting. ⚓️🛥️
