import poster1 from "@/assets/poster-1.jpg";
import poster2 from "@/assets/poster-2.jpg";
import poster3 from "@/assets/poster-3.jpg";
import poster4 from "@/assets/poster-4.jpg";
import poster5 from "@/assets/poster-5.jpg";
import poster6 from "@/assets/poster-6.jpg";
import poster7 from "@/assets/poster-7.jpg";
import poster8 from "@/assets/poster-8.jpg";

export type Movie = {
  id: string;
  title: string;
  year: number;
  genres: string[];
  rating: number;
  quality: "4K" | "1080p" | "720p";
  poster: string;
  audio: string[];
  subs: string[];
  src: string;
};

const SAMPLE_SRC =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export const movies: Movie[] = [
  {
    id: "1",
    title: "Solaris Rising",
    year: 2024,
    genres: ["Sci-Fi", "Drama"],
    rating: 8.4,
    quality: "4K",
    poster: poster1,
    audio: ["PT-PT", "ENG 5.1"],
    subs: ["PT", "EN"],
    src: SAMPLE_SRC,
  },
  {
    id: "2",
    title: "Neon Alibi",
    year: 2023,
    genres: ["Thriller", "Crime"],
    rating: 7.9,
    quality: "1080p",
    poster: poster2,
    audio: ["ENG 5.1"],
    subs: ["PT", "EN", "ES"],
    src: SAMPLE_SRC,
  },
  {
    id: "3",
    title: "The Long Ascent",
    year: 2022,
    genres: ["Adventure", "Documentary"],
    rating: 8.1,
    quality: "4K",
    poster: poster3,
    audio: ["ENG 2.0", "PT-PT"],
    subs: ["PT"],
    src: SAMPLE_SRC,
  },
  {
    id: "4",
    title: "Hollow Pines",
    year: 2025,
    genres: ["Horror", "Mystery"],
    rating: 6.8,
    quality: "1080p",
    poster: poster4,
    audio: ["ENG 5.1"],
    subs: ["PT", "EN"],
    src: SAMPLE_SRC,
  },
  {
    id: "5",
    title: "Rooftops of Alfama",
    year: 2021,
    genres: ["Romance", "Drama"],
    rating: 7.5,
    quality: "1080p",
    poster: poster5,
    audio: ["PT-PT"],
    subs: ["PT", "EN", "FR"],
    src: SAMPLE_SRC,
  },
  {
    id: "6",
    title: "Bolt & Bloom",
    year: 2024,
    genres: ["Animation", "Family"],
    rating: 8.7,
    quality: "4K",
    poster: poster6,
    audio: ["PT-PT", "ENG 5.1"],
    subs: ["PT"],
    src: SAMPLE_SRC,
  },
  {
    id: "7",
    title: "Dust Route 66",
    year: 2020,
    genres: ["Action", "Heist"],
    rating: 7.2,
    quality: "720p",
    poster: poster7,
    audio: ["ENG 5.1"],
    subs: ["EN"],
    src: SAMPLE_SRC,
  },
  {
    id: "8",
    title: "Deep Blue Signal",
    year: 2023,
    genres: ["Documentary", "Nature"],
    rating: 8.9,
    quality: "4K",
    poster: poster8,
    audio: ["ENG 2.0", "PT-PT"],
    subs: ["PT", "EN"],
    src: SAMPLE_SRC,
  },
];
