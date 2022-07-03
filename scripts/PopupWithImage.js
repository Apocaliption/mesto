import {Popup} from './Popup.js'

 export class PopupWithImage extends Popup {
  open(text, link) {
    const image = document.querySelector('.popup__image')
    const subtitle = document.querySelector('.popup__subtitle')  

    image.src = link
    subtitle.textContent = text

    super.open()
  }
}

// const popup = new PopupWithImage('.popup_img')

// popup__image
// popup__subtitle