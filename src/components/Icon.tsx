"use client";

// react
import React, { useEffect, useState } from "react";

interface IconProps {
  name: string;
  className?: string;
}

interface IconData {
  name: string;
  path: string;
}

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  const [iconPath, setIconPath] = useState<string>("/icons/loading.svg");

  useEffect(() => {
    const fetchIconPath = async () => {
      try {
        const response = await fetch("/icons.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const icon = (data.icons as IconData[]).find(
          (icon) => icon.name === name
        );
        if (icon) {
          setIconPath(icon.path);
        } else {
          console.error("Icon not found:", name);
        }
      } catch (error) {
        console.error("Error fetching icon data:", error);
      }
    };

    fetchIconPath();
  }, [name]);

  return iconPath ? (
    <img src={iconPath} alt={name} className={className} />
  ) : (
    <div className="flex justify-center">
      <img src={iconPath} className={"w-8"} />
    </div>
  );
};
