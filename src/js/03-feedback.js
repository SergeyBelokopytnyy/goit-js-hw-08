import throttle from 'lodash.throttle';
import Notiflix from 'notiflix';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};
const form = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const message = document.querySelector('textarea');

form.addEventListener('submit', onFormSubmit);

form.addEventListener(
  'input',
  throttle(event => {
    formData[event.target.name] = event.target.value;
    formData.email = email.value;
    formData.message = message.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    console.log(formData);
  }, 500),
);

populateTextarea();

function onFormSubmit(event) {
  event.preventDefault();
  if (email.value !== '' && message.value !== '') {
    event.preventDefault();
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    console.log(`E-mail: ${formData.email}, Message: ${formData.message}`);
    formData.email = '';
    formData.message = '';
  } else {
    Notiflix.Report.failure(
      'You have not completed the form',
      'All form values must be filled',
      'Okay',
    );

    return;
  }
}

function populateTextarea() {
  if (formData.email !== '' && formData.message !== '') {
    message.value = JSON.parse(localStorage.getItem(STORAGE_KEY)).message;
    email.value = JSON.parse(localStorage.getItem(STORAGE_KEY)).email;
  }
}
