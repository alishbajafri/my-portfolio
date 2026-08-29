// ---------------------------------------------------------------------------
// CENTRAL CONTENT / MEDIA CONFIG
// Replace the placeholder strings below with real URLs when available.
// Leave a value as "" (empty string) and the UI will show a clean placeholder
// instead of a broken image / embed.
// ---------------------------------------------------------------------------

export const CONTACT = {
  email: "alishbafatima2018@gmail.com",
  phone: "+92 305 2854505",
  /** Replace with the real LinkedIn profile URL */
  linkedinUrl: "https://www.linkedin.com/in/alishba-fatimaa",
  /** Replace with the real GitHub profile URL */
  githubUrl: "",
  /** Replace with a hosted PDF of the CV */
  cvUrl: "", // CV_URL
};

export const PROFILE = {
  /** Professional profile photo (hero). External URL is fine. */
  heroImageUrl: "https://my-portfolio-ebon-psi-24.vercel.app/profile.png", // PROFILE_IMAGE_URL
  /** Larger editorial portrait used in the About section. */
  aboutImageUrl: "https://my-portfolio-ebon-psi-24.vercel.app/profile.png", // ABOUT_IMAGE_URL
};

export type ProjectApp = {
  name: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  technologies: string[];
  /** Cover image — any external URL (Cloudinary, Supabase Storage, etc.) */
  imageUrl: string;
  /** Additional screenshots */
  galleryImages: string[];
  /** Full YouTube URL or bare video ID. Unlisted videos work. */
  videoUrl: string;
  githubUrl: string;
  liveUrl: string;
  caseStudyUrl?: string;
  /** Optional grouped sub-applications (used by the Java Application Suite) */
  apps?: ProjectApp[];
};

export const PROJECTS: Project[] = [
  {
    id: "coloryze",
    title: "Coloryze",
    category: "AI / Computer Vision",
    description:
      "An AI-powered skin tone analysis system using computer vision and image processing to analyze facial skin tones and provide rule-based recommendations.",
    features: [
      "Face detection",
      "Image processing pipeline",
      "RGB / HEX color analysis",
      "CSV processing",
      "File upload handling",
      "Rule-based recommendation engine",
    ],
    technologies: ["Python", "Flask", "OpenCV", "Pandas", "NumPy", "HTML", "CSS", "Jinja2", "OOP"],
    imageUrl: "", // PROJECT_IMAGE_URL
    galleryImages: [], // [PROJECT_IMAGE_URL, ...]
    videoUrl: "https://youtu.be/_sAD1a1ew1g", // PROJECT_VIDEO_URL (YouTube)
    githubUrl: "", // GITHUB_URL
    liveUrl: "", // LIVE_DEMO_URL
  },
  {
    id: "angry-bird-3d",
    title: "Angry Bird 3D Game",
    category: "Game Development",
    description:
      "A 3D game inspired by Angry Bird mechanics, featuring physics-based movement and collision detection.",
    features: ["Physics-based projectile motion", "Collision detection", "Real-time 3D rendering"],
    technologies: ["Python", "Pygame", "PyOpenGL"],
    imageUrl: "", // PROJECT_IMAGE_URL
    galleryImages: [],
    videoUrl: "", // PROJECT_VIDEO_URL (YouTube)
    githubUrl: "",
    liveUrl: "",
  },
  {
    id: "dungeon-crawler",
    title: "Dungeon Crawler Game",
    category: "Java / Game Development",
    description:
      "A 2D dungeon crawler built with object-oriented programming, featuring player movement, combat mechanics, character statistics, and leveling systems.",
    features: ["Player movement", "Combat mechanics", "Character statistics", "Leveling system"],
    technologies: ["Java", "DSA", "Java Swing", "AWT", "OOP"],
    imageUrl: "",
    galleryImages: [],
    videoUrl: "https://youtu.be/pcMNNsKRIvM",
    githubUrl: "",
    liveUrl: "",
  },
  {
    id: "bankease",
    title: "BankEase",
    category: "Software Engineering / Accessibility",
    description: "An accessible smart banking system designed with dyslexic users in mind.",
    features: [
      "Accessible interface",
      "FIFO scheduling",
      "SJF scheduling",
      "Priority scheduling",
    ],
    technologies: ["Python", "Tkinter"],
    imageUrl: "",
    galleryImages: [],
    videoUrl: "https://youtu.be/FKq6DrUJJYI",
    githubUrl: "",
    liveUrl: "",
  },
  {
    id: "java-suite",
    title: "Java Application Suite",
    category: "Desktop Software / OOP",
    description:
      "A grouped set of Java desktop applications built around clean object-oriented architecture, GUI design and file-based data management.",
    features: [
      "Authentication flows",
      "Transaction and trip operations",
      "File handling & data management",
      "Modular, pattern-driven architecture",
    ],
    technologies: ["Java", "Java Swing", "GUI", "File Handling", "OOP", "Design Patterns"],
    imageUrl: "",
    galleryImages: [],
    videoUrl: "",
    githubUrl: "",
    liveUrl: "",
    apps: [
      {
        name: "Cab Booking System",
        description: "Authentication, data management, trip operations and a desktop GUI.",
        imageUrl: "", // PROJECT_IMAGE_URL
        videoUrl: "", // PROJECT_VIDEO_URL
      },
      {
        name: "Recipe Manager System",
        description: "Recipe management, file handling and a modular architecture.",
        imageUrl: "",
        videoUrl: "",
      },
      {
        name: "Banking Simulator",
        description: "Authentication, transaction processing, GUI and data management.",
        imageUrl: "",
        videoUrl: "",
      },
    ],
  },
];

export const EXPERIENCE = {
  company: "LA Consulting (SMC-Private) Limited",
  role: "AI Engineer & Full-Stack Intern",
  period: "September 2025 – April 2026",
  location: "Remote",
  summary:
    "Developed AI-powered features for a full-stack freelancing marketplace using React Native (Expo), TypeScript, JavaScript, Supabase and PostgreSQL.",
  groups: [
    {
      label: "Product features shipped",
      items: [
        "Wallet management",
        "Escrow payments",
        "Milestone tracking",
        "Dispute resolution",
        "Stripe integration",
        "Firebase Cloud Messaging",
        "Socket.IO real-time communication",
      ],
    },
    {
      label: "Engineering",
      items: [
        "REST APIs",
        "Authentication",
        "Database operations",
        "Responsive mobile interfaces",
        "Object-oriented programming",
        "Clean coding & debugging",
        "Testing & performance optimization",
      ],
    },
    {
      label: "Collaboration",
      items: ["Git / GitHub", "Agile / Scrum", "Sprint planning", "Code reviews"],
    },
  ],
};

export const SKILLS = [
  {
    label: "Programming Languages",
    items: ["Java", "Python", "JavaScript", "TypeScript", "HTML", "CSS"],
  },
  {
    label: "Frameworks & Libraries",
    items: ["React Native (Expo)", "Tkinter", "Java Swing", "Pygame", "PyOpenGL"],
  },
  {
    label: "Backend & Databases",
    items: ["PostgreSQL", "Supabase", "Firebase", "REST APIs"],
  },
  {
    label: "Tools & Platforms",
    items: ["Git", "GitHub", "Socket.IO", "Stripe", "VS Code"],
  },
];

export const EDUCATION = [
  {
    period: "2023 – Present",
    degree: "BS Software Engineering",
    school: "Sir Syed University of Engineering & Technology (SSUET)",
    detail: "CGPA 3.66 · 7th Semester",
  },
  {
    period: "2021 – 2023",
    degree: "Intermediate",
    school: "APWA Government College",
    detail: "",
  },
  {
    period: "2018 – 2021",
    degree: "O' Levels",
    school: "Falconhouse Grammar School",
    detail: "",
  },
];

export const PROJECT_TYPES = [
  "AI / Machine Learning",
  "Full-Stack Web Application",
  "Mobile Application",
  "Desktop Application",
  "API / Backend Development",
  "Other",
];

/** Accepts a full YouTube URL or a bare video ID, returns the ID or null. */
export function youtubeId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([\w-]{11})/,
  );
  return match?.[1] ?? null;
}
