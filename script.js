const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapsList = document.getElementById('laps');
const lapButton = document.getElementById('lap');
const lapCountDisplay = document.getElementById('lapCount');

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let laps = [];
let lapCount = 0;

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    const formattedTime = new Date(elapsedTime).toISOString().slice(11, 19);
    display.textContent = formattedTime;
}

function startStop() {
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime; // Adjust start time for elapsed time
        timerInterval = setInterval(updateDisplay, 1000);
        startStopButton.textContent = 'Stop';
        startStopButton.classList.add('running');
    } else {
        clearInterval(timerInterval);
        timerInterval = null;
        startStopButton.textContent = 'Start';
        startStopButton.classList.remove('running');
    }
}

function reset() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    startTime = Date.now(); // Reset to current time
    updateDisplay();
    startStopButton.textContent = 'Start';
    startStopButton.classList.remove('running');
    laps = [];
    lapsList.innerHTML = '';
    lapCount = 0;
    updateLapCountDisplay();
}

function recordLap() {
    if (timerInterval) {
        laps.push(elapsedTime);
        const formattedLapTime = new Date(elapsedTime).toISOString().slice(11, 19);
        const lapItem = document.createElement('li');
        lapItem.textContent = formattedLapTime;
        lapsList.appendChild(lapItem);
        lapCount++;
        updateLapCountDisplay();
    }
}

function updateLapCountDisplay() {
    lapCountDisplay.textContent = `Laps: ${lapCount}`;
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

updateDisplay();
updateLapCountDisplay();