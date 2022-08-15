import { Popup } from './Popup.js';

export class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._button = this._popup.querySelector('.popup__save-button');
  }

  loading(isLoading) {
    if (isLoading) {
      this._button.textContent = 'Удаление...';
    } else {
      this._button.textContent = 'Да';
    }
  }

  setConfirm(submitAction) {
    this._handlerConfirm = submitAction;
  }
  
  _setEventListeners() {
    super._setEventListeners();
    this._button.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handlerConfirm();
    });
  }
}