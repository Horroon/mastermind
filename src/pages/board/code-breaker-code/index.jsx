import React from "react";
import styles from "./style.module.scss";
import {HintsValue} from "../../../constants/index";

export const CodeBreakerBoard = ({
  codebreakerrows = [],
  updateBreakerCode,
  NextRow,
}) => (
    <div className={styles.codebreakercontainer}>
      {codebreakerrows.map((row, j) => {
        return (
          <div
            className={`${styles.coderbreakerrow} ${
              !row.turn ? "disabled" : "border"
            }`}
            key={`row-${j}`}
          >
            <div className={styles.codebreakercodes}>
              {row.codenames.map((name, i) => (
                <div
                  key={`code-${j}-${i}`}
                  className={name}
                  onClick={() => row.turn && updateBreakerCode(j, i)}
                ></div>
              ))}
            </div>
            <div className={styles.codebreakersubmitbtn}>
              {row.isrowdone && row.turn && (
                <button onClick={() => NextRow(j)}></button>
              )}
            </div>
            <div className={styles.right}>
              <div className={styles['hints-row']}>
                  {
                      row.hints.map((hint,i)=><span key={`hint-${j}-${i}`} id={`hint-${j}-${i}`} className={`${styles.hint} ${hint===HintsValue.cross && 'none-matches'} ${hint===HintsValue.black && 'exact-matches'}`}></span>)
                  }
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
