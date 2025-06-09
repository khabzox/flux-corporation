import { icons } from "@/constants/icon";

// Define the shape of a single icon entry
export interface IconDefinition {
  defaultWidth?: number;
  defaultHeight?: number;
  viewBox: string;
  path: string | string[];
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
}

// Define the props for the Icon component
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: keyof typeof icons;
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  className?: string;
}

