-- Toto Infotainment Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Stories Table (Folk Stories)
CREATE TABLE IF NOT EXISTS stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  type TEXT NOT NULL, -- 'Folk Story' or other types
  english_narration TEXT NOT NULL,
  toto_narration TEXT, -- Can be NULL if not recorded yet
  tone TEXT, -- 'Storytelling, inspiring', 'Calm, poetic', etc.
  duration TEXT, -- '2-3 min'
  cultural_meaning TEXT, -- Cultural Meaning / Moral
  suggested_image TEXT, -- Image description or path
  image_url TEXT, -- URL to uploaded image in Supabase storage
  audio_english_url TEXT, -- URL to English narration audio in Supabase storage
  audio_toto_url TEXT, -- URL to Toto narration audio in Supabase storage
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Words Table (Language Learning)
CREATE TABLE IF NOT EXISTS words (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  english_word TEXT NOT NULL,
  category TEXT NOT NULL, -- 'Nature', 'Food', 'Animals', etc.
  english_narration TEXT NOT NULL,
  toto_narration TEXT, -- Can be NULL if not recorded yet
  tone TEXT, -- 'Cheerful', 'Calm', 'Clear', etc.
  file_name_eng TEXT, -- e.g., 'word_001_eng.mp3'
  file_name_toto TEXT, -- e.g., 'word_001_toto.mp3'
  audio_english_url TEXT, -- URL to English audio in Supabase storage
  audio_toto_url TEXT, -- URL to Toto audio in Supabase storage
  use_case_sentence TEXT, -- Use case sentence
  image_url TEXT, -- URL to word image in Supabase storage
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Concepts Table (Educational Concepts with Slides)
CREATE TABLE IF NOT EXISTS concepts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL, -- e.g., 'Evaporation', 'Plant Growth', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Concept Slides Table
CREATE TABLE IF NOT EXISTS concept_slides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  concept_id UUID NOT NULL REFERENCES concepts(id) ON DELETE CASCADE,
  slide_number INTEGER NOT NULL,
  scene_description TEXT NOT NULL,
  english_narration TEXT NOT NULL,
  toto_narration TEXT, -- Can be NULL if not recorded yet
  notes TEXT, -- Additional notes
  file_name_eng TEXT, -- Audio file name for English
  file_name_toto TEXT, -- Audio file name for Toto
  audio_english_url TEXT, -- URL to English audio in Supabase storage
  audio_toto_url TEXT, -- URL to Toto audio in Supabase storage
  image_url TEXT, -- URL to slide image in Supabase storage
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(concept_id, slide_number)
);

-- GK (General Knowledge) Table
CREATE TABLE IF NOT EXISTS gk (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  english_narration TEXT NOT NULL,
  toto_narration TEXT, -- Can be NULL if not recorded yet
  tone TEXT, -- 'Cheerful, clear', 'Calm, soft tone', etc.
  image_description TEXT, -- Description of the image
  image_url TEXT, -- URL to image in Supabase storage
  file_name_eng TEXT, -- e.g., 'gk_001_eng.mp3'
  file_name_toto TEXT, -- e.g., 'gk_001_toto.mp3'
  audio_english_url TEXT, -- URL to English audio in Supabase storage
  audio_toto_url TEXT, -- URL to Toto audio in Supabase storage
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_words_category ON words(category);
CREATE INDEX IF NOT EXISTS idx_stories_type ON stories(type);
CREATE INDEX IF NOT EXISTS idx_concept_slides_concept_id ON concept_slides(concept_id);
CREATE INDEX IF NOT EXISTS idx_concept_slides_slide_number ON concept_slides(concept_id, slide_number);

-- Enable Row Level Security (RLS) - Adjust policies as needed
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE words ENABLE ROW LEVEL SECURITY;
ALTER TABLE concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE concept_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE gk ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access (adjust based on your needs)
CREATE POLICY "Allow public read access on stories" ON stories FOR SELECT USING (true);
CREATE POLICY "Allow public read access on words" ON words FOR SELECT USING (true);
CREATE POLICY "Allow public read access on concepts" ON concepts FOR SELECT USING (true);
CREATE POLICY "Allow public read access on concept_slides" ON concept_slides FOR SELECT USING (true);
CREATE POLICY "Allow public read access on gk" ON gk FOR SELECT USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_stories_updated_at BEFORE UPDATE ON stories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_words_updated_at BEFORE UPDATE ON words
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_concepts_updated_at BEFORE UPDATE ON concepts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_concept_slides_updated_at BEFORE UPDATE ON concept_slides
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gk_updated_at BEFORE UPDATE ON gk
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

