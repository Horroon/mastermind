import React from "react";
import { PropertiesForMainBoard } from "../../../constants/index";
import styles from "./style.module.scss";

export const Colors = ({ colors = [], selectColor, selectedColor ='' }) => (
    <div className={styles.colorscontainer}>
      {colors.map((color) => (
        <div
          className={`${color.name} ${selectedColor === color.name && 'selected'}`}
          key={color.name}
          onClick={() =>
            selectColor({
              type: PropertiesForMainBoard.selectColor,
              payload: color.name,
            })
          }
        ></div>
      ))}
    </div>
  );
