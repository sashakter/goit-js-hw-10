'use strict'; // Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const inputDateTime = document.getElementById('datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');

buttonStart.disabled = true;
let userSelectDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectDate = new Date(selectedDates[0]);
    console.log(userSelectDate);
    if (options.defaultDate > userSelectDate) {
      window.alert('Please choose a date in the future');
      buttonStart.disabled = true;
    } else {
      buttonStart.disabled = false;
    }
  },
};
function countdown() {
  const futureDate = userSelectDate.getTime();

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
  function addLeadingZero(value) {
    const arrayOfNumbers = Object.values(value).join(' ').split(' ');
    const arrayOfSpans = [timerDays, timerHours, timerMinutes, timerSeconds];
    const updatedArray = arrayOfNumbers.map(element => {
      return element.length > 1 ? element : element.padStart(2, '0');
    });
    arrayOfSpans.forEach((element, index) => {
      element.textContent = updatedArray[index];
    });
  }

  const timer = setInterval(() => {
    const currentDate = new Date().getTime();
    let dateDifference = futureDate - currentDate;
    let timeParts = convertMs(dateDifference);
    addLeadingZero(timeParts);
    if (dateDifference < 0) {
      clearInterval(timer);

      return;
    }
  }, 1000);
}

inputDateTime.addEventListener(
  'click',
  flatpickr(`#${inputDateTime.id}`, options)
);
buttonStart.addEventListener('click', countdown);
