export default class FormValidator {
  constructor(validData, formElement) {
    this._validData = validData,
    this._formElement = formElement;
    this._inputSelector = validData.inputSelector;
    this._submitButtonSelector = validData.submitButtonSelector;
    this._inactiveButtonClass = validData.inactiveButtonClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validData.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._validData.errorClass);
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validData.inputErrorClass);
    errorElement.classList.remove(this._validData.errorClass);
    errorElement.textContent = "";
  }
  
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput = (inputList) => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  resetButtonCard = () => {
    const popupCard = document.querySelector(".addcard");
    const btnSaveCard = popupCard.querySelector('.popup__save-button');

    btnSaveCard.classList.add('popup__save-button_disabled');
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    })
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (event) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}