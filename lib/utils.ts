import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const colors = [
  "bg-gradient-to-r from-yellow-400 to-amber-500 text-[#fff] border-none",
  "bg-gradient-to-r from-cyan-500 to-blue-600 text-bold text-[#fff] border-none",
  "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-[#fff] border-none",
  "bg-gradient-to-r from-amber-500 to-pink-500 text-[#fff] border-none",
  'bg-gradient-to-r from-red-500 to-orange-500 text-[#fff] border-none'
];

export const getColor = (color: number) => {
  if (color >= 0 && color < colors.length) {
    return colors[color];
  }
  return colors[0]; // Fallback to the first color if out of range
};

export const animationDefaultOptions = {
  loop: true,
  autoplay: true,
  animationData: {
    // Add your lottie animation data here
    v: "5.5.7",
    fr: 29.9700012207031,
    ip: 0,
    op: 90.0000036657751,
    w: 1920,
    h: 1080,
    nm: "Comp 1",
    ddd: 0,
    assets: [],
    layers: []
  },
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};