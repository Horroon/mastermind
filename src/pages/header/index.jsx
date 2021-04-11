import React from "react";
import styles from "./style.module.scss";

export const Header = () => {
  return (
    <nav className={styles.header}>
      <div className={styles.headerbody}>
        <div className={styles.colorwordswrapper}>
          <span>M</span>
          <span>A</span>
          <span>S</span>
          <span>T</span>
          <span>E</span>
          <span>R</span>
        </div>
        <div className={styles.withoutcolorwrapper}>
          <span>M I N D</span>
        </div>
      </div>
    </nav>
  );
};
