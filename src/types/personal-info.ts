export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: string[];
  icon: string;
}

export interface Education {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  icon: string;
}

export interface SocialLink {
  platform: string;
  link: string;
  icon: string;
}

export interface Theme {
  cardBackground: string;
  primaryText: string;
  secondaryText: string;
  accentColor: string;
}

export interface PersonalInfo {
  name: {
    first: string;
    last: string;
  };
  title: string;
  company: string;
  location: string;
  profileImage: string;
  experience: Experience[];
  education: Education[];
  socialLinks: SocialLink[];
  theme: Theme;
} 