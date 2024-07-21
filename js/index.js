const backgroundEl = document.getElementById("background");
const validPassword = 'testing';
const container = document.getElementById('container');
const loadingDiv = document.getElementById('loading');
const miniGameDiv = document.getElementById('miniGame');
const gameContentDiv = document.getElementById('gameContent');
const passwordForm = document.getElementById('passwordForm');
const messageDisplay = document.getElementById('messageDisplay');
const message1 = document.getElementById('message1');
const message2 = document.getElementById('message2');
const finalMessage = document.getElementById('finalMessage');
const nextButton = document.getElementById('nextButton');
let heartInterval;

function createHeart() {
    const xPos = Math.random() * window.innerWidth;
    const yPos = Math.random() * window.innerHeight;

    const spanEl = document.createElement("span");

    spanEl.style.left = xPos + "px";
    spanEl.style.top = yPos + "px";

    const size = Math.random() * 100;
    spanEl.style.width = size + "px";
    spanEl.style.height = size + "px";

    backgroundEl.appendChild(spanEl);

    const duration = Math.random() * 4000 + 1000;
    setTimeout(function () {
        spanEl.remove();
    }, duration);
}

function createHearts() {
    heartInterval = setInterval(createHeart, 50);
}

window.onload = createHearts;

passwordForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const passwordInput = document.getElementById('passwordInput').value;
    const errorMessage = document.getElementById('errorMessage');

    if (passwordInput === validPassword) {
        container.classList.add('hidden');
        loadingDiv.classList.remove('hidden');

        clearInterval(heartInterval);

        setTimeout(function () {
            loadingDiv.classList.add('hidden');
            miniGameDiv.classList.remove('hidden');

            setTimeout(function () {
                gameContentDiv.classList.remove('hidden');
                initMiniGame();
            }, 1000);
        }, 3000);
    } else {
        errorMessage.textContent = 'Incorrect password. Please try again.';

        setTimeout(function () {
            errorMessage.textContent = '';
        }, 2000);
    }
});

function initMiniGame() {
    const gameArea = document.getElementById('gameArea');
    const gridCells = [];

    for (let i = 0; i < 25; i++) {
        const gridCell = document.createElement('div');
        gridCell.classList.add('gridCell');
        gridCell.dataset.index = i;

        const innerDiv = document.createElement('div');
        innerDiv.classList.add('inner');

        const frontDiv = document.createElement('div');
        frontDiv.classList.add('front');

        const backDiv = document.createElement('div');
        backDiv.classList.add('back');

        innerDiv.appendChild(frontDiv);
        innerDiv.appendChild(backDiv);
        gridCell.appendChild(innerDiv);

        gridCells.push(gridCell);
        gameArea.appendChild(gridCell);
    }

    shuffleArray(gridCells);

    gridCells[0].classList.add('center');
    gridCells[24].classList.add('cake');

    gridCells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (cell.classList.contains('center')) {
                showConfirmationModal(cell);
            } else {
                handleCellClick(cell);
            }
        });
    });
}

function showConfirmationModal(cell) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <p class="suure">Are you sure?</p>
            <button class="modal-button" id="confirmButton">Yes</button>
            <button class="modal-button" id="cancelButton">No</button>
        </div>
    `;
    miniGameDiv.appendChild(modal);

    modal.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    const confirmButton = document.getElementById('confirmButton');
    confirmButton.addEventListener('click', () => {
        handleCorrectClick(cell);
        closeModal();
    });

    const cancelButton = document.getElementById('cancelButton');
    cancelButton.addEventListener('click', () => {
        closeModal();
    });

    function closeModal() {
        modal.remove();
    }
}

function handleCellClick(cell) {
    cell.classList.add('visited');
    cell.querySelector('.back').textContent = '❌';
    setTimeout(() => {
        handleWrongClick(cell);
    }, 500);
}

function handleCorrectClick(cell) {
    const gridCells = document.querySelectorAll('.gridCell');
    cell.classList.add('visited');
    cell.classList.add('correct');
    cell.querySelector('.back').textContent = '🎂';
    gridCells.forEach(gridCell => {
        gridCell.style.pointerEvents = 'none';
    });

    setTimeout(() => {
        const proceedButton = document.createElement('button');
        proceedButton.textContent = 'Proceed';
        proceedButton.classList.add('proceed-button');
        proceedButton.addEventListener('click', () => {
            miniGameDiv.classList.add('hidden');
            displayMessages();
        });

        gameContentDiv.appendChild(proceedButton);
    }, 200);
}

function handleWrongClick(cell) {
    cell.classList.add('visited');
    cell.classList.add('wrong');
    setTimeout(() => {
        cell.classList.remove('wrong');
        document.body.style.backgroundColor = '';
    }, 500);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayMessages() {
    console.log('Displaying messages...');
    messageDisplay.classList.remove('hidden');

    const messages = [
        { element: message1, text: 'In your eyes, I find my home,', delay: 0 },
        { element: message2, text: 'In your smile, I find my peace.', delay: 1000 },
        { element: finalMessage, text: 'With you, my love, life feels complete.', delay: 1000 }
    ];

    let totalDelay = 0;

    messages.forEach(({ element, text, delay }, index) => {
        setTimeout(() => {
            if (text) {
                element.textContent = text;
            }
            element.style.opacity = 1;

            if (index > 0) {
                setTimeout(() => {
                    messages[index - 1].element.style.opacity = 0;
                }, delay - 2000);
            }

            if (index < messages.length - 1) {
                setTimeout(() => {
                    element.style.opacity = 0;
                }, delay + 2000);
            }

            if (index === messages.length - 1) {
                setTimeout(() => {
                    nextButton.classList.remove('hidden');
                }, delay + 2000);
            }

        }, totalDelay);

        totalDelay += delay + 3000;
    });
}


nextButton.addEventListener('click', () => {
    alert('Stay tuned for new update');
});



function debugHiddenClass() {
    console.log('container hidden:', container.classList.contains('hidden'));
    console.log('loading hidden:', loadingDiv.classList.contains('hidden'));
    console.log('miniGame hidden:', miniGameDiv.classList.contains('hidden'));
    console.log('messageDisplay hidden:', messageDisplay.classList.contains('hidden'));
}

debugHiddenClass();