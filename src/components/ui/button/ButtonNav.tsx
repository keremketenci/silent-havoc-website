"use client";

import React from "react";
import styles from "@/components/ui/button/ButtonNav.module.css";

interface ButtonNavProps {
  checked: boolean; // state coming from outside
  onChange: () => void; // callback to toggle
}

export const ButtonNav: React.FC<ButtonNavProps> = ({ checked, onChange }) => {
  return (
    <label className={styles.ButtonNav} htmlFor="ButtonNav">
      <input
        type="checkbox"
        id="ButtonNav"
        checked={checked} // controlled
        onChange={onChange} // state will change in Navbar
      />
      <span></span>
      <span></span>
      <span></span>
    </label>
  );
};

export default ButtonNav;
