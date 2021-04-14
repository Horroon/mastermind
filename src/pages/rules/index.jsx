import React, { useState } from "react";
import styles from "./style.module.scss";

export const GameRules = () => {
    const [rule,setRule] = useState(false)

  return (
    <div className={styles.rulecontainer}>
      <div className={styles.rulebuttoncontainer}>
        <button onClick={()=>setRule(!rule)}>{rule?'Hide rules' :'Show rules'}</button>
      </div>
      <p className={`${styles.contentcontainer} ${!rule && 'hidden'}`}>
        Try to guess the pattern, in both order and color, within ten turns.
        After submitting a row, a small black peg is placed for each code peg
        from the guess which is correct in both color and position. A white peg
        indicates the existence of a correct color code peg placed in the wrong
        position. More info on <a href="https://en.wikipedia.org/wiki/Mastermind_(board_game)">Wikipedia.</a>
      </p>
    </div>
  );
};
