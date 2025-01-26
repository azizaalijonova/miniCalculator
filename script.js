let currentInput = "";
let operator = "";
let firstOperand = null;

function appendValue(value) {
  if (/^[0-9.]$/.test(value)) {
    currentInput += value;
    updateDisplay();
  }
}

function updateDisplay() {
  const display = document.getElementById("display");
  display.value = currentInput;
  display.focus();
  display.setSelectionRange(currentInput.length, currentInput.length);
}

function clearDisplay() {
  currentInput = "";
  operator = "";
  firstOperand = null;
  updateDisplay();
}

function deleteLast() {
  const display = document.getElementById("display");
  const cursorPos = display.selectionStart;
  if (cursorPos > 0) {
    currentInput =
      currentInput.slice(0, cursorPos - 1) + currentInput.slice(cursorPos);
    updateDisplay();
    display.setSelectionRange(cursorPos - 1, cursorPos - 1);
  }
}

function performOperation(op) {
  if (currentInput === "") return;
  if (firstOperand === null) {
    firstOperand = parseFloat(currentInput);
  } else {
    calculateResult();
  }
  operator = op;
  currentInput = "";
}

function calculateResult() {
  if (operator === "" || currentInput === "") return;
  const secondOperand = parseFloat(currentInput);
  let result;
  switch (operator) {
    case "+":
      result = firstOperand + secondOperand;
      break;
    case "-":
      result = firstOperand - secondOperand;
      break;
    case "*":
      result = firstOperand * secondOperand;
      break;
    case "/":
      result = firstOperand / secondOperand;
      break;
  }

  currentInput = result.toString();
  operator = "";
  firstOperand = null;
  updateDisplay();
}

function calculatePercent() {
  if (currentInput === "") return;
  currentInput = (parseFloat(currentInput) / 100).toString();
  updateDisplay();
}

function calculateLog() {
  if (currentInput === "") return;
  currentInput = Math.log10(parseFloat(currentInput)).toString();
  updateDisplay();
}

function calculateTrig(func) {
  if (currentInput === "") return;
  const radians = parseFloat(currentInput) * (Math.PI / 180);
  switch (func) {
    case "sin":
      currentInput = Math.sin(radians).toString();
      break;
    case "cos":
      currentInput = Math.cos(radians).toString();
      break;
    case "tan":
      currentInput = Math.tan(radians).toString();
      break;
  }
  updateDisplay();
}

function handleKeyboardInput(event) {
  const key = event.key;
  if (!isNaN(key) || key === ".") {
    appendValue(key);
  } else if (["+", "-", "*", "/"].includes(key)) {
    performOperation(key);
  } else if (key === "Enter") {
    calculateResult();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "%") {
    calculatePercent();
  } else if (key === "Escape") {
    clearDisplay();
  }
}

document.addEventListener("keydown", handleKeyboardInput);
