import throttle from 'lodash.throttle';

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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    console.log(formData);
  }, 500),
);

populateTextarea();

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(`E-mail: ${formData.email}, Message: ${formData.message}`);
}

function populateTextarea() {
  if (formData.email !== '' && formData.message !== '') {
    message.value = JSON.parse(localStorage.getItem(STORAGE_KEY)).message;
    email.value = JSON.parse(localStorage.getItem(STORAGE_KEY)).email;
  }
}
