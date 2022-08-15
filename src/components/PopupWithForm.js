import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector)

    this._handleSubmit = handleSubmit
    this._form = this._popup.querySelector('.popup__form')
    this._inputs = this._form.querySelectorAll('.popup__input')
    this._submitButton = this._popup.querySelector('.popup__save-button')
  }

  _getInputValues() {
    this._values = {}
    this._inputs.forEach((input) => {
      this._values[input.name] = input.value
     })
       return this._values
    }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    })
  }

  close() {
    super.close()
    this._form.reset()
  }

  loading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...'
    } else {
      this._submitButton.textContent = 'Сохранить'
    }
  }

  _setEventListeners() {
    super._setEventListeners()

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues())
      this.close()
    })
  }
}