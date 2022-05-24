import throttle from "lodash.throttle";

const form = document.querySelector('.feedback-form');
const FORM_KEY = 'feedback-form-state';

form.addEventListener('input', throttle(onInputForm, 500));
form.addEventListener('submit', onSubmitForm);

const dataForm = {};

onFormShow();

function onInputForm (event) {
    dataForm[event.target.name] = event.target.value;
    localStorage.setItem(FORM_KEY, JSON.stringify(dataForm))
}

function onSubmitForm(event) {
    event.preventDefault();
    console.log(JSON.parse(localStorage.getItem(FORM_KEY)));    
    event.currentTarget.reset();
    localStorage.removeItem(FORM_KEY);
}

function onFormShow() {  
  if (localStorage.getItem(FORM_KEY)) {
    const data = JSON.parse(localStorage.getItem(FORM_KEY));
    form.elements.email.value = data.email
    form.elements.message.value = data.message
  }
}
