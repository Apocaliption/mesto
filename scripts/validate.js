const validData = ({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error-visible",
});

const showInputError = (formElement, inputElement, errorMessage, validData) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validData.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validData.errorClass);
};

const hideInputError = (formElement, inputElement, validData) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validData.inputErrorClass);
  errorElement.classList.remove(validData.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, validData) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validData);
  } else {
    hideInputError(formElement, inputElement, validData);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, validData) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validData.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validData.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, validData) => {
  const inputList = Array.from(formElement.querySelectorAll(validData.inputSelector));
  const buttonElement = formElement.querySelector(validData.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, validData);
      toggleButtonState(inputList, buttonElement, validData);
    });
  });
};


const enableValidation = (validData) => {
  const formList = Array.from(document.querySelectorAll(validData.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validData);
  });
}

enableValidation(validData);
