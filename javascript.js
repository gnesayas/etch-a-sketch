const resetButton = document.querySelector('.reset');

resetButton.addEventListener('click', () => {
    let dimensions = parseInt(prompt(
        'How many squares would you like per side for your etch-a-sketch?'));
    while (!dimensions || dimensions < 1 || dimensions > 100) {
        dimensions = parseInt(prompt(
            'Invalid input. Please enter a number between 1 and 100: '));
    }
    setVisitValues(dimensions);
    createGrid(dimensions);
});

let visitValues = [];

function setVisitValues(dimensions) {
    visitValues = [];
    for (let i = 0; i < dimensions; i++) {
        const visitRow = [];
        for (let j = 0; j < dimensions; j++) {
            visitRow.push(0);
        }
        visitValues.push(visitRow);
    }
}

const container = document.querySelector('.container');
const CONTAINER_SIZE = 960;

container.style.width = CONTAINER_SIZE + 'px';
container.style.height = CONTAINER_SIZE + 'px';

function createGrid(dimensions) {
    const NUM_ROWS = dimensions;
    const NUM_COLS = dimensions;
    const SQUARE_DIM = CONTAINER_SIZE / dimensions;
    container.replaceChildren();
    for (let i = 0; i < NUM_ROWS; i++) {
        const row = document.createElement('div');
        row.style.display = 'flex';
        for (let j = 0; j < NUM_COLS; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.style.width = SQUARE_DIM + 'px';
            square.style.height = SQUARE_DIM + 'px';
            square.style.outline = '1px solid black';
            square.setAttribute('data-row', i);
            square.setAttribute('data-col', j);
            square.addEventListener('mouseover', changeBackgroundColor);
            row.appendChild(square);
        }
        container.appendChild(row);
    }
}

let primaryMouseButtonDown = false;

function setPrimaryButtonState(e) {
    e.preventDefault();
    let flags = e.buttons !== undefined ? e.buttons : e.which;
    primaryMouseButtonDown = (flags & 1) === 1;
}

document.addEventListener('mousedown', setPrimaryButtonState);
document.addEventListener('mousemove', setPrimaryButtonState);
document.addEventListener('mouseup', setPrimaryButtonState);

function changeBackgroundColor(e) {
    e.preventDefault();
    if (primaryMouseButtonDown) {
        const row = parseInt(this.getAttribute('data-row'));
        const col = parseInt(this.getAttribute('data-col'));
        const timesVisited = Math.min(10, visitValues[row][col] + 1);
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        const adjustedR = r * (10 - timesVisited) / 9;
        const adjustedG = g * (10 - timesVisited) / 9;
        const adjustedB = b * (10 - timesVisited) / 9;
        this.style.background = `rgb(${adjustedR}, ${adjustedG}, ${adjustedB})`;
        visitValues[row][col] += 1;
    }
}