import { Story } from "@/types/content";

export const stories: Story[] = [
  {
    id: "story_001",
    title: "Evaporation - Water's Journey",
    description: "Learn how water turns into vapor and rises to the sky",
    thumbnail: "/images/stories/evaporation.png",
    category: "science",
    slides: [
      {
        slideNumber: 1,
        toto: "পানি গরম হলে উপরে উঠে যায়",
        english: "When water gets hot, it rises up",
        imageUrl: "/images/stories/evaporation.png",
        audioToto: "/content/audio/stories/story_001_s1_toto.mp3",
        audioEnglish: "/content/audio/stories/story_001_s1_eng.mp3"
      },
      {
        slideNumber: 2,
        toto: "পানি বাষ্প হয়ে আকাশে চলে যায়",
        english: "Water becomes vapor and goes to the sky",
        imageUrl: "/images/stories/evaporation.png",
        audioToto: "/content/audio/stories/story_001_s2_toto.mp3",
        audioEnglish: "/content/audio/stories/story_001_s2_eng.mp3"
      },
      {
        slideNumber: 3,
        toto: "মেঘ তৈরি হয় এবং বৃষ্টি হয়",
        english: "Clouds form and rain falls",
        imageUrl: "/images/stories/evaporation.png",
        audioToto: "/content/audio/stories/story_001_s3_toto.mp3",
        audioEnglish: "/content/audio/stories/story_001_s3_eng.mp3"
      }
    ]
  },
  {
    id: "story_002",
    title: "How Plants Grow",
    description: "Discover the amazing journey from seed to plant",
    thumbnail: "/images/stories/plant-growth.png",
    category: "science",
    slides: [
      {
        slideNumber: 1,
        toto: "বীজ মাটিতে পুঁতে দাও",
        english: "Plant the seed in the soil",
        imageUrl: "/images/stories/plant-growth.png",
        audioToto: "/content/audio/stories/story_002_s1_toto.mp3",
        audioEnglish: "/content/audio/stories/story_002_s1_eng.mp3"
      },
      {
        slideNumber: 2,
        toto: "পানি এবং সূর্যের আলো দাও",
        english: "Give it water and sunlight",
        imageUrl: "/images/stories/plant-growth.png",
        audioToto: "/content/audio/stories/story_002_s2_toto.mp3",
        audioEnglish: "/content/audio/stories/story_002_s2_eng.mp3"
      },
      {
        slideNumber: 3,
        toto: "গাছ বড় হয়ে ওঠে",
        english: "The plant grows tall",
        imageUrl: "/images/stories/plant-growth.png",
        audioToto: "/content/audio/stories/story_002_s3_toto.mp3",
        audioEnglish: "/content/audio/stories/story_002_s3_eng.mp3"
      }
    ]
  }
];
