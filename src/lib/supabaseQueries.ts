import { supabase } from './supabase';

// Database types matching the schema
export interface StoryRow {
  id: string;
  title: string;
  type: string;
  english_narration: string;
  toto_narration: string | null;
  tone: string | null;
  duration: string | null;
  cultural_meaning: string | null;
  suggested_image: string | null;
  image_url: string | null;
  audio_english_url: string | null;
  audio_toto_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface WordRow {
  id: string;
  english_word: string;
  category: string;
  english_narration: string;
  toto_narration: string | null;
  tone: string | null;
  file_name_eng: string | null;
  file_name_toto: string | null;
  audio_english_url: string | null;
  audio_toto_url: string | null;
  use_case_sentence: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ConceptRow {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface ConceptSlideRow {
  id: string;
  concept_id: string;
  slide_number: number;
  scene_description: string;
  english_narration: string;
  toto_narration: string | null;
  notes: string | null;
  file_name_eng: string | null;
  file_name_toto: string | null;
  audio_english_url: string | null;
  audio_toto_url: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface GKRow {
  id: string;
  title: string;
  english_narration: string;
  toto_narration: string | null;
  tone: string | null;
  image_description: string | null;
  image_url: string | null;
  file_name_eng: string | null;
  file_name_toto: string | null;
  audio_english_url: string | null;
  audio_toto_url: string | null;
  created_at: string;
  updated_at: string;
}

// Query functions
export async function fetchStories(): Promise<StoryRow[]> {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching stories:', error);
    throw error;
  }

  return data || [];
}

export async function fetchWords(category?: string): Promise<WordRow[]> {
  let query = supabase
    .from('words')
    .select('*')
    .order('created_at', { ascending: true });

  if (category && category !== 'All') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching words:', error);
    throw error;
  }

  return data || [];
}

export async function fetchWordById(id: string): Promise<WordRow | null> {
  const { data, error } = await supabase
    .from('words')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching word:', error);
    return null;
  }

  return data;
}

export async function fetchConcepts(): Promise<ConceptRow[]> {
  const { data, error } = await supabase
    .from('concepts')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching concepts:', error);
    throw error;
  }

  return data || [];
}

export async function fetchConceptSlides(conceptId: string): Promise<ConceptSlideRow[]> {
  const { data, error } = await supabase
    .from('concept_slides')
    .select('*')
    .eq('concept_id', conceptId)
    .order('slide_number', { ascending: true });

  if (error) {
    console.error('Error fetching concept slides:', error);
    throw error;
  }

  return data || [];
}

export async function fetchGK(): Promise<GKRow[]> {
  const { data, error } = await supabase
    .from('gk')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching GK:', error);
    throw error;
  }

  return data || [];
}

// Helper function to get public URL from Supabase storage
export function getSupabaseStorageUrl(bucket: string, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

