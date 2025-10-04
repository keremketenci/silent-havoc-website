// react
import React, { Children } from "react";

// styles
import styles from "@/components/ui/button/ButtonSlideX.module.css";

interface ButtonSlideXProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ButtonSlideX: React.FC<ButtonSlideXProps> = ({
  text,
  children,
  className,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.ButtonSlideX} cursor-pointer md:cursor-none cursor-target ${className || ""}`}
    >
      {children || text}
    </button>
  );
};
