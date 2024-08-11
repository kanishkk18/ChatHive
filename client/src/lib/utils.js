import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import animationData from "@/assets/lottie-json";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const colors = [
  "bg-gradient-to-r from-yellow-400 to-amber-500 text-[#fff] border-none",
  "bg-gradient-to-r from-cyan-500 to-blue-600 text-bold text-[#fff]  border-none",
  "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-[#fff] border-none",
  "bg-gradient-to-r from-amber-500 to-pink-500 text-[#fff] border-none",
  'bg-gradient-to-r from-red-500 to-orange-500 text-[#fff] border-none'
];

export const getColor = (color) => {
  if (color >= 0 && color < colors.length) {
    return colors[color];
  }
  return colors[0]; // Fallback to the first color if out of range
};

export const animationDefaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
