# Content Folder Structure

This folder contains all media assets and audio files for the Toto Infotainment platform.

## Directory Structure

```
content/
├── audio/
│   ├── words/           # Word pronunciation audio files
│   │   ├── word_001_toto.mp3
│   │   ├── word_001_eng.mp3
│   │   ├── word_002_toto.mp3
│   │   ├── word_002_eng.mp3
│   │   └── ...
│   ├── stories/         # Story narration audio files
│   │   ├── story_001_s1_toto.mp3
│   │   ├── story_001_s1_eng.mp3
│   │   ├── story_001_s2_toto.mp3
│   │   ├── story_001_s2_eng.mp3
│   │   └── ...
│   ├── gk/             # General knowledge audio files
│   │   ├── gk_001_toto.mp3
│   │   ├── gk_001_eng.mp3
│   │   └── ...
│   └── cultural/       # Folk stories and songs
│       ├── cultural_001_toto.mp3
│       ├── cultural_001_eng.mp3
│       └── ...
├── recording_checklist/
│   ├── recording_checklist.csv
│   └── recording_checklist.json
└── progress_demo.json

```

## Audio File Specifications

### Format Requirements
- **File Format**: MP3 or OGG
- **Sample Rate**: 44.1 kHz
- **Channels**: Mono (single channel)
- **Bit Rate**: 128 kbps minimum
- **Bit Depth**: 16-bit

### Recording Guidelines

#### Environment
- Record in a quiet room with minimal background noise
- Avoid rooms with echo or reverberation
- Close windows and turn off fans/AC during recording
- Use soft furnishings to dampen sound

#### Microphone Setup
- Position microphone 15-25 cm from speaker's mouth
- Use a pop filter to reduce plosives (p, b, t sounds)
- Test recording levels before starting
- Aim for -12dB to -6dB peak levels

#### Recording Technique
- Speak clearly and naturally
- Maintain consistent volume and distance from mic
- Leave 0.5-1 second of silence at start and end of each file
- Record in one take when possible; avoid splicing

### Duration Guidelines

| Content Type | Duration | Notes |
|-------------|----------|-------|
| Single Words | 2-4 seconds | Include brief pause before and after |
| Usage Sentences | 4-8 seconds | Natural speaking pace |
| Story Slides | 6-20 seconds | Narrative tone, clear enunciation |
| Folk Stories | 90-180 seconds | Engaging, storytelling voice |
| Songs | 60-120 seconds | Musical, appropriate tempo |

## File Naming Convention

### Words
```
word_[3-digit-number]_[language].mp3

Examples:
- word_001_toto.mp3  (First word in Toto)
- word_001_eng.mp3   (First word in English)
- word_020_toto.mp3  (20th word in Toto)
```

### Stories
```
story_[3-digit-number]_s[slide-number]_[language].mp3

Examples:
- story_001_s1_toto.mp3  (Story 1, Slide 1, Toto)
- story_001_s1_eng.mp3   (Story 1, Slide 1, English)
- story_002_s3_toto.mp3  (Story 2, Slide 3, Toto)
```

### General Knowledge
```
gk_[3-digit-number]_[language].mp3

Examples:
- gk_001_toto.mp3
- gk_001_eng.mp3
```

### Cultural Items
```
cultural_[3-digit-number]_[language].mp3

Examples:
- cultural_001_toto.mp3  (First folk story/song in Toto)
- cultural_001_eng.mp3   (First folk story/song in English)
```

## Replacing Placeholder Audio

Currently, the app uses placeholder references. To add real audio:

1. **Record audio files** following the specifications above
2. **Name files** according to the convention
3. **Place files** in the appropriate subdirectory
4. **Test playback** in the app
5. **Rebuild** the application

## Recording Checklist

Use the Content Manager in the app to export a complete recording checklist:

1. Navigate to `/content-manager` in the app
2. Click "Download CSV" or "Download JSON"
3. Use the checklist to organize field recordings

The checklist includes:
- File name (exact)
- Content ID
- Human-readable label
- Language
- Recommended duration
- Recommended tone/style
- Recording notes

## Quality Assurance

Before finalizing recordings:

- [ ] All files follow naming convention
- [ ] Audio quality is clear (no distortion, clipping, or noise)
- [ ] Volume levels are consistent across files
- [ ] Silence at start and end is present
- [ ] Pronunciation is clear and accurate
- [ ] File format and specifications match requirements
- [ ] All files are in correct directories

## Post-Production

Minimal editing is recommended:
- Normalize volume levels
- Remove clicks or mouth sounds
- Trim excess silence (but leave 0.5s buffer)
- Apply gentle noise reduction if needed
- Ensure consistent loudness across all files

## Backup

Always maintain backups:
- Keep master/unedited recordings
- Store edited files separately
- Use version control for audio files
- Document any post-production changes

---

**Note**: The app will gracefully handle missing audio files during development. However, all audio must be present for production deployment.
