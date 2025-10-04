"use client";

import React from "react";
import styles from "@/components/ui/button/ButtonNav.module.css";

interface ButtonNavProps {
  checked: boolean;              // dışarıdan gelen state
  onChange: () => void;          // toggle için callback
}

export const ButtonNav: React.FC<ButtonNavProps> = ({ checked, onChange }) => {
  return (
    <label className={styles.ButtonNav} htmlFor="ButtonNav">
      <input
        type="checkbox"
        id="ButtonNav"
        checked={checked}          // controlled
        onChange={onChange}        // state Navbar’da değişecek
      />
      <span></span>
      <span></span>
      <span></span>
    </label>
  );
};

export default ButtonNav;
