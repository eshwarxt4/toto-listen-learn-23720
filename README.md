# Toto Infotainment

An interactive educational platform for learning the Toto language through stories, games, and cultural content. This application provides a comprehensive learning experience with gamification, progress tracking, and multimedia content.

## 📚 Overview

Toto Infotainment is designed to preserve and teach the Toto language through engaging educational content. The platform includes:

- **Language Learning**: Interactive word cards with audio pronunciation in both Toto and English
- **Educational Stories**: Concept-based stories with slides covering topics like evaporation, plant growth, water cycle, and more
- **Folk Stories**: Traditional Toto folk stories with cultural meanings
- **Quizzes**: Interactive quizzes to test knowledge
- **Progress Tracking**: Gamification system with XP, levels, and achievements
- **Cultural Content**: Information about Toto culture and traditions

## ✨ Features

### Core Features
- 🎯 **Word Learning**: Swipeable word cards with category-based filtering
- 📖 **Story Viewer**: Slide-based story presentation with audio narration
- 🎮 **Interactive Quizzes**: Image-based quiz system
- 📊 **Progress Tracking**: XP system, levels, and learning streaks
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations
- 🔊 **Audio Support**: Audio playback for words, stories, and system sounds
- 🌐 **Bilingual**: Content available in both Toto and English

### Technical Features
- ⚡ **Fast Performance**: Built with Vite for optimal development and build times
- 🗄️ **Supabase Integration**: Cloud database and storage for scalable content management
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🎭 **Gamification**: XP system, leveling, and achievement tracking
- 🔄 **Real-time Updates**: Content fetched dynamically from Supabase

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Vite 5.4** - Build tool and dev server
- **React Router 6.30** - Client-side routing
- **TanStack Query 5.83** - Data fetching and caching

### UI Framework
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Backend & Database
- **Supabase** - Backend as a Service (BaaS)
  - PostgreSQL database
  - Storage for audio and image files
  - Row Level Security (RLS)

### Additional Libraries
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **date-fns** - Date utilities
- **Recharts** - Data visualization

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **bun**
- **Git**
- **Supabase Account** (free tier works)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/BTP_Toto_Infotainment.git
   cd BTP_Toto_Infotainment
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   
   You can find these values in your Supabase project:
   - Go to Project Settings → API
   - Copy the "Project URL" and "anon public" key

## 🗄️ Supabase Setup

### 1. Create a Supabase Project

1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the project to be fully provisioned

### 2. Set Up Database Schema

1. Open your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase_schema.sql`
4. Click **Run** to execute the SQL

This will create the following tables:
- `stories` - Folk stories and narratives
- `words` - Language learning words
- `concepts` - Educational concepts
- `concept_slides` - Slides for each concept
- `gk` - General knowledge items

### 3. Insert Sample Data

1. In the SQL Editor, open `supabase_sample_data.sql`
2. **Important**: Replace `{SUPABASE_PROJECT_REF}` with your actual Supabase project reference
   - Find your project reference in the Supabase URL: `https://{PROJECT_REF}.supabase.co`
3. Execute the SQL to insert sample data

### 4. Set Up Storage Buckets

Create the following storage buckets in Supabase Storage:

#### Audio Bucket
- **Name**: `audio`
- **Public**: Yes
- **Allowed MIME types**: `audio/mpeg`, `audio/mp3`, `audio/wav`

#### Images Bucket
- **Name**: `images`
- **Public**: Yes
- **Allowed MIME types**: `image/png`, `image/jpeg`, `image/jpg`, `image/webp`

### 5. Storage Structure

Organize your files as follows:

```
audio/
  ├── stories/
  │   ├── story_001_eng.mp3
  │   ├── story_001_toto.mp3
  │   └── ...
  ├── words/
  │   ├── word_001_eng.mp3
  │   ├── word_001_toto.mp3
  │   └── ...
  ├── concepts/
  │   ├── concept_001_slide_001_eng.mp3
  │   └── ...
  └── gk/
      ├── gk_001_eng.mp3
      └── ...

images/
  ├── stories/
  │   ├── story_001.png
  │   └── ...
  ├── words/
  │   ├── word_001.png
  │   └── ...
  ├── concepts/
  │   ├── concept_001_slide_001.png
  │   └── ...
  └── gk/
      ├── gk_001.png
      └── ...
```

### 6. Update Database URLs

After uploading files to Supabase Storage, update the database records with the correct URLs. The format is:

```
https://{PROJECT_REF}.supabase.co/storage/v1/object/public/{bucket}/{path}
```

Example:
```
https://abcdefghijklmnop.supabase.co/storage/v1/object/public/images/words/sun.png
```

## 🎵 System Sounds

System sounds are stored in the `public/sounds/` directory. Place these files:

- `welcome.mp3` - "Welcome to Toto Learning!"
- `well_done.mp3` - "Well done!"
- `try_again.mp3` - "Try again."
- `goodbye.mp3` - "Goodbye!"

These sounds are hardcoded in the application and don't require database configuration.

## 📁 Project Structure

```
BTP_Toto_Infotainment/
├── public/
│   ├── sounds/           # System sound files
│   ├── images/          # Static images
│   └── content/         # Additional content
├── src/
│   ├── assets/          # Image assets
│   ├── components/      # React components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── AudioPlayer.tsx
│   │   ├── WordCard.tsx
│   │   └── SwipeableWordCard.tsx
│   ├── data/           # JSON data (legacy, now using Supabase)
│   ├── hooks/          # Custom React hooks
│   │   ├── useGamification.ts
│   │   └── use-toast.ts
│   ├── lib/            # Utility functions
│   │   ├── supabase.ts          # Supabase client
│   │   ├── supabaseQueries.ts   # Database queries
│   │   ├── dataTransformers.ts  # Data transformation utilities
│   │   ├── systemSounds.ts     # System sounds configuration
│   │   └── utils.ts            # General utilities
│   ├── pages/          # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Words.tsx
│   │   ├── WordDetail.tsx
│   │   ├── Stories.tsx
│   │   ├── StoryViewer.tsx
│   │   ├── Quizzes.tsx
│   │   ├── Progress.tsx
│   │   ├── Settings.tsx
│   │   ├── Cultural.tsx
│   │   ├── AboutToto.tsx
│   │   ├── Landing.tsx
│   │   └── NotFound.tsx
│   ├── types/          # TypeScript type definitions
│   │   └── content.ts
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── supabase_schema.sql      # Database schema
├── supabase_sample_data.sql # Sample data
├── .env.example        # Environment variables template
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 🛣️ Available Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Landing | Landing page |
| `/dashboard` | Dashboard | Main dashboard with word of the day |
| `/words` | Words | Browse all words with category filter |
| `/word/:id` | WordDetail | Detailed word view with audio |
| `/stories` | Stories | Browse all stories (concepts + folk stories) |
| `/story/:id` | StoryViewer | View story with slides |
| `/quizzes` | Quizzes | Interactive quizzes |
| `/progress` | Progress | User progress and statistics |
| `/settings` | Settings | Application settings |
| `/cultural` | Cultural | Cultural content |
| `/about` | AboutToto | Information about Toto language |
| `*` | NotFound | 404 page |

## 🎮 Usage

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:8080`

### Building for Production

Build the production bundle:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Linting

Run ESLint:

```bash
npm run lint
```

## 🎯 Features in Detail

### Word Learning
- Swipeable word cards on the dashboard
- Category-based filtering (Food, Animals, Plants, Objects, Nature, Body)
- Audio pronunciation in both Toto and English
- Usage examples for each word
- Mark words as learned

### Stories
- **Concept Stories**: Educational stories with multiple slides
  - Evaporation
  - Plant Growth
  - Food Sources
  - Seasons and Monsoon
  - Water Cycle
  - Photosynthesis
  - Seasons
- **Folk Stories**: Traditional Toto stories
  - The Brave Toto Boy
  - The River and the Drum

### Gamification
- XP (Experience Points) system
- Level progression
- Learning streaks
- Achievement tracking
- Progress visualization

### Audio Features
- Audio playback for all words
- Story narration in Toto and English
- System sounds for user feedback
- Audio controls with play/pause

## 🗃️ Database Schema

### Tables

#### `stories`
Folk stories and narratives
- `id` (UUID)
- `title` (TEXT)
- `type` (TEXT)
- `english_narration` (TEXT)
- `toto_narration` (TEXT, nullable)
- `tone` (TEXT, nullable)
- `duration` (TEXT, nullable)
- `cultural_meaning` (TEXT, nullable)
- `image_url` (TEXT, nullable)
- `audio_english_url` (TEXT, nullable)
- `audio_toto_url` (TEXT, nullable)

#### `words`
Language learning words
- `id` (UUID)
- `english_word` (TEXT)
- `category` (TEXT)
- `english_narration` (TEXT)
- `toto_narration` (TEXT, nullable)
- `tone` (TEXT, nullable)
- `audio_english_url` (TEXT, nullable)
- `audio_toto_url` (TEXT, nullable)
- `use_case_sentence` (TEXT, nullable)
- `image_url` (TEXT, nullable)

#### `concepts`
Educational concepts
- `id` (UUID)
- `title` (TEXT)

#### `concept_slides`
Slides for each concept
- `id` (UUID)
- `concept_id` (UUID, FK)
- `slide_number` (INTEGER)
- `scene_description` (TEXT)
- `english_narration` (TEXT)
- `toto_narration` (TEXT, nullable)
- `audio_english_url` (TEXT, nullable)
- `audio_toto_url` (TEXT, nullable)
- `image_url` (TEXT, nullable)

#### `gk`
General knowledge items
- `id` (UUID)
- `title` (TEXT)
- `english_narration` (TEXT)
- `toto_narration` (TEXT, nullable)
- `tone` (TEXT, nullable)
- `image_url` (TEXT, nullable)
- `audio_english_url` (TEXT, nullable)
- `audio_toto_url` (TEXT, nullable)

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Public read access policies configured
- Environment variables for sensitive data
- `.env` file excluded from version control

## 🐛 Troubleshooting

### Common Issues

**Issue**: Supabase connection errors
- **Solution**: Verify your `.env` file has correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

**Issue**: Audio files not playing
- **Solution**: Check that audio URLs in the database point to valid Supabase Storage files

**Issue**: Images not loading
- **Solution**: Verify image URLs in the database and ensure storage buckets are public

**Issue**: Build errors
- **Solution**: Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key | Yes |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of a BTP (Bachelor's Thesis Project). All rights reserved.

## 👥 Authors

- **Your Name** - *Initial work*

## 🙏 Acknowledgments

- Toto community for language preservation
- Supabase for backend infrastructure
- shadcn for UI components
- All contributors and supporters

## 📞 Support

For support, please open an issue in the GitHub repository or contact the project maintainers.

---

**Note**: This project is designed to preserve and teach the Toto language. All content should respect the cultural significance of the Toto community.
