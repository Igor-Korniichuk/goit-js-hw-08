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
  
    if (form.elements.email.value === '' || form.elements.message.value === '') {
    return window.alert("Все поля должны быть заполнены!");
  }
    console.log(JSON.parse(localStorage.getItem(FORM_KEY)));    
    event.currentTarget.reset();
    localStorage.removeItem(FORM_KEY);
  
  
}

function onFormShow() {

  if (localStorage.getItem(FORM_KEY)) {
    const formObjectValue = JSON.parse(localStorage.getItem(FORM_KEY));

    for (const key in formObjectValue) {
      dataForm[key] = formObjectValue[key];
    }

    form.elements.email.value = dataForm.email ? dataForm['email'] : '';
    form.elements.message.value = dataForm.message  ? dataForm['message'] : '';
  }
}

