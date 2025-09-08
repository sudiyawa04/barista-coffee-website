Barista 
### Main Files
- `index.html` - Updated to mirror the dark home design
- `dark-home.html` - Standalone dark home page 
- `assets/css/dark-style.css` - New dark theme CSS file

### Design Features Implemented

#### Hero Section
- Full-viewport hero with dark overlay
- "A PLACE OF TRANQUILITY" main heading
- Elegant typography using Playfair Display and Poppins fonts
- Gold accent color (#d4af37) matching the original

#### Navigation
- Fixed transparent navbar with blur effect
- Gold brand logo in Playfair Display font
- Smooth hover effects

#### Content Sections
1. **About Section** - "Places to Get Lost" and "Best Coffee Flavors" with images
2. **Coffee Menu** - 8 coffee cards (Espresso, Macchiato, Ristretto, etc.) with icons
3. **Gallery** - Three image cards with overlay effects
4. **Application Section** - App promotion with image
5. **Blog Posts** - Three blog cards with images
6. **Footer** - Opening hours, latest posts, contact info, and other locations

#### Styling Features
- Dark theme (#1a1a1a background)
- Gold accents throughout (#d4af37)
- Hover effects on cards and images
- Responsive design using Bootstrap 5
- Custom scrollbar styling
- Smooth animations and transitions

### Color Palette
- Background: #1a1a1a (dark)
- Text: #e8e3d8 (light cream)
- Accent: #d4af37 (gold)
- Card backgrounds: rgba(40, 40, 40, 0.8)

### Typography
- Headings: Playfair Display (serif)
- Body text: Poppins (sans-serif)
- Letter spacing and font weights matching the original

### Images
All images are sourced from Unsplash for demonstration purposes:
- Coffee shop interiors
- Coffee beans and brewing
- Barista and coffee culture images

## How to View
1. Open `index.html` or `dark-home.html` in a web browser
2. Ensure you have internet connection for Bootstrap, fonts, and images
3. The design is responsive and works on desktop, tablet, and mobile

## Technical Details
- Built with Bootstrap 5.3.3
- Google Fonts integration
- CSS Grid and Flexbox for layouts
- Vanilla JavaScript for Bootstrap components
- No external dependencies beyond Bootstrap and fonts

The recreation captures the essence and aesthetic of the original Qode Interactive Barista dark home page while using modern web standards and responsive design principles.

Getting Started
---------------
1. Start Apache in XAMPP Control Panel.
2. Visit `http://localhost/barista/`.
3. For contact form email: ensure PHP `mail()` is configured (or check log).

Project Structure
-----------------
- `index.html` — Homepage (hero, features, testimonials)
- `menu.html` — Menu with categories and prices
- `about.html` — Story, values, and team
- `contact.html` — Contact form, map, and hours
- `gallery.html` — Image gallery with modal preview
- `assets/css/style.css` — Theme and custom styles
- `assets/js/main.js` — Interactions and form validation
- `assets/img/` — Images (add your photos here)

Customization
-------------
- Update texts, prices, and items in each page.
- Replace map location in `contact.html` iframe if needed.
- Add images to `assets/img/` and reference them in pages.
 - Replace hero image at `assets/img/hero.jpg`.

Notes
-----
- Uses Bootstrap 5 via CDN for quick setup.
- For production, consider self-hosting assets and optimizing images.
- Contact form posts to `contact.php`. If `mail()` is not configured, messages are saved to `storage/contact.log`.
- Set your recipient email in `contact.php` (`$to`).
- Reservation form posts to `reservation.php`. If `mail()` is not configured, entries are saved to `storage/reservations.log`.

SMTP (Optional)
---------------
If your PHP `mail()` isn’t configured locally, use an SMTP relay (e.g., Gmail, SendGrid) via a library like PHPMailer. Example steps:
1. Install PHPMailer under `vendor/` or include it manually.
2. Configure SMTP host, username, password, port, and encryption.
3. Replace the `mail()` call in `contact.php` with PHPMailer send logic.

