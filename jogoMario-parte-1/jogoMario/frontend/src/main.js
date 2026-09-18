import './style.css';

const board = document.querySelector('#gameboard');
const mario = document.querySelector('#mario');
const pipe = document.querySelector('#pipe');
const startPanel = document.querySelector('#start-panel');
const gameOverPanel = document.querySelector('#game-over');
const startButton = document.querySelector('#start-button');
const restartButton = document.querySelector('#restart-button');
const scoreElement = document.querySelector('#score');
const timeElement = document.querySelector('#time');
const highScoreElement = document.querySelector('#high-score');
const finalScoreElement = document.querySelector('#final-score');

let score = 0;
let elapsedSeconds = 0;
let gameLoop = null;
let timerLoop = null;
let running = false;
let audioContext = null;
const RECORD_KEY = 'mario-dino-high-score-v2';
localStorage.removeItem('mario-high-score');
let record = Number(localStorage.getItem(RECORD_KEY) || 0);
highScoreElement.textContent = String(record).padStart(5, '0');

function playSfx(frequency=880, duration=.08){
  try{
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if(!AudioContextClass)return;
    audioContext ||= new AudioContextClass();
    if(audioContext.state === 'suspended')audioContext.resume();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const now = audioContext.currentTime;
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(.055, now);
    gain.gain.exponentialRampToValueAtTime(.001, now + duration);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + duration);
  }catch{}
}

function formatPoints(value){return String(value).padStart(5, '0')}
function formatTime(value){return String(value).padStart(3, '0')}

function updateHud(){
  scoreElement.textContent = formatPoints(score);
  timeElement.textContent = formatTime(elapsedSeconds);
  highScoreElement.textContent = formatPoints(record);
}

function resetMario(){
  mario.src = '/assets/images/mario.gif';
  mario.classList.remove('jump', 'falling');
  mario.style.width = '';
  mario.style.marginLeft = '';
}

function jump(){
  if(!running || mario.classList.contains('jump'))return;
  playSfx(620, .1);
  mario.classList.remove('jump');
  void mario.offsetWidth;
  mario.classList.add('jump');
  window.setTimeout(() => mario.classList.remove('jump'), 700);
}

function rectanglesOverlap(a,b){
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function gameOver(){
  if(!running)return;
  running = false;
  if(gameLoop)window.clearInterval(gameLoop);
  if(timerLoop)window.clearInterval(timerLoop);
  gameLoop = null;
  timerLoop = null;
  pipe.style.animation = 'none';
  mario.classList.remove('jump');
  mario.src = '/assets/images/game-over.png';
  mario.style.width = '75px';
  mario.style.marginLeft = '50px';
  record = Math.max(record, score);
  localStorage.setItem(RECORD_KEY, String(record));
  updateHud();
  finalScoreElement.textContent = `Pontuação: ${formatPoints(score)}`;
  gameOverPanel.hidden = false;
  playSfx(140, .28);
}

function checkCollision(){
  if(!running)return;
  const marioRect = mario.getBoundingClientRect();
  const pipeRect = pipe.getBoundingClientRect();
  const marioBottom = Number.parseFloat(getComputedStyle(mario).bottom) || 0;
  const pipeStillAhead = pipeRect.right > marioRect.left;
  const hit = rectanglesOverlap(marioRect, pipeRect) && marioBottom < 80 && pipeStillAhead;
  if(hit)gameOver();
}

function startGame(){
  if(gameLoop)window.clearInterval(gameLoop);
  if(timerLoop)window.clearInterval(timerLoop);
  score = 0;
  elapsedSeconds = 0;
  running = true;
  updateHud();
  resetMario();
  pipe.style.animation = 'none';
  void pipe.offsetWidth;
  pipe.style.animation = '';
  startPanel.hidden = true;
  gameOverPanel.hidden = true;
  playSfx(520, .08);
  gameLoop = window.setInterval(checkCollision, 10);
  timerLoop = window.setInterval(() => {
    if(!running)return;
    elapsedSeconds += 1;
    score += 1;
    updateHud();
  }, 1000);
}

window.addEventListener('keydown', event => {
  if([' ', 'ArrowUp', 'w', 'W'].includes(event.key))event.preventDefault();
  if([' ', 'ArrowUp', 'w', 'W'].includes(event.key))jump();
  if(['r', 'R'].includes(event.key) && !running)startGame();
});
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
updateHud();
