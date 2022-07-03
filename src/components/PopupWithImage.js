import {Popup} from './Popup.js'

 export class PopupWithImage extends Popup {
  open({name, link}) {
    this._image = document.querySelector('.popup__image')
    this._subtitle = document.querySelector('.popup__subtitle')  

    this._image.src = link
    this._image.alt = name
    this._subtitle.textContent = name

    super.open()
  }
}