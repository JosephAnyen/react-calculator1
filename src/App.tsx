import "./styles.css";
import { useReducer } from "react";

const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
}; //Action is adding the digits

function reducer(state: any, { type, payload }: any) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    default:
      return state;
  }
} //types because we are going to different types of actions and payload is the data we are going to send along with the action

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "1" } });

  return (
    <div className="calculator-Grid">
      <div className="output">
        <div className="previous-Operand">
          {previousOperand} {operation}
        </div>
        <div className="current-Operand">{currentOperand}</div>
      </div>

      <button>√</button>
      <button>π</button>
      <button>!</button>
      <button>^</button>
      <button>Rad</button>
      <button>sin</button>
      <button>cos</button>
      <button>tan</button>
      <button>Inv</button>
      <button>e</button>
      <button>In</button>
      <button>log</button>
      <button className="AC">AC</button>
      <button>()</button>
      <button>%</button>
      <button>÷</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button>⌫</button>
      <button>=</button>
    </div>
  );
}

export default App;
