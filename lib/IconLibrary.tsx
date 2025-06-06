
import React from "react";
import { icons } from "@/constants/icon";
import { IconProps } from "@/types/icon";

const Icon: React.FC<IconProps> = ({
  name,
  width,
  height,
  stroke,
  strokeWidth,
  className = "",
  fill,
  ...props
}) => {
  const icon = icons[name];

  if (!icon) {
    console.warn(`Icon "${name}" not found.`);
    return null;
  }

  const iconWidth = width ?? icon.defaultWidth ?? 24;
  const iconHeight = height ?? icon.defaultHeight ?? 24;

  const iconStroke = stroke ?? icon.stroke;
  const iconStrokeWidth = strokeWidth ?? icon.strokeWidth;
  const iconFill = fill ?? icon.fill ?? "none";

  const paths = Array.isArray(icon.path)
    ? icon.path.map((d: string, i: number) => (
        <path
          key={i}
          d={d}
          stroke={iconStroke}
          strokeWidth={iconStrokeWidth}
          fill={iconFill}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))
    : (
        <path
          d={icon.path}
          stroke={iconStroke}
          strokeWidth={iconStrokeWidth}
          fill={iconFill}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );

  return (
    <svg
      width={iconWidth}
      height={iconHeight}
      viewBox={icon.viewBox}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {paths}
    </svg>
  );
};

export default Icon;
