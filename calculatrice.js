let currentValue = '';
let previousValue = null;
let currentOperation = null;

function initialiser_calc(id) {
    currentValue = '';
    previousValue = null;
    currentOperation = null;
    document.getElementById('calc_resultat').value = '0';
}

function add_calc(id, value) {
    if (value === '.' && currentValue.includes('.')) return;
    currentValue += value;
    updateDisplay();
}

function f_calc(id, operation) {
    switch(operation) {
        case 'ce':
            initialiser_calc(id);
            break;
            
        case 'nbs': 
            currentValue = currentValue.slice(0, -1);
            updateDisplay();
            break;
            
        case '%': 
            if (currentValue) {
                currentValue = (parseFloat(currentValue) / 100).toString();
                updateDisplay();
            }
            break;
            
        case '+-': 
            if (currentValue) {
                currentValue = (-parseFloat(currentValue)).toString();
                updateDisplay();
            }
            break;
            
        case '=':
            calculateResult();
            break;
            
        default: 
            handleOperator(operation);
            break;
    }
}
function updateDisplay() {
    const display = document.getElementById('calc_resultat');
    display.value = currentValue || previousValue || '0';
}
function handleOperator(operator) {
    if (currentValue) {
        previousValue = currentValue;
        currentOperation = operator;
        currentValue = '';
    }
}
function calculateResult() {
    if (!previousValue || !currentOperation || !currentValue) return;
    
    const num1 = parseFloat(previousValue);
    const num2 = parseFloat(currentValue);
    let result;
    
    switch(currentOperation) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': result = num1 / num2; break;
    }
    
    currentValue = result.toString();
    previousValue = null;
    currentOperation = null;
    updateDisplay();
}
function key_detect_calc(id, event) {
    const key = event.key;
    
    if (/\d|\./.test(key)) add_calc(id, key);
    if (['+', '-', '*', '/'].includes(key)) f_calc(id, key);
    if (key === 'Enter') f_calc(id, '=');
    if (key === 'Backspace') f_calc(id, 'nbs');
    if (key === 'Escape') f_calc(id, 'ce');
    if (key === '%') f_calc(id, '%');
}
window.addEventListener('load', () => initialiser_calc('calc'));

document.querySelector("[value='&divide;']").addEventListener('click', () => f_calc('calc', '/'));
