import React, { useReducer } from "react";
import { CodeBreakerBoard } from "./code-breaker-code/index";
import {
  Colors as ColorCodes,
  PropertiesForMainBoard,
  HintsValue,
  status,
} from "../../constants/index";
import { Colors } from "./colors/index";
import { Model } from "../model/index";
import styles from "./style.module.scss";

const reducers = (state, action) => {
  switch (action.type) {
    case PropertiesForMainBoard.selectColor:
      return { ...state, selectedColor: action.payload };
    case PropertiesForMainBoard.updatecodebreakercode:
      return { ...state, codebreakerrows: action.payload };
    case PropertiesForMainBoard.updatemastercode:
      return { ...state, masterSelectedCodes: action.payload };
    case PropertiesForMainBoard.reset:
      return { ...action.payload };
    case PropertiesForMainBoard.gameend:
      return { ...state, gameend: action.payload };
    default:
      return state;
  }
};

const ResetCodeBreakerRows = () => [
  {
    codenames: ["", "", "", ""],
    isrowdone: false,
    turn: true,
    hints: ["", "", "", ""],
  },
  {
    codenames: ["", "", "", ""],
    isrowdone: false,
    turn: false,
    hints: ["", "", "", ""],
  },
  {
    codenames: ["", "", "", ""],
    isrowdone: false,
    turn: false,
    hints: ["", "", "", ""],
  },
  {
    codenames: ["", "", "", ""],
    isrowdone: false,
    turn: false,
    hints: ["", "", "", ""],
  },
  {
    codenames: ["", "", "", ""],
    isrowdone: false,
    turn: false,
    hints: ["", "", "", ""],
  },
  {
    codenames: ["", "", "", ""],
    isrowdone: false,
    turn: false,
    hints: ["", "", "", ""],
  },
  {
    codenames: ["", "", "", ""],
    isrowdone: false,
    turn: false,
    hints: ["", "", "", ""],
  },
  {
    codenames: ["", "", "", ""],
    isrowdone: false,
    turn: false,
    hints: ["", "", "", ""],
  },
  {
    codenames: ["", "", "", ""],
    isrowdone: false,
    turn: false,
    hints: ["", "", "", ""],
  },
  {
    codenames: ["", "", "", ""],
    isrowdone: false,
    turn: false,
    hints: ["", "", "", ""],
  },
];

const BuildMasterCodes = () => {
  const c1 = parseInt(Math.random() * 6);
  const c2 = parseInt(Math.random() * 6);
  const c3 = parseInt(Math.random() * 6);
  const c4 = parseInt(Math.random() * 6);
  return [
    ColorCodes[c1].name,
    ColorCodes[c2].name,
    ColorCodes[c3].name,
    ColorCodes[c4].name,
  ];
};

const InitialState = {
  selectedColor: ColorCodes[0].name,
  codebreakerrows: ResetCodeBreakerRows(),
  masterSelectedCodes: BuildMasterCodes(),
  gameend: {
    status: "",
    heading: "",
    subheading: "",
  },
};

export const Board = () => {
  const [state, setState] = useReducer(reducers, InitialState);

  const updateBreakerCode = (rowindex, codeIdex) => {
    const { codebreakerrows, selectedColor } = state;
    const row = codebreakerrows[rowindex];
    const codenames = row.codenames;
    codenames[codeIdex] = selectedColor;
    row.codenames = codenames;
    codebreakerrows[rowindex] = row;
    let isRowDone = true;
    row.codenames.map((name) => {
      if (!name) {
        isRowDone = false;
      }
      return name;
    });
    row.isrowdone = isRowDone;

    setState({
      type: PropertiesForMainBoard.updatecodebreakercode,
      payload: codebreakerrows,
    });
  };

  const NextRow = (rowindex) => {
    const { codebreakerrows, selectedColor, masterSelectedCodes } = state;
    if (rowindex <= state.codebreakerrows.length - 1) {
      const prerow = codebreakerrows[rowindex];
      const prerowcodes = prerow.codenames;

      let makeHints = [];
      let comparablecodes = [...masterSelectedCodes];
      for (let index = 0; index <= prerowcodes.length - 1; index++) {
        const prcode = prerowcodes[index];
        if (comparablecodes.includes(prcode)) {
          const cpcindex = comparablecodes.indexOf(prcode);
          comparablecodes[cpcindex] = "";
          if (masterSelectedCodes[index] === prcode) {
            makeHints.push(HintsValue.black);
          } else {
            makeHints.push(HintsValue.white);
          }
        } else {
          makeHints.push(HintsValue.cross);
        }
      }

      let makeADecision = true;

      for (const hint of makeHints) {
        if (hint !== HintsValue.black) {
          makeADecision = false;
        }
      }

      if (makeADecision) {
        setState({
          type: PropertiesForMainBoard.gameend,
          payload: {
            status: status.success,
            heading: "Congratulation!",
            subheading: "You have won the game.",
          },
        });
      }
      if (rowindex === state.codebreakerrows.length - 1 && !makeADecision) {
        setState({
          type: PropertiesForMainBoard.gameend,
          payload: {
            status: status.failure,
            heading: "GAME OVER!",
          },
        });
      } else {
        const nextrow = codebreakerrows[rowindex + 1];
        prerow.turn = false;
        prerow.hints = makeHints.reverse();
        nextrow.turn = true;
        codebreakerrows[rowindex] = prerow;
        codebreakerrows[rowindex + 1] = nextrow;
        setState({ type: "updatecodebreakercode", payload: codebreakerrows });
      }
    }
  };

  const RunAgainGame = () => {
    setState({
      type: PropertiesForMainBoard.reset,
      payload: {
        ...InitialState,
        codebreakerrows: ResetCodeBreakerRows(),
        masterSelectedCodes: BuildMasterCodes(),
        gameend: { status: "", heading: "", subheading: "" },
      },
    });
  };
  return (
    <div className={styles.board}>
      <CodeBreakerBoard
        codebreakerrows={state.codebreakerrows}
        updateBreakerCode={updateBreakerCode}
        NextRow={NextRow}
      />
      <Colors
        colors={ColorCodes}
        selectColor={setState}
        selectedColor={state.selectedColor}
      />
      <Model
        status={state.gameend.status}
        runAgain={RunAgainGame}
        heading={state.gameend.heading}
        subheading={state.gameend.subheading}
      />
    </div>
  );
};
