import "./styles.css";
import { useReducer } from "react";
import DigiButtons from "./DigiButtons";
import OperationButtons from "./OperationButton";

// Define all possible actions for the calculator
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

// List of unary operations that work on a single number
const UNARY_OPERATIONS = [
  "√",
  "!",
  "Sin",
  "Cos",
  "Tan",
  "Inv",
  "In",
  "log",
  "Rad",
];

// Reducer function to manage calculator state based on dispatched actions
function reducer(state: any, { type, payload }: any) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      // If we just evaluated an expression, replace the result with new digit
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      // Prevent multiple zeros at the beginning
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      // Prevent multiple decimal points
      if (payload.digit === "." && state.currentOperand?.includes("."))
        return state;
      // Add the digit to current operand
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      // Handle constants (π and e) - they act as numbers
      if (payload.operation === "π") {
        return {
          ...state,
          currentOperand: Math.PI.toString(),
        };
      }
      if (payload.operation === "e") {
        return {
          ...state,
          currentOperand: Math.E.toString(),
        };
      }

      // Handle unary operations (operations that work on current number immediately)
      if (UNARY_OPERATIONS.includes(payload.operation)) {
        if (state.currentOperand == null) return state;

        const result = evaluateUnary(state.currentOperand, payload.operation);
        return {
          ...state,
          currentOperand: result,
        };
      }

      // Handle binary operations (need two numbers)
      // Can't choose operation if there are no operands
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      // If no current operand, just update the operation
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      // If no previous operand, move current to previous and set operation
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      // If both operands exist, evaluate the current expression first
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    case ACTIONS.CLEAR:
      // Reset calculator to initial state
      return {};

    case ACTIONS.DELETE_DIGIT:
      // If we just evaluated, clear the current operand
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      // Nothing to delete if current operand is empty
      if (state.currentOperand == null) return state;
      // If only one digit, set to null instead of empty string
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }

      // Remove the last digit from current operand
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case ACTIONS.EVALUATE:
      // Can't evaluate if we don't have all necessary parts
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      // Evaluate the expression and display result
      return {
        ...state,
        overwrite: true, // Next digit input will replace this result
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };

    default:
      return state;
  }
}

// Function to evaluate unary operations (operations on a single number)
function evaluateUnary(operand: string, operation: string) {
  const num = parseFloat(operand);
  if (isNaN(num)) return "";
  let result: any = "";

  switch (operation) {
    case "√":
      result = Math.sqrt(num); // Square root
      break;
    case "!":
      // Factorial calculation using recursive function
      result = (function factorial(n: number): number {
        if (n < 0) return NaN;
        return n <= 1 ? 1 : n * factorial(n - 1);
      })(Math.floor(num)); // Use floor for factorial
      break;
    case "Rad":
      result = (num * Math.PI) / 180; // Degrees to Radians
      break;
    case "Sin":
      result = Math.sin(num); // Sine
      break;
    case "Cos":
      result = Math.cos(num); // Cosine
      break;
    case "Tan":
      result = Math.tan(num); // Tangent
      break;
    case "Inv":
      result = 1 / num; // Inverse (1/x)
      break;
    case "In":
      result = Math.log(num); // Natural logarithm
      break;
    case "log":
      result = Math.log10(num); // Base 10 logarithm
      break;
  }

  return result.toString();
}

// Function to perform the actual calculation for binary operations
function evaluate({ currentOperand, previousOperand, operation }: any) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  // Return empty string if operands are not valid numbers
  if (isNaN(prev) || isNaN(current)) return "";
  let computation: any = "";

  switch (operation) {
    case "+":
      computation = prev + current; // Addition
      break;
    case "-":
      computation = prev - current; // Subtraction
      break;
    case "*":
      computation = prev * current; // Multiplication
      break;
    case "÷":
      computation = prev / current; // Division
      break;
    case "%":
      computation = prev % current; // Modulus
      break;
    case "^":
      computation = Math.pow(prev, current); // Power/Exponentiation
      break;
  }

  // Convert result to string for display
  return computation.toString();
}

function App() {
  // useReducer hook to manage calculator state
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}, // Initial state is empty object
  );

  return (
    <div className="calculator-Grid">
      {/* Display section showing previous and current operands */}
      <div className="output">
        <div className="previous-Operand">
          {previousOperand} {operation}
        </div>
        <div className="current-Operand">{currentOperand}</div>
      </div>

      {/* Scientific calculator operation buttons */}
      <OperationButtons operation="√" dispatch={dispatch} />
      <OperationButtons operation="π" dispatch={dispatch} />
      <OperationButtons operation="!" dispatch={dispatch} />
      <OperationButtons operation="^" dispatch={dispatch} />
      <OperationButtons operation="Rad" dispatch={dispatch} />
      <OperationButtons operation="Sin" dispatch={dispatch} />
      <OperationButtons operation="Cos" dispatch={dispatch} />
      <OperationButtons operation="Tan" dispatch={dispatch} />
      <OperationButtons operation="Inv" dispatch={dispatch} />
      <OperationButtons operation="e" dispatch={dispatch} />
      <OperationButtons operation="In" dispatch={dispatch} />
      <OperationButtons operation="log" dispatch={dispatch} />

      {/* Clear button to reset calculator */}
      <button className="AC" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>
        AC
      </button>
      {/* Parentheses button (not yet implemented) */}
      <button>()</button>

      {/* Basic operation buttons */}
      <OperationButtons operation="%" dispatch={dispatch} />
      <OperationButtons operation="÷" dispatch={dispatch} />

      {/* Number pad - Row 1 */}
      <DigiButtons digit="1" dispatch={dispatch} />
      <DigiButtons digit="2" dispatch={dispatch} />
      <DigiButtons digit="3" dispatch={dispatch} />
      <OperationButtons operation="*" dispatch={dispatch} />

      {/* Number pad - Row 2 */}
      <DigiButtons digit="4" dispatch={dispatch} />
      <DigiButtons digit="5" dispatch={dispatch} />
      <DigiButtons digit="6" dispatch={dispatch} />
      <OperationButtons operation="+" dispatch={dispatch} />

      {/* Number pad - Row 3 */}
      <DigiButtons digit="7" dispatch={dispatch} />
      <DigiButtons digit="8" dispatch={dispatch} />
      <DigiButtons digit="9" dispatch={dispatch} />
      <OperationButtons operation="-" dispatch={dispatch} />

      {/* Bottom row - decimal point, zero, delete, and equals */}
      <DigiButtons digit="." dispatch={dispatch} />
      <DigiButtons digit="0" dispatch={dispatch} />

      {/* Delete/Backspace button */}
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        ⌫
      </button>
      {/* Equals button to evaluate expression */}
      <button onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
  );
}

export default App;
