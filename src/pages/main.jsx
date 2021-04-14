import React, { useState } from "react";
import { Header } from "./header/index";
import { GameRules } from "./rules/index";
import {Board} from "./board/index";
import {Model} from "./model/index";
import styles from "./style.module.scss";

export const MainScreen = () => {
    const [] = useState({status:'',})
  return (
    <div className={styles.maincontainer}>
      <div className={styles.headerwrapper}>
        <Header />
      </div>
      <div className={styles.ruleswrapper}>
        <GameRules />
      </div>
      <div className={styles.borderwrapper}>
        <Board />
      </div>
    </div>
  );
};
