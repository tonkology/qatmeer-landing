# Qatmeer Landing Page

A professional, responsive landing page for Qatmeer - an automated date sorting and quality control solution. Built with vanilla HTML, CSS, and JavaScript for deployment on GitHub Pages.

## 🚀 Quick Start

1. **Clone or download** this repository
2. **Open `index.html`** in your browser to preview locally
3. **Customize** content, colors, and contact form endpoint
4. **Deploy** to GitHub Pages (see deployment instructions below)

## 📁 Project Structure

```
qatmeer-landing/
├── index.html              # Main HTML file with all sections
├── styles.css              # Complete stylesheet with responsive design
├── script.js               # JavaScript for interactivity
├── README.md               # This documentation file
└── assets/                 # All visual assets
    ├── logo.svg            # Qatmeer logo (SVG)
    └── icons/              # Feature and add-on icons
        ├── ai-sorting.svg
        ├── food-safe.svg
        ├── cost-effective.svg
        ├── scalable.svg
        ├── delta-sorting.svg
        ├── delay-machine.svg
        └── washing-station.svg
```

## 🎨 Customization Guide

### Colors & Branding

The color scheme is defined in CSS custom properties at the top of `styles.css`:

```css
:root {
    --color-primary: #0F4C81;    /* Main brand color (dark blue) */
    --color-accent: #F5A623;     /* Accent color (orange) */
    --color-neutral: #0F1724;    /* Dark text color */
    --color-background: #F7FAFF;  /* Light background */
}
```

**To change colors:**
1. Edit the CSS variables in `styles.css` (lines 29-33)
2. Update the logo colors in `assets/logo.svg` if needed

### Content & Copy

**Main content variables** (easily searchable and replaceable):
- `PROJECT_NAME`: Qatmeer
- `TAGLINE`: "Automated sorting and quality control for dates — fast, food-safe, and affordable."
- `SHORT_BLURB`: "Qatmeer helps date processors sort and grade dates automatically..."
- `PRIMARY_CTA`: "Get Early Access"
- `CONTACT_EMAIL`: "hello@qatmeer.com"

**To update content:**
1. Search for these terms in `index.html`
2. Replace with your actual content
3. Update meta descriptions and titles for SEO

### Images

**Hero Image:**
- Current: Unsplash placeholder (`https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e`)
- Replace with: Your own hero image (recommended size: 1200x800px)

**Team Photos:**
- Current: Unsplash placeholders
- Replace with: Actual team member photos (recommended size: 300x300px)

**To replace images:**
1. Add your images to the `assets/` folder
2. Update the `src` attributes in `index.html`
3. Update `alt` text for accessibility

### Contact Form Setup

**Default Configuration:**
The form is set to use Formspree with a placeholder endpoint. You have two options:

#### Option 1: Use Formspree (Recommended)
1. Go to [formspree.io](https://formspree.io) and create an account
2. Create a new form and get your form ID
3. Replace `your_form_id` in both files:
   - `index.html` line 586: `action="https://formspree.io/f/your_form_id"`
   - `script.js` line 19: `formEndpoint: 'https://formspree.io/f/your_form_id'`

#### Option 2: Use Mailto Fallback
Replace the form action with:
```html
<form action="mailto:hello@qatmeer.com" method="post" enctype="text/plain">
```

### Pricing Configuration

**To update pricing:**
1. Edit the pricing cards in `index.html` (lines 340-425)
2. Update the JavaScript pricing logic in `script.js` (lines 21-42)

**Add-on prices** are configured in the JavaScript:
```javascript
addonPrices: {
    'delta-sorting': 5000,
    'delay-machine': 3000,
    'washing-station': 4000
}
```

## 🚀 Deployment Instructions

### Deploy to GitHub Pages

1. **Create a new repository** on GitHub
2. **Upload all files** to the repository
3. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch
   - Select "/ (root)" folder
   - Click Save

4. **Access your site** at: `https://yourusername.github.io/repository-name`

### Alternative: Use GitHub CLI
```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Qatmeer landing page"

# Add remote repository
git remote add origin https://github.com/yourusername/qatmeer-landing.git

# Push to GitHub
git push -u origin main
```

## 🔧 Development

### Local Development
**Simple HTTP Server:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have http-server installed)
npx http-server

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## ✨ Features Included

### Design Features
- ✅ Responsive design (mobile-first)
- ✅ Modern, professional styling
- ✅ Smooth animations (with reduced-motion support)
- ✅ Accessible navigation and forms
- ✅ SEO-optimized meta tags
- ✅ Fast loading with optimized assets

### Functionality
- ✅ Mobile hamburger navigation
- ✅ Smooth scrolling between sections
- ✅ Interactive pricing calculator
- ✅ Add-ons selection with price updates
- ✅ Tier recommendation system
- ✅ Contact form with validation
- ✅ Demo video modal
- ✅ FAQ accordion
- ✅ Cookie consent banner
- ✅ Form submission handling

### SEO & Analytics Ready
- ✅ Structured data (JSON-LD)
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Analytics tracking placeholder
- ✅ Sitemap ready structure

## 🎯 Performance Optimizations

- **CSS**: Organized with custom properties, efficient selectors
- **Images**: Optimized Unsplash URLs with size parameters
- **JavaScript**: Modular, event-driven architecture
- **Loading**: Critical CSS inlined, deferred non-critical resources
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## 📊 Analytics Setup

**Google Analytics 4:**
Uncomment and configure the GA4 code in `index.html` (lines 681-688):
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_TRACKING_ID');
</script>
```

**Alternative Analytics:**
The JavaScript includes event tracking for Plausible, Fathom, or other privacy-focused analytics tools.

## 🛠️ Customization Examples

### Adding a New Section
1. Add HTML structure in `index.html`
2. Add corresponding CSS in `styles.css`
3. Update navigation links if needed
4. Add scroll animations if desired

### Changing Fonts
Replace the Google Fonts import in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Update the CSS font family:
```css
--font-primary: 'YourFont', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Adding More Add-ons
1. Add HTML structure in the add-ons section
2. Add the new add-on to the JavaScript configuration
3. Update the tier recommendations if applicable

## 🐛 Troubleshooting

**Form not submitting:**
- Check that Formspree endpoint is correctly configured
- Verify the form action URL
- Check browser console for JavaScript errors

**Images not loading:**
- Verify image paths are correct
- Check that asset files are uploaded to the server
- Ensure proper file extensions (.svg, .jpg, .png)

**Mobile navigation not working:**
- Check that JavaScript is loading properly
- Verify there are no console errors
- Test on actual mobile device, not just browser dev tools

**Styling issues:**
- Check CSS file is linked correctly
- Verify custom properties are supported in target browsers
- Use browser dev tools to debug specific styling issues

## 📝 License

This landing page template is provided as-is for the Qatmeer project. Feel free to modify and adapt it for your needs.

## 🤝 Support

For questions about customization or deployment:
1. Check this README first
2. Review the code comments in HTML, CSS, and JS files
3. Test changes locally before deploying
4. Use browser developer tools to debug issues

---

**Built with ❤️ for Qatmeer** - Transforming date processing with AI and robotics.