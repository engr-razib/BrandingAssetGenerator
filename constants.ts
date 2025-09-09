import { GeneratorType } from "./types";
import type { FormData } from './types';

export { GeneratorType };

export const GeneratorOptions = {
  [GeneratorType.Logo]: {
    title: 'Logo',
    description: 'Create unique logos for your brand.',
  },
  [GeneratorType.Banner]: {
    title: 'Website/Print Banner',
    description: 'Generate engaging banners for your site.',
  },
  [GeneratorType.SocialPoster]: {
    title: 'Social Media Post',
    description: 'Design eye-catching posts for socials.',
  },
};

export const bannerSizes = {
  web: {
    popular: [
      { title: "Leaderboard", size: "728 × 90 px" },
      { title: "Medium Rectangle", size: "300 × 250 px" },
      { title: "Large Rectangle", size: "336 × 280 px" },
      { title: "Half Page", size: "300 × 600 px" },
      { title: "Large Mobile Banner", size: "320 × 100 px" },
      { title: "Mobile Leaderboard", size: "320 × 50 px" }
    ],
    additional: [
      { title: "Standard Banner", size: "468 × 60 px" },
      { title: "Square", size: "250 × 250 px" },
      { title: "Small Square", size: "200 × 200 px" },
      { title: "Skyscraper", size: "120 × 600 px" },
      { title: "Wide Skyscraper", size: "160 × 600 px" },
      { title: "Large Leaderboard", size: "970 × 90 px" },
      { title: "Billboard", size: "970 × 250 px" },
      { title: "Portrait", size: "300 × 1050 px" },
      { title: "Top Banner", size: "930 × 180 px" },
      { title: "Small Rectangle", size: "180 × 150 px" }
    ]
  },
  print: {
    posters: [
      { title: "A4 Poster / Flyer", size: "210 × 297 mm" },
      { title: "A3 Poster", size: "297 × 420 mm" },
      { title: "A2 Poster", size: "420 × 594 mm" },
      { title: "A1 Poster", size: "594 × 841 mm" },
      { title: "A0 Poster", size: "841 × 1189 mm" }
    ],
    rollups: [
      { title: "Small Roll-up", size: "2 × 4 ft" },
      { title: "Vertical Banner", size: "2 × 6 ft" },
      { title: "Event Banner", size: "3 × 6 ft" },
      { title: "Large Display", size: "4 × 6 ft" },
      { title: "Billboard Style", size: "4 × 8 ft" },
      { title: "Outdoor Promotion", size: "5 × 10 ft" },
      { title: "Trade Show Booth", size: "6 × 3 ft" }
    ],
    billboards: [
      { title: "Building Banner", size: "8 × 20 ft" },
      { title: "Billboard Banner", size: "10 × 30 ft" },
      { title: "Highway Billboard", size: "14 × 48 ft" }
    ]
  },
  social: {
    facebook: [
      { title: "Profile Picture", size: "180 × 180 px" },
      { title: "Cover Photo", size: "820 × 312 px" },
      { title: "Event Cover", size: "1920 × 1005 px" },
      { title: "Shared Image", size: "1200 × 630 px" },
      { title: "Ad Image", size: "1080 × 1080 px" }
    ],
    instagram: [
      { title: "Profile Picture", size: "320 × 320 px" },
      { title: "Square Post", size: "1080 × 1080 px" },
      { title: "Portrait Post", size: "1080 × 1350 px" },
      { title: "Landscape Post", size: "1080 × 566 px" },
      { title: "Story/Reel", size: "1080 × 1920 px" }
    ],
    twitter: [
      { title: "Profile Picture", size: "400 × 400 px" },
      { title: "Header Photo", size: "1500 × 500 px" },
      { title: "In-Stream Image", size: "1200 × 675 px" }
    ],
    linkedin: [
      { title: "Profile Picture", size: "400 × 400 px" },
      { title: "Personal Cover", size: "1584 × 396 px" },
      { title: "Company Logo", size: "300 × 300 px" },
      { title: "Company Cover", size: "1128 × 191 px" },
      { title: "Shared Image", size: "1200 × 627 px" }
    ],
    youtube: [
      { title: "Profile Picture", size: "800 × 800 px" },
      { title: "Channel Art", size: "2560 × 1440 px" },
      { title: "Thumbnail", size: "1280 × 720 px" }
    ],
    tiktok: [
      { title: "Profile Picture", size: "200 × 200 px" },
      { title: "Video", size: "1080 × 1920 px" }
    ],
    pinterest: [
      { title: "Profile Picture", size: "165 × 165 px" },
      { title: "Pin", size: "1000 × 1500 px" },
      { title: "Board Cover", size: "222 × 150 px" }
    ]
  },
  logos: {
    digital: [
      { title: "Website Favicon", size: "16 × 16 px" },
      { title: "Web App Icon (Small)", size: "32 × 32 px" },
      { title: "Web App Icon (Standard)", size: "180 × 180 px" },
      { title: "App Icon (iOS/Android)", size: "512 × 512 px" },
      { title: "Square Logo", size: "500 × 500 px" }
    ],
    print: [
      { title: "Business Card Logo", size: "300 × 300 px" },
      { title: "Letterhead Logo", size: "1000 × 1000 px" },
      { title: "T-Shirt/Clothing Print", size: "4500 × 5400 px" },
      { title: "Large Print (Posters)", size: "2500 × 2500 px" },
      { title: "Billboard Logo", size: "5000 × 5000 px" }
    ],
    social: [
      { title: "Facebook/Instagram Profile", size: "320 × 320 px" },
      { title: "Twitter Profile", size: "400 × 400 px" },
      { title: "LinkedIn Company Logo", size: "300 × 300 px" },
      { title: "YouTube Channel Logo", size: "800 × 800 px" },
      { title: "Pinterest Profile", size: "165 × 165 px" }
    ]
  }
};

export const GeneratorSizeOptions: { [key in GeneratorType]: { [category: string]: {title: string; size: string}[] } } = {
  [GeneratorType.Logo]: {
    'Digital Logos': bannerSizes.logos.digital,
    'Print Logos': bannerSizes.logos.print,
    'Social Media Logos': bannerSizes.logos.social,
  },
  [GeneratorType.Banner]: {
    'Popular Web Banners': bannerSizes.web.popular,
    'Additional Web Banners': bannerSizes.web.additional,
    'Posters': bannerSizes.print.posters,
    'Roll-up Banners': bannerSizes.print.rollups,
    'Billboards': bannerSizes.print.billboards,
  },
  [GeneratorType.SocialPoster]: {
    'Facebook': bannerSizes.social.facebook,
    'Instagram': bannerSizes.social.instagram,
    'X (Twitter)': bannerSizes.social.twitter,
    'LinkedIn': bannerSizes.social.linkedin,
    'YouTube': bannerSizes.social.youtube,
    'TikTok': bannerSizes.social.tiktok,
    'Pinterest': bannerSizes.social.pinterest,
  }
};

export const SampleFormData: { [key in GeneratorType]: Partial<FormData>[] } = {
    [GeneratorType.Logo]: [
      { logoText: 'Starlight', description: 'A minimalist logo for a space exploration blog, using constellations as inspiration.' },
      { logoText: 'AquaPure', description: 'A clean, modern logo for a water filtration company, featuring a stylized water drop and leaf.' },
      { logoText: 'Forge', description: 'A strong, industrial logo for a custom metalworking shop, perhaps using an anvil or hammer motif.' },
      { logoText: 'Zenith', description: 'An elegant logo for a luxury real estate agency, suggesting peaks and success.' },
      { logoText: 'ByteBloom', description: 'A futuristic logo for a tech startup focused on AI-driven agriculture.' },
    ],
    [GeneratorType.Banner]: [
      { copyTitle: 'The Ultimate Coding Bootcamp', copyText: 'Go from beginner to pro in 12 weeks.', features: 'Live mentorship, Real-world projects, Career support', buttonText: 'Enroll Now', description: 'An online tech education platform.' },
      { copyTitle: 'Sustainable Style, Delivered.', copyText: 'Eco-friendly fashion for the conscious consumer.', features: 'Organic cotton, Recycled materials, Ethical production', buttonText: 'Shop the Collection', description: 'An e-commerce clothing brand focused on sustainability.' },
      { copyTitle: 'Your Next Adventure Awaits', copyText: 'Book flights, hotels, and experiences worldwide.', features: 'Best price guarantee, 24/7 customer support, Flexible booking', buttonText: 'Start Exploring', description: 'A comprehensive travel booking website.' },
      { copyTitle: 'Master Your Workflow', copyText: 'The all-in-one productivity app for teams.', features: 'Task management, Collaborative docs, Time tracking', buttonText: 'Try for Free', description: 'A SaaS product for project management.' },
    ],
    [GeneratorType.SocialPoster]: [
      { copyTitle: 'New Arrival: The Astro Sneaker', copyText: 'Walk on clouds with our new lightweight, breathable shoe.', features: 'Limited edition colorway!', buttonText: 'Shop Now', description: 'A trendy footwear brand launching a new product.' },
      { copyTitle: 'Weekly Special: 50% Off Lattes', copyText: 'Get your caffeine fix for less. This week only!', features: 'Valid at all locations', buttonText: 'Find a Store', description: 'A local coffee shop chain running a promotion.' },
      { copyTitle: 'Join Our Free Webinar!', copyText: 'Learn the secrets of digital marketing from industry experts.', features: 'Live Q&A session, Free resources included', buttonText: 'Register Today', description: 'A marketing agency hosting an educational event.' },
      { copyTitle: 'Happy Earth Day!', copyText: 'Let\'s work together to protect our planet. What are you doing to help?', features: 'Featuring an image of a lush, green landscape.', buttonText: 'Learn More', description: 'A non-profit environmental organization raising awareness.' },
    ]
};