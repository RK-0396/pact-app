# Romantic Proposal Website

A fully responsive, modern, and emotionally engaging single-page proposal website. Built with HTML, CSS, and Vanilla JavaScript.

## 🚀 Features

- **Smooth Loading & Scroll Animations**: Fade-ins, floating particles, and timeline slide-ins.
- **Background Music**: Integrated HTML5 Audio with custom play/pause controls.
- **Interactive Story Timeline**: Displays your milestones smoothly.
- **Photo Gallery**: Grid layout with hover overlays and a modal popup for detailed viewing.
- **Typewriter Effect**: A heartfelt special message typed out as the user scrolls to it.
- **The Climax (Proposal)**: A memorable button interaction that changes the background, pops the question, and triggers a confetti/hearts celebration!
- **Mobile-First Design**: Completely responsive layout for all screen sizes.

## 📂 Project Structure

```
proposal-app/
├── index.html        # Main structure
├── style.css         # Styling, gradients, animations, typography
├── script.js         # Scroll logic, typing effect, music control, confetti
├── assets/
│   ├── images/       # Place your photos here
│   └── music.mp3     # Place your background song here
└── README.md
```

## 🛠️ How to Customize

1. **Change Names & Dates**: Open `index.html` and update the placeholder texts like `[Date of first meeting]`.
2. **Add Your Photos**: 
   - Place your images in `assets/images/`
   - In `index.html` (under the Gallery section), replace `<div class="image-placeholder">...</div>` with `<img src="assets/images/your-photo.jpg" alt="Description">`.
3. **Hero Background Image**: 
   - Open `style.css`, search for `.hero-section`.
   - Uncomment the `background: url('assets/images/hero-bg.jpg')` line to use a real photo background instead of the gradient.
4. **Update the Message**: Open `script.js` and modify the `messageText` variable to your own personalized letter.
5. **Add Music**: Place a `.mp3` file in the `assets/` folder and name it `music.mp3`. 

## 🏃‍♂️ How to Run

Since there are no frameworks or build tools required, you can simply **double-click `index.html`** to open it in your web browser. 

*(For the best experience, especially if using real images or testing locally with advanced browser security rules, you might want to run it via a simple local server like VS Code's "Live Server" extension).*

## 🎨 Theme & Colors

The theme revolves around soft romantic tones:
- Primary: `#ff758c` (Warm Pink)
- Secondary: `#ff7eb3` (Soft Rose)
- Fonts: `Dancing Script` (Headings) & `Inter` (Body text)
