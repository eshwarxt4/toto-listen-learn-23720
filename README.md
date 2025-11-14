# Toto Infotainment - Educational Platform

A complete, production-ready educational platform for learning the Toto language through interactive stories, games, and cultural content. Built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Word of the Day**: Daily vocabulary with dual-language audio playback (Toto & English)
- **Interactive Stories**: Educational concept stories about science and nature
- **Quizzes**: Age-appropriate quizzes with image and text-based questions
- **Cultural Corner**: Traditional folk stories and songs
- **Progress Tracking**: Streak counter, stars, and learning tree visualization
- **Accessibility**: High contrast mode, large text option, keyboard navigation
- **Offline Support**: PWA-ready with service worker caching
- **Developer Tools**: Content manager and recording checklist generator

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd toto-infotainment

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

The production files will be in the `dist/` folder, ready for static hosting.

## 📁 Project Structure

```
src/
├── assets/          # Images and media files
│   ├── toto-mascot.png
│   ├── words/       # Word illustrations
│   └── stories/     # Story images
├── components/      # Reusable React components
│   ├── ui/          # shadcn UI components
│   ├── AudioPlayer.tsx
│   └── WordCard.tsx
├── data/            # JSON content files
│   ├── words.json
│   └── stories.json
├── pages/           # Route pages
│   ├── Landing.tsx
│   ├── Dashboard.tsx
│   ├── WordDetail.tsx
│   ├── Stories.tsx
│   ├── Quizzes.tsx
│   └── ...
├── types/           # TypeScript type definitions
│   └── content.ts
└── index.css        # Global styles and design system
```

## 🎨 Design System

The app uses a warm, earthy color palette defined in `src/index.css`:

- **Primary**: Terracotta (educational, warm)
- **Secondary**: Sage green (nature, growth)
- **Accent**: Coral (interactive elements)
- **Background**: Warm cream

All colors use HSL format for consistency. Typography uses the Poppins font family.

## 🎵 Audio Content Structure

### File Naming Convention

**Words:**
```
/content/audio/words/word_001_toto.mp3
/content/audio/words/word_001_eng.mp3
```

**Stories:**
```
/content/audio/stories/story_001_s1_toto.mp3
/content/audio/stories/story_001_s1_eng.mp3
```

**Cultural Items:**
```
/content/audio/cultural/cultural_001_toto.mp3
/content/audio/cultural/cultural_001_eng.mp3
```

### Recording Guidelines

- **Format**: MP3 or OGG, 44.1kHz, mono, 16-bit
- **Environment**: Quiet room, minimal echo
- **Mic distance**: 15-25 cm from speaker
- **Silence**: 0.5-1 second at start and end
- **Duration**:
  - Single words: 2-4 seconds
  - Slide narration: 6-20 seconds
  - Folk stories: 90-180 seconds

### Replacing Placeholder Audio

1. Record audio files following the guidelines above
2. Name files according to the convention
3. Place files in the `/public/content/audio/` directory
4. Rebuild the app: `npm run build`

## 📊 Content Management

### Adding New Words

Edit `src/data/words.json`:

```json
{
  "id": "word_004",
  "english": "tree",
  "toto": "গাছ",
  "transliteration": "gach",
  "imageUrl": "/src/assets/words/tree.png",
  "audioToto": "/content/audio/words/word_004_toto.mp3",
  "audioEnglish": "/content/audio/words/word_004_eng.mp3"
}
```

### Adding New Stories

Edit `src/data/stories.json` to add stories with multiple slides.

### Recording Checklist

Use the Content Manager (accessible from Dashboard) to:
- View all content items
- Export recording checklist as CSV or JSON
- See exact file paths and naming requirements

## 🔧 Developer Tools

Access developer tools at `/content-manager` or via the Dashboard "Developer Tools" button.

Features:
- Content summary statistics
- Recording checklist export (CSV/JSON)
- File naming conventions
- Recording guidelines

## 📱 Progressive Web App (PWA)

The app includes PWA support for offline functionality:

1. Visit the app in a browser
2. Install as a standalone app (browser prompt)
3. Content caches after first load for offline access

## ♿ Accessibility

- Keyboard navigation support
- Alt text for all images
- ARIA labels for audio controls
- High contrast mode toggle
- Large text option
- Semantic HTML structure

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 📦 Deployment

### Static Hosting (Recommended)

The built app (`dist/` folder) can be deployed to:

- **GitHub Pages**
- **Netlify**
- **Vercel**
- **Firebase Hosting**
- Any static file server

### GitHub Pages Example

```bash
# Build the project
npm run build

# Deploy (using gh-pages package)
npm install -g gh-pages
gh-pages -d dist
```

## 🤝 Contributing

When adding content:

1. Follow the existing file structure
2. Use the recording guidelines
3. Test audio playback
4. Update JSON content files
5. Generate new recording checklist

## 📄 License

This project is developed for educational purposes to support Toto language preservation.

## 🙏 Acknowledgments

Created with deep respect for the Toto community, their language, and cultural heritage. Special thanks to the elders, speakers, and community members who have contributed to language preservation efforts.

## 📞 Support

For questions or issues:
- Check the Content Manager for technical details
- Review the recording checklist for audio requirements
- See the About page for cultural context

---

**Note**: All placeholder audio files need to be replaced with actual recordings before production deployment. Use the Recording Checklist export from the Content Manager to guide field recordings.
