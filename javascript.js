const resetButton = document.querySelector('.reset');

resetButton.addEventListener('click', () => {
    let dimensions = parseInt(prompt(
        'How many squares would you like per side for your etch-a-sketch?'));
    while (!dimensions || dimensions < 1 || dimensions > 100) {
        dimensions = parseInt(prompt(
            'Invalid input. Please enter a number between 1 and 100: '));
    }
    createGrid(dimensions);
});

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
            square.addEventListener('mouseover', () => {
                square.style.background = 'red';
            });
            row.appendChild(square);
        }
        container.appendChild(row);
    }
}