# ÉLAN TRADELINKS LLP - Premium Petrochemical Trading Website

## Project Structure

Due to workspace filesystem constraints, all files are delivered in a flat structure. The intended production structure is:

```
/elan-website/
  ├── index.html          # Home page
  ├── about.html          # About Us page
  ├── products.html       # Products page with jQuery filtering
  ├── services.html       # Services page with timeline
  ├── markets.html        # Global markets page
  ├── contact.html        # Contact page with form
  ├── 404.html            # Animated 404 page
  ├── style.css           # Main stylesheet
  ├── responsive.css      # Responsive enhancements
  ├── main.js             # Core JavaScript
  ├── validation.js       # jQuery form validation
  └── assets/
      ├── css/
      │   ├── style.css
      │   └── responsive.css
      ├── js/
      │   ├── main.js
      │   └── validation.js
      ├── images/          # Download and place optimized images here
      └── videos/
          └── hero-video.mp4  # Place hero video here
```

## To Organize Into Folder Structure

Simply create the directories and move files as shown above, then update the relative paths in HTML files from:
- `href="style.css"` → `href="assets/css/style.css"`
- `href="responsive.css"` → `href="assets/css/responsive.css"`
- `src="main.js"` → `src="assets/js/main.js"`
- `src="validation.js"` → `src="assets/js/validation.js"`

## Features Implemented

### Design & UI
- Premium industrial corporate design with dark theme
- Primary brand color: #FFB74D (amber/orange)
- Glassmorphism navigation header
- Gradient overlays and high-end animations
- Mobile-first responsive design
- Semantic HTML5 structure with ARIA labels

### Global Features
- Custom animated page loader with ÉLAN logo reveal
- Sticky header (transparent → solid on scroll)
- Mobile hamburger menu with backdrop blur
- Desktop cursor glow effect (orange radial gradient)
- Scroll progress indicator
- Back to top floating button
- WhatsApp chat button with pulse animation
- Reduced motion accessibility support
- Lazy loading for images
- SEO optimization (meta tags, Open Graph, canonical URLs)

### Pages
1. **Home (index.html)** - 8 sections: Hero, About, Why Choose, Products, Services, Global Markets, Industries, Contact CTA
2. **About (about.html)** - Company Story, Vision, Mission, Philosophy, Leadership, Global Presence
3. **Products (products.html)** - 5 product categories with jQuery filter tabs
4. **Services (services.html)** - 6 services with timeline layout + 6-step process flow
5. **Markets (markets.html)** - Interactive regions with detailed regional expertise
6. **Contact (contact.html)** - Contact info, operating hours, enquiry form, Google Map embed
7. **404 (404.html)** - Animated oil tanker illustration, floating error numbers

### Animations
- AOS animations (fade-up, fade-left, fade-right, zoom-in, flip-up)
- Animated counters (25+ countries, 50+ products, 500+ shipments)
- Scroll indicator bounce animation
- Floating decorative shapes in hero
- 3D card hover lift effects
- Parallax-ready structure

### Form Features
- jQuery Validation (required fields, email format, phone format)
- Web3Forms dummy API integration
- Animated success alert (auto-dismiss after 5 seconds)
- Auto-reset form after submission
- Real-time error highlighting

### Tech Stack
- HTML5 (semantic structure)
- CSS3 (no Bootstrap, custom grid/flexbox)
- JavaScript (vanilla JS + jQuery 3.7.1)
- AOS Animation Library
- Material Icons
- jQuery Validation Plugin
- Google Fonts (Inter + Playfair Display)

### Contact Information
- Phone: +971 56 768 3909
- Email: info@elantradelink.com
- Address: Saheel Tower 1, Office 909, Al Nahda 1, Deira, Dubai, UAE
- Trade License: 1380220

## Notes
- Images use external Unsplash URLs for development. Replace with optimized WebP images in production.
- Video background uses a public Pexels URL. Replace with local `hero-video.mp4` for production.
- Update Web3Forms access key in contact.html for live form submissions.
- All pages include complete SEO meta tags, Open Graph, and structured data ready for deployment.
