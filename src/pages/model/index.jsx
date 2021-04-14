import React from "react";
import styles from "./style.module.scss";

export const Model = ({ status, heading,subheading='', runAgain }) => status ? (
    <div className={styles.endgame}>
      <div className={`${styles["endgame-relative"]} ${styles[status]}`}>
        <h2 className={`${styles["endgame-header"]}`}>{heading}</h2>
        {subheading && <p>{subheading}</p>}
        <button className={`${styles["endgame-btn"]}`} onClick={runAgain}>PlAY AGAIN</button>
      </div>
      <div
        className={`${styles["endgame-relative"]} ${styles["endgame-overlay"]}`}
      ></div>
    </div>
  ) : null;
