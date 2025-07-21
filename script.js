const exprDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");
const buttons = document.querySelectorAll(".btn");
const themeSwitch = document.getElementById("theme-switch");

let expression = "";
let lastInput = "";
let operatorSet = new Set(["+", "-", "*", "/", "%"]);

function updateDisplay() {
  exprDisplay.textContent = expression || "0";
}

function calculateResult() {
  try {
    let result = eval(expression.replace("×", "*").replace("÷", "/"));
    if (!isFinite(result)) throw "Invalid!";
    resultDisplay.textContent = Number(result.toFixed(10));
  } catch {
    resultDisplay.textContent = "⚠️ Error";
  }
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const key = button.dataset.key || button.textContent.trim();

    if (key === "=") {
      calculateResult();
      expression = resultDisplay.textContent;
    } else if (key === "C") {
      expression = "";
      resultDisplay.textContent = "0";
    } else if (button.classList.contains("back")) {
      expression = expression.slice(0, -1);
    } else {
      // Prevent 2 operators in a row
      const lastChar = expression.trim().slice(-1);
      if (operatorSet.has(lastChar) && operatorSet.has(key)) {
        expression = expression.slice(0, -1) + key;
      } else {
        expression += key;
      }
    }
    updateDisplay();
  });
});

themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("light-mode");
});

// Optional: Keyboard support
document.addEventListener("keydown", (e) => {
  const keyMap = {
    Enter: "=",
    Backspace: "⌫",
    Escape: "C",
    Delete: "C",
  };
  const key = keyMap[e.key] || e.key;

  const button = [...buttons].find(btn => btn.dataset.key === key || btn.textContent.trim() === key || btn.classList.contains("back") && key === "⌫");
  if (button) button.click();
});
