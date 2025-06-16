import {
  Home,
  Star,
  Heart,
  Shield,
  Zap,
  Compass,
  Hexagon,
  Triangle,
  Circle,
  Square,
  Monitor,
  Smartphone,
  Coffee,
  Leaf,
  Rocket,
  Globe,
} from "lucide-react";
export const fontOptions = [
  { value: "poppins", label: "Poppins", class: "font-sans" },
  { value: "arial", label: "Arial", class: "font-sans" },
  { value: "mono", label: "Mono", class: "font-mono" },
  { value: "outfit", label: "Outfit", class: "font-sans" },
  { value: "inter", label: "Inter", class: "font-sans" },
  { value: "roboto", label: "Roboto", class: "font-sans" },
];

// Icon options
export const iconOptions = [
  {
    value: "star",
    label: "Star",
    icon: Star,
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    value: "heart",
    label: "Heart",
    icon: Heart,
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    value: "shield",
    label: "Shield",
    icon: Shield,
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    value: "zap",
    label: "Lightning",
    icon: Zap,
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 13 10 13 2" />
      </svg>
    ),
  },
  {
    value: "compass",
    label: "Compass",
    icon: Compass,
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polygon points="16 8 14 14 8 16 10 10 16 8" />
      </svg>
    ),
  },
  {
    value: "hexagon",
    label: "Hexagon",
    icon: Hexagon,
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polygon points="21 16 12 22 3 16 3 8 12 2 21 8 21 16" />
      </svg>
    ),
  },
  {
    value: "home",
    label: "Home",
    icon: Home,
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    value: "monitor",
    label: "Monitor",
    icon: Monitor,
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    value: "smartphone",
    label: "Mobile",
    icon: Smartphone,
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" x2="12" y1="18" y2="18" />
      </svg>
    ),
  },
  {
    value: "coffee",
    label: "Coffee",
    icon: Coffee,
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
        <line x1="6" x2="6" y1="2" y2="4" />
        <line x1="10" x2="10" y1="2" y2="4" />
        <line x1="14" x2="14" y1="2" y2="4" />
      </svg>
    ),
  },
  {
    value: "leaf",
    label: "Leaf",
    icon: Leaf,
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M2 22s0-8 6-14 14-6 14-6 0 8-6 14-14 6-14 6Z" />
        <path d="M14 10c0 0-4.5 0-10 6" />
      </svg>
    ),
  },
  {
    value: "globe",
    label: "Globe",
    icon: Globe,
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" x2="22" y1="12" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

// Shape options
export const shapeOptions = [
  { value: "circle", label: "Circle", icon: Circle },
  { value: "square", label: "Square", icon: Square },
  { value: "triangle", label: "Triangle", icon: Triangle },
  { value: "none", label: "None", icon: null },
];

// Layout options
export const layoutOptions = [
  { value: "icon-above", label: "Icon Above Text" },
  { value: "icon-left", label: "Icon Left of Text" },
  { value: "icon-background", label: "Icon as Background" },
];

// Color palette
export const colorPalette = [
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
  "#f97316",
  "#6366f1",
  "#14b8a6",
  "#f43f5e",
];
