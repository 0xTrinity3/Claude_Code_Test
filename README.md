# LuxeYachts - Premium Yacht Listings Website

A modern, responsive yacht listings website built to rival industry leaders like yachts.com. Features a comprehensive collection of luxury yachts with advanced search and filtering capabilities.

## Features

### Core Functionality
- **Home Page**: Hero section, quick search, and featured yachts showcase
- **Listings Page**: Complete yacht catalog with advanced filtering
- **Detail Pages**: Individual yacht pages with full specifications and inquiry forms
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Search & Filtering
- Search by yacht name, builder, or location
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

- **HTML5**: Semantic markup
- **CSS3**: Custom styling with CSS Grid and Flexbox
- **JavaScript**: Vanilla JS for functionality (no frameworks required)
- **Google Fonts**: Playfair Display & Montserrat

## File Structure

```
├── index.html          # Home page
├── listings.html       # Full yacht listings with filters
├── detail.html         # Individual yacht detail pages
├── styles.css          # Main stylesheet
├── scripts.js          # JavaScript functionality
├── data.js            # Yacht listings data
└── README.md          # Documentation
```

## Getting Started

### Quick Start
1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. No build process or dependencies required!

### Opening the Website
Simply double-click on `index.html` or open it with your preferred browser:
- Chrome
- Firefox
- Safari
- Edge

## Usage

### Browsing Yachts
1. Navigate to the home page
2. Use the quick search to filter by type, price, and length
3. Click "View All Listings" to see the complete catalog

### Filtering Listings
1. Go to the "Yachts for Sale" page
2. Use the sidebar filters to narrow down results:
   - Search by keyword
   - Select yacht type(s)
   - Choose price range
   - Filter by length
   - Filter by year
   - Select builder
3. Click "Apply Filters" or filters apply automatically as you select them

### Viewing Details
1. Click on any yacht card to view full details
2. See comprehensive specifications
3. View all features and amenities
4. Use the inquiry form to contact about the yacht

## Yacht Data

The website includes 15 luxury yachts with complete specifications:
- Motor Yachts
- Sailing Yachts
- Catamarans
- Expedition Yachts

Each listing includes:
- Name and builder
- Year built
- Length, beam, and draft
- Guest and crew capacity
- Maximum speed
- Price
- Location
- Detailed description
- Key features list
- Full specifications

## Customization

### Adding New Yachts
Edit `data.js` and add new yacht objects to the `yachtsData` array:

```javascript
{
    id: 16,
    name: "Your Yacht Name",
    builder: "Builder Name",
    type: "motor", // motor, sailing, catamaran, expedition
    year: 2024,
    length: 150,
    beam: 28,
    draft: 9,
    guests: 12,
    cabins: 6,
    crew: 10,
    speed: 18,
    price: 45000000,
    location: "Location",
    featured: false,
    description: "Description here...",
    features: ["Feature 1", "Feature 2"]
}
```

### Styling
Modify `styles.css` to customize:
- Colors (update CSS variables in `:root`)
- Fonts
- Layout
- Responsive breakpoints

### Colors
The site uses CSS variables for easy customization:
```css
--primary-color: #0a2540;     /* Navy blue */
--secondary-color: #1a4d7a;   /* Lighter blue */
--accent-color: #d4af37;      /* Gold */
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lightweight: No external frameworks
- Fast loading: Minimal dependencies
- Optimized: Efficient CSS and JavaScript
- SEO-friendly: Semantic HTML structure

## Future Enhancements

Potential features for future versions:
- Backend integration for real-time data
- User accounts and saved searches
- Image galleries for each yacht
- Comparison tool
- Virtual tours
- Charter booking system
- Multi-language support

## Credits

- Design & Development: LuxeYachts Team
- Fonts: Google Fonts (Playfair Display, Montserrat)
- Icons: Unicode emoji characters

## License

This project is created for demonstration purposes.

## Contact

For questions or support:
- Email: info@luxeyachts.com
- Phone: +1 (555) 123-4567

---

Built with passion for luxury yachting.
