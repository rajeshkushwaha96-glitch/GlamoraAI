
import { Tool, ToolCategory } from './types';
import { 
  Sparkles, Eraser, Wand2, Zap, User, Image, 
  Palette, Sun, Moon, Smile, Eye, Camera, 
  Scissors, Layers, Brush, Droplet, Star, 
  Flame, Aperture, Ghost, Shirt, PenTool, Clock,
  Heart, Briefcase, UserCheck, IdCard
} from 'lucide-react';

export const APP_NAME = "Glamora AI";

// Helper to simulate dates for "Newest" sort
const getDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

export const TOOLS: Tool[] = [
  {
    id: 'outfit-changer',
    name: 'Outfit Changer',
    description: 'Try different outfit colors and styles in one click.',
    category: ToolCategory.PORTRAIT,
    iconName: 'Shirt',
    promptTemplate: 'Change the outfit of the person in this image to [Style] in [Color] color. Keep the rest of the image unchanged.',
    badge: 'New',
    popularityScore: 88,
    createdAt: getDate(2)
  },
  {
    id: 'tattoo-try-on',
    name: 'Tattoo Try-On',
    description: 'Preview virtual tattoos on arms, neck, or hands before getting inked.',
    category: ToolCategory.ARTISTIC,
    iconName: 'PenTool',
    promptTemplate: 'Add a [Style] tattoo on the [Placement] of the person in this image.',
    badge: 'Fun',
    popularityScore: 75,
    createdAt: getDate(15)
  },
  {
    id: 'age-filter',
    name: 'Age Filter',
    description: 'See younger and older versions of your face.',
    category: ToolCategory.PORTRAIT,
    iconName: 'Clock',
    promptTemplate: 'Make the person in this photo look [Direction] with [Intensity]% intensity.',
    badge: 'Trending',
    popularityScore: 92,
    createdAt: getDate(5)
  },
  {
    id: 'bg-remove',
    name: 'Remove Background',
    description: 'Instantly remove the background from any photo.',
    category: ToolCategory.BACKGROUND,
    iconName: 'Scissors',
    promptTemplate: 'Remove the background from this image, leaving only the main subject on a transparent or solid white background.',
    badge: 'Popular',
    popularityScore: 98,
    createdAt: getDate(60)
  },
  {
    id: 'selfie-glow',
    name: 'Selfie Glow',
    description: 'One-click selfie enhancer with skin smoothing, blemish removal, teeth whitening and eye brightening.',
    category: ToolCategory.BEAUTY,
    iconName: 'Sun',
    promptTemplate: 'Enhance this selfie with a natural glow. Smooth the skin, remove blemishes, whiten teeth slightly, and brighten the eyes while keeping the texture realistic.',
    badge: 'New',
    popularityScore: 85,
    createdAt: getDate(3)
  },
  {
    id: 'bridal-glam',
    name: 'Bridal Glam Look',
    description: 'Create bridal and party-ready makeup looks in one click.',
    category: ToolCategory.BEAUTY,
    iconName: 'Heart',
    promptTemplate: 'Apply a Soft Bridal makeup look to the person in this photo. Enhance eyes, lips, and skin for a wedding event.',
    badge: 'Hot',
    popularityScore: 94,
    createdAt: getDate(10)
  },
  {
    id: 'linkedin-profile',
    name: 'LinkedIn Profile',
    description: 'Polish your photo for professional profiles like LinkedIn.',
    category: ToolCategory.PORTRAIT,
    iconName: 'Briefcase',
    promptTemplate: 'Transform this image into a professional LinkedIn profile photo. Crop to 1:1 square if needed. Apply light skin smoothing and ensure a clean, professional look.',
    badge: 'Pro',
    popularityScore: 90,
    createdAt: getDate(20)
  },
  {
    id: 'hair-color',
    name: 'Hair Color Changer',
    description: 'Instantly change hair color with natural-looking shades.',
    category: ToolCategory.BEAUTY,
    iconName: 'Palette',
    promptTemplate: 'Change the hair color of the person in this image to [Selected Color]. Keep the rest of the image unchanged.',
    badge: 'New',
    popularityScore: 82,
    createdAt: getDate(4)
  },
  {
    id: 'eye-color',
    name: 'Eye Color Changer',
    description: 'Change eye color to brown, blue, green, hazel and more.',
    category: ToolCategory.BEAUTY,
    iconName: 'Eye',
    promptTemplate: 'Change the eye color of the person in this image to [Selected Color], maintaining realistic reflections and lighting.',
    popularityScore: 70,
    createdAt: getDate(45)
  },
  {
    id: 'face-smooth',
    name: 'Face Smooth',
    description: 'Smooth skin texture and remove imperfections.',
    category: ToolCategory.BEAUTY,
    iconName: 'Smile',
    promptTemplate: 'Retouch the face in this image, smoothing the skin texture while keeping it natural. Reduce blemishes.',
    popularityScore: 89,
    createdAt: getDate(50)
  },
  {
    id: 'body-shape',
    name: 'Body Shape Retouch',
    description: 'Subtly slim and reshape body and waist while keeping it natural.',
    category: ToolCategory.RETOUCH,
    iconName: 'User',
    promptTemplate: 'Subtly retouch the body shape in this image to look naturally fit and balanced, without distorting the background.',
    popularityScore: 78,
    createdAt: getDate(25)
  },
  {
    id: 'color-pop',
    name: 'Color Pop',
    description: 'Make colors vibrant and lively.',
    category: ToolCategory.ENHANCE,
    iconName: 'Palette',
    promptTemplate: 'Enhance the colors in this image, increasing saturation and vibrance to make it look pop and lively.',
    popularityScore: 65,
    createdAt: getDate(100)
  },
  {
    id: 'beauty-filters',
    name: 'Beauty Filters Pack',
    description: '1-click beauty presets: Natural, Glam, Bollywood, Cinematic.',
    category: ToolCategory.ENHANCE,
    iconName: 'Sparkles',
    promptTemplate: 'Apply a [Filter Name] beauty filter to this photo, enhancing skin tone, lighting, and overall aesthetic.',
    popularityScore: 80,
    createdAt: getDate(30)
  },
  {
    id: 'profile-picture',
    name: 'AI Profile Picture',
    description: 'Create studio-style profile photos with clean backgrounds.',
    category: ToolCategory.PORTRAIT,
    iconName: 'UserCheck',
    promptTemplate: 'Transform this image into a professional profile picture. Replace the background with a clean studio setting and enhance lighting on the face.',
    badge: 'Hot',
    popularityScore: 96,
    createdAt: getDate(12)
  },
  {
    id: 'passport-photo',
    name: 'Passport / ID Photo',
    description: 'Make passport and ID photos with white background and correct size.',
    category: ToolCategory.UTILITY,
    iconName: 'IdCard',
    promptTemplate: 'Crop and adjust this photo to look like a standard passport photo with a solid white background. Ensure face is evenly lit and facing forward.',
    popularityScore: 84,
    createdAt: getDate(40)
  },
  {
    id: 'low-light',
    name: 'Low Light Fix',
    description: 'Brighten and restore details in dark photos.',
    category: ToolCategory.ENHANCE,
    iconName: 'Moon',
    promptTemplate: 'Fix this low-light image. Brighten the shadows, reduce noise, and reveal hidden details.',
    popularityScore: 72,
    createdAt: getDate(120)
  },
  {
    id: 'upscale',
    name: 'AI Upscale',
    description: 'Increase resolution and sharpness.',
    category: ToolCategory.ENHANCE,
    iconName: 'Zap',
    promptTemplate: 'Upscale this image to a higher resolution, sharpening edges and adding details.',
    badge: 'HD',
    popularityScore: 91,
    createdAt: getDate(90)
  },
  {
    id: 'old-restore',
    name: 'Restore Old Photo',
    description: 'Repair scratches and restore color to old photos.',
    category: ToolCategory.RETOUCH,
    iconName: 'Wand2',
    promptTemplate: 'Restore this old photograph. Remove scratches, dust, and fix fading colors. Make it look new.',
    popularityScore: 87,
    createdAt: getDate(200)
  },
  {
    id: 'cartoonify',
    name: 'Cartoonify',
    description: 'Turn your photo into a 3D cartoon style.',
    category: ToolCategory.ARTISTIC,
    iconName: 'Ghost',
    promptTemplate: 'Transform this image into a 3D Pixar-style cartoon character or scene.',
    popularityScore: 83,
    createdAt: getDate(150)
  },
  {
    id: 'sketch',
    name: 'Pencil Sketch',
    description: 'Convert photo to a realistic pencil sketch.',
    category: ToolCategory.ARTISTIC,
    iconName: 'Brush',
    promptTemplate: 'Convert this image into a realistic pencil sketch drawing.',
    popularityScore: 68,
    createdAt: getDate(180)
  },
  {
    id: 'makeup',
    name: 'AI Makeup',
    description: 'Apply subtle, natural-looking makeup.',
    category: ToolCategory.BEAUTY,
    iconName: 'Star',
    promptTemplate: 'Apply subtle, natural-looking makeup to the person in this photo. Enhance lips, eyes, and cheeks.',
    popularityScore: 79,
    createdAt: getDate(55)
  },
  {
    id: 'teeth-whiten',
    name: 'Teeth Whitening',
    description: 'Brighten smiles instantly.',
    category: ToolCategory.BEAUTY,
    iconName: 'Sparkles',
    promptTemplate: 'Whiten the teeth of the person in this photo for a brighter smile, keeping it natural.',
    popularityScore: 76,
    createdAt: getDate(65)
  },
  {
    id: 'eye-brighten',
    name: 'Eye Brightener',
    description: 'Make eyes sparkle and stand out.',
    category: ToolCategory.BEAUTY,
    iconName: 'Eye',
    promptTemplate: 'Enhance the eyes in this photo. Make the iris sharper, brighter, and the whites clearer.',
    popularityScore: 60,
    createdAt: getDate(70)
  },
  {
    id: 'blemish',
    name: 'Blemish Remover',
    description: 'Remove acne and spots automatically.',
    category: ToolCategory.RETOUCH,
    iconName: 'Eraser',
    promptTemplate: 'Remove acne, spots, and blemishes from the skin in this photo.',
    popularityScore: 74,
    createdAt: getDate(62)
  },
  {
    id: 'sky-replace',
    name: 'Sky Replacement',
    description: 'Replace dull skies with sunny or sunset views.',
    category: ToolCategory.BACKGROUND,
    iconName: 'Sun',
    promptTemplate: 'Replace the sky in this image with a beautiful, dramatic blue sky with fluffy clouds.',
    popularityScore: 69,
    createdAt: getDate(110)
  },
  {
    id: 'object-remove',
    name: 'Magic Eraser',
    description: 'Remove unwanted objects or people.',
    category: ToolCategory.RETOUCH,
    iconName: 'Eraser',
    promptTemplate: 'Remove the distracting objects from the background of this image and fill the space naturally.',
    popularityScore: 93,
    createdAt: getDate(40)
  },
  {
    id: 'blur-bg',
    name: 'Blur Background',
    description: 'Add a DSLR-like bokeh effect.',
    category: ToolCategory.BACKGROUND,
    iconName: 'Aperture',
    promptTemplate: 'Apply a strong depth-of-field effect, blurring the background while keeping the subject sharp.',
    popularityScore: 81,
    createdAt: getDate(130)
  },
  {
    id: 'hdr',
    name: 'HDR Effect',
    description: 'High Dynamic Range for dramatic contrast.',
    category: ToolCategory.ENHANCE,
    iconName: 'Camera',
    promptTemplate: 'Apply an HDR effect to this image, balancing highlights and shadows with dramatic contrast.',
    popularityScore: 64,
    createdAt: getDate(140)
  },
  {
    id: 'vintage',
    name: 'Vintage Vibe',
    description: 'Classic 90s and retro film look.',
    category: ToolCategory.ARTISTIC,
    iconName: 'Image',
    promptTemplate: 'Apply a vintage 90s film look to this photo, with slight grain and retro color grading.',
    popularityScore: 71,
    createdAt: getDate(80)
  },
  {
    id: 'neon',
    name: 'Neon Glow',
    description: 'Cyberpunk style lighting effects.',
    category: ToolCategory.ARTISTIC,
    iconName: 'Flame',
    promptTemplate: 'Apply a cyberpunk neon glow filter to this image, emphasizing blues and pinks.',
    popularityScore: 73,
    createdAt: getDate(95)
  },
  {
    id: 'oil-paint',
    name: 'Oil Painting',
    description: 'Classic art style transformation.',
    category: ToolCategory.ARTISTIC,
    iconName: 'Palette',
    promptTemplate: 'Transform this image into a classic oil painting with visible brush strokes.',
    popularityScore: 55,
    createdAt: getDate(210)
  },
  {
    id: 'portrait-light',
    name: 'Portrait Light',
    description: 'Studio quality lighting adjustment.',
    category: ToolCategory.ENHANCE,
    iconName: 'User',
    promptTemplate: 'Improve the lighting on the subject\'s face to simulate professional studio lighting.',
    popularityScore: 67,
    createdAt: getDate(105)
  }
];

export const PLANS = [
  {
    name: "Free",
    price: "₹0",
    features: ["5 credits/month", "Standard speed", "720p downloads", "Limited tools"],
    cta: "Start Free",
    popular: false
  },
  {
    name: "Starter",
    price: "₹99",
    period: "/month",
    features: ["Unlock Premium Access", "Limited credits", "Standard speed", "1080p downloads"],
    cta: "Get Starter",
    popular: false
  },
  {
    name: "Pro",
    price: "₹499",
    period: "/month",
    features: ["500 credits/month", "Fast generation", "4K downloads", "All 20+ Tools", "Priority Support"],
    cta: "Get Pro",
    popular: true
  },
  {
    name: "Power",
    price: "₹1999",
    period: "/month",
    features: ["Unlimited credits", "Turbo speed", "Raw export", "API Access", "Commercial License"],
    cta: "Go Power",
    popular: false
  }
];
