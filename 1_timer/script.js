// Получение ссылок на HTML-элементы
const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const millisecondsLabel = document.getElementById('milliseconds');

const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('resetBtn');

const lapList = document.getElementById('laplist');

/// Переменные для секундомера

let minutes = 0;           // Изначально минуты установлены в 0
let seconds = 0;           // Изначально секунды установлены в 0
let milliseconds = 0;      // Изначально миллисекунды установлены в 0
let interval;              // Переменная для хранения идентификатора интервала

// Добавление слушателей событий к кнопкам
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Функция, которая запускает секундомер
function startTimer() {
  interval = setInterval(updateTimer, 10); // Запуск функции updateTimer каждые 10 миллисекунд
  startButton.disabled = true; // Блокировка кнопки "Start", чтобы предотвратить многократные запуски
}

// Функция, которая останавливает секундомер
function stopTimer() {
  clearInterval(interval); // Остановка интервала
  addToLapList(); // Добавление времени круга в список
  resetTimerData(); // Сброс данных секундомера
  startButton.disabled = false; // Разблокировка кнопки "Start"
}

// Функция, которая приостанавливает секундомер
function pauseTimer() {
  clearInterval(interval); // Приостановка интервала
  startButton.disabled = false; // Разблокировка кнопки "Start"
}

// Функция, которая сбрасывает секундомер
function resetTimer() {
  clearInterval(interval); // Остановка интервала
  resetTimerData(); // Сброс данных секундомера
  startButton.disabled = false; // Разблокировка кнопки "Start"
}

// Функция, которая обновляет значения времени
function updateTimer() {
  milliseconds++;
  if (milliseconds === 100) {
    milliseconds = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
  }

  displayTimer(); // Обновление отображения времени на странице
}

// Функция, которая отображает значения времени на странице
function displayTimer() {
  millisecondsLabel.textContent = padTime(milliseconds);
  secondsLabel.textContent = padTime(seconds);
  minutesLabel.textContent = padTime(minutes);
}

// Функция, которая добавляет время круга в список
function addToLapList() {
  const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;

  const listItem = document.createElement('li');
  listItem.innerHTML = `<span>Lap ${lapList.childElementCount + 1}: </span>${lapTime}`;
  lapList.appendChild(listItem);
}

// Функция, которая добавляет ведущий ноль к времени, если оно состоит из одной цифры
function padTime(time) {
  return time.toString().padStart(2, '0');
}

// Функция, которая сбрасывает данные секундомера в исходное состояние
function resetTimerData() {
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  displayTimer(); // Обновление отображения времени на странице
}
