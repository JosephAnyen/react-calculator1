# Scientific Calculator App

A feature-rich scientific calculator built with React and TypeScript.  
It supports basic arithmetic operations, trigonometric functions, logarithms, and more with a clean and intuitive UI.

## Features

### Basic Operations

- Arithmetic operations (+, −, ×, ÷)
- Modulus (%)
- Power/Exponentiation (^)
- Percentage calculations

### Scientific Functions

- **Trigonometric Functions**: Sin, Cos, Tan
- **Square Root** (√)
- **Factorial** (!)
- **Inverse** (1/x)
- **Logarithms**: Natural log (ln) and Base-10 log (log)
- **Angle Conversion**: Degrees to Radians (Rad)

### Mathematical Constants

- Pi (π)
- Euler's number (e)

### User Interface

- Clear (AC) button to reset calculator
- Delete (⌫) button to remove last digit
- Responsive layout using CSS Grid
- Real-time calculation display
- Previous operand and operation display

## Tech Stack

- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **CSS Grid** - Responsive layout system
- **useReducer Hook** - State management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/calculator-app.git
cd calculator-app
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

### Basic Calculations

1. Click number buttons (0-9) to input digits
2. Click operation buttons (+, −, ×, ÷) to select operation
3. Click equals (=) to calculate result
4. Click AC to clear all

### Scientific Functions

1. Enter a number
2. Click a scientific function button (Sin, Cos, √, etc.)
3. The result is calculated immediately

### Using Constants

- Click π or e to insert the mathematical constant value

## Project Structure

```
calculator-app/
├── src/
│   ├── App.tsx              # Main calculator component with reducer logic
│   ├── DigiButtons.tsx      # Digit button component
│   ├── OperationButton.tsx  # Operation button component
│   ├── styles.css           # Calculator styling
│   └── main.tsx            # App entry point
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Code Architecture

The calculator uses React's `useReducer` hook for state management with the following actions:

- `ADD_DIGIT` - Adds a digit to the current operand
- `CHOOSE_OPERATION` - Selects an operation (binary or unary)
- `CLEAR` - Resets the calculator
- `DELETE_DIGIT` - Removes the last digit
- `EVALUATE` - Calculates the final result

## Future Enhancements

- [ ] Parentheses support for complex expressions
- [ ] Memory functions (M+, M-, MR, MC)
- [ ] Keyboard input support
- [ ] Calculation history
- [ ] Dark/Light theme toggle
- [ ] More scientific functions (sinh, cosh, tanh, etc.)
- [ ] Angle mode toggle (Degrees/Radians)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Joseph Atta Anyen

- GitHub: [@JosephAnyen](https://github.com/josephAnyen)
- LinkedIn: https://www.linkedin.com/in/joseph-atta-anyen-8b44b4b2/

## Acknowledgments

- Built as part of learning React and TypeScript
- Inspired by standard scientific calculators
