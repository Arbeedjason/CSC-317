let currentInput = '0';
let fullExpression = '';
let operator = null;
let previousInput = '';

const displayCurrent = document.getElementById('current');
const displayExpression = document.getElementById('expression');

function updateDisplay() {
  displayCurrent.textContent = currentInput;
  displayExpression.textContent = fullExpression;
}

function handleNumber(num) {
  if (currentInput === '0' || operator === '=') {
    currentInput = num;
    if (operator === '=') {
      fullExpression = num;
      operator = null;
    } else {
      fullExpression += num;
    }
  } else {
    currentInput += num;
    fullExpression += num;
  }
  updateDisplay();
}

function handleOperator(op) {
  if (operator && currentInput === '') return;

  if (operator && previousInput !== '') {
    calculate();
  }

  operator = op;
  previousInput = currentInput;
  currentInput = '';
  fullExpression += ` ${op} `;
  updateDisplay();
}

function calculate() {
  try {
    const result = eval(fullExpression.replace(/×/g, '*').replace(/÷/g, '/'));
    currentInput = result.toString();
    fullExpression = currentInput;
    operator = '=';
    previousInput = '';
    updateDisplay();
  } catch (error) {
    currentInput = 'Error';
    fullExpression = '';
    updateDisplay();
  }
}

function clearAll() {
  currentInput = '0';
  fullExpression = '';
  operator = null;
  previousInput = '';
  updateDisplay();
}

function toggleSign() {
  if (currentInput !== '0') {
    currentInput = (parseFloat(currentInput) * -1).toString();
    fullExpression = fullExpression.replace(/-?\d+$/, currentInput);
    updateDisplay();
  }
}

function percent() {
  currentInput = (parseFloat(currentInput) / 100).toString();
  fullExpression = fullExpression.replace(/\d+$/, currentInput);
  updateDisplay();
}

function addDecimal() {
  if (!currentInput.includes('.')) {
    currentInput += '.';
    fullExpression += '.';
    updateDisplay();
  }
}

// Event listeners
document.querySelectorAll('.number').forEach(button => {
  button.addEventListener('click', () => handleNumber(button.textContent));
});

document.querySelectorAll('.operator').forEach(button => {
  button.addEventListener('click', () => handleOperator(button.textContent));
});

document.getElementById('equals').addEventListener('click', calculate);
document.getElementById('clear').addEventListener('click', clearAll);
document.getElementById('sign').addEventListener('click', toggleSign);
document.getElementById('percent').addEventListener('click', percent);
document.querySelector('.btn.number:nth-child(18)').addEventListener('click', addDecimal);

// Optional: Keyboard support
document.addEventListener('keydown', (e) => {
  if (!isNaN(e.key)) {
    handleNumber(e.key);
  } else if (['+', '-', '*', '/'].includes(e.key)) {
    handleOperator(e.key);
  } else if (e.key === 'Enter' || e.key === '=') {
    calculate();
  } else if (e.key === 'Escape') {
    clearAll();
  } else if (e.key === '.') {
    addDecimal();
  }
});
