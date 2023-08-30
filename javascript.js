let color = '#000000';
let rainbowMode = false;
let grayscaleMode = false;
let progressivelyDarken = false;
let eraseMode = false;
const DEFAULT_SIZE = 16;
const ERASE_COLOR = '#ffffff';

colorInput = document.querySelector('.color');
colorInput.addEventListener('input', (e) => {
    color = e.target.value;
    rainbowMode = false;
    grayscaleMode = false;
    progressivelyDarken = false;
    eraseMode = false;
    rainbowBtn.classList.remove('rainbowExpand');
    grayscaleBtn.classList.remove('grayscaleExpand');
    darkenBtn.classList.remove('darkenExpand');
    eraseBtn.classList.remove('darkenExpand');
});

const rainbowBtn = document.querySelector('.rainbow');
rainbowBtn.addEventListener('mouseover', () => {
    rainbowBtn.classList.add('rainbowExpand');
});
rainbowBtn.addEventListener('mouseleave', () => {
    if (!rainbowMode) {
        rainbowBtn.classList.remove('rainbowExpand');
    }
});
rainbowBtn.addEventListener('click', () => {
    rainbowMode = !rainbowMode;
    if (rainbowMode) {
        grayscaleMode = false;
        progressivelyDarken = false;
        eraseMode = false;
        grayscaleBtn.classList.remove('grayscaleExpand');
        darkenBtn.classList.remove('darkenExpand');
        eraseBtn.classList.remove('darkenExpand');
        rainbowBtn.classList.add('rainbowExpand');
    } else {
        rainbowBtn.classList.remove('rainbowExpand');
    }
});

const grayscaleBtn = document.querySelector('.grayscale');
grayscaleBtn.addEventListener('mouseover', () => {
    grayscaleBtn.classList.add('grayscaleExpand');
});
grayscaleBtn.addEventListener('mouseleave', () => {
    if (!grayscaleMode) {
        grayscaleBtn.classList.remove('grayscaleExpand');
    }
});
grayscaleBtn.addEventListener('click', () => {
    grayscaleMode = !grayscaleMode;
    if (grayscaleMode) {
        rainbowMode = false;
        progressivelyDarken = false;
        eraseMode = false;
        rainbowBtn.classList.remove('rainbowExpand');
        darkenBtn.classList.remove('darkenExpand');
        eraseBtn.classList.remove('darkenExpand');
        grayscaleBtn.classList.add('grayscaleExpand');
    } else {
        grayscaleBtn.classList.remove('grayscaleExpand');
    }
});

const darkenBtn = document.querySelector('.darken');
darkenBtn.addEventListener('mouseover', () => {
    darkenBtn.classList.add('darkenExpand');
});
darkenBtn.addEventListener('mouseleave', () => {
    if (!progressivelyDarken) {
        darkenBtn.classList.remove('darkenExpand');
    }
});
darkenBtn.addEventListener('click', () => {
    if (!eraseMode) {
        progressivelyDarken = !progressivelyDarken;
        if (progressivelyDarken) {
            setVisitValues(visitValues.length);
            darkenBtn.classList.add('darkenExpand');
        } else {
            darkenBtn.classList.remove('darkenExpand');
        }
    } else {
        alert('The eraser is on, so darkening is pointless. Select another mode first.');
    }
});

const eraseBtn = document.querySelector('.erase');
eraseBtn.addEventListener('mouseover', () => {
    eraseBtn.classList.add('darkenExpand');
});
eraseBtn.addEventListener('mouseleave', () => {
    if (!eraseMode) {
        eraseBtn.classList.remove('darkenExpand');
    }
});
eraseBtn.addEventListener('click', () => {
    eraseMode = !eraseMode;
    if (eraseMode) {
        rainbowMode = false;
        grayscaleMode = false;
        progressivelyDarken = false;
        rainbowBtn.classList.remove('rainbowExpand');
        grayscaleBtn.classList.remove('grayscaleExpand');
        darkenBtn.classList.remove('darkenExpand');
        eraseBtn.classList.add('darkenExpand');
    } else {
        eraseBtn.classList.remove('darkenExpand');
    }
});

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
const options = document.querySelector('.options');

const CONTAINER_SIZE = 720;

container.style.width = CONTAINER_SIZE + 'px';
container.style.height = CONTAINER_SIZE + 'px';
options.style.width = CONTAINER_SIZE + 'px';

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
            square.style.boxSizing = 'border-box';
            square.style.width = SQUARE_DIM + 'px';
            square.style.height = SQUARE_DIM + 'px';
            if (i === 0) {
                square.style.borderTop = '1px solid black';
            }
            square.style.borderBottom = '1px solid black';
            if (j === 0) {
                square.style.borderLeft = '1px solid black';
            }
            square.style.borderRight = '1px solid black';
            square.setAttribute('data-row', i);
            square.setAttribute('data-col', j);
            square.addEventListener('mousedown', changeBackgroundColor);
            square.addEventListener('mouseover', changeBackgroundColor);
            row.appendChild(square);
        }
        container.appendChild(row);
    }
}

setVisitValues(DEFAULT_SIZE);
createGrid(DEFAULT_SIZE);

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
    if (!primaryMouseButtonDown && e.type !== 'mousedown') return;
    if (eraseMode) {
        this.style.background = ERASE_COLOR;
        return;
    }
    const row = parseInt(this.getAttribute('data-row'));
    const col = parseInt(this.getAttribute('data-col'));
    if (rainbowMode || grayscaleMode) {
        const r = Math.floor(Math.random() * 255);
        const g = grayscaleMode ? r : Math.floor(Math.random() * 255);
        const b = grayscaleMode ? r : Math.floor(Math.random() * 255);
        if (rainbowMode && !progressivelyDarken) {
            this.style.background = `rgb(${r}, ${g}, ${b})`;
        } else if (grayscaleMode && !progressivelyDarken) {
            this.style.background = `rgb(${r}, ${g}, ${b})`;
        } else {
            darken(this, r, g, b, row, col);
        }
    } else {
        if (!progressivelyDarken) {
            this.style.background = color;
        } else {
            let rgbObj = hexToRGB(color);
            darken(this, rgbObj.r, rgbObj.g, rgbObj.b, row, col);
        }
    }
}

function darken(square, r, g, b, row, col) {
    const timesVisited = Math.min(10, visitValues[row][col] + 1);
    const adjustedR = r * (10 - timesVisited) / 9;
    const adjustedG = g * (10 - timesVisited) / 9;
    const adjustedB = b * (10 - timesVisited) / 9;
    square.style.background = `rgb(${adjustedR}, ${adjustedG}, ${adjustedB})`;
    visitValues[row][col] += 1;
}

function hexToRGB(color) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}