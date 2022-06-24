import { handleCardClick } from './index.js'

export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }
  
  _handleLikeNewCard = (event) => {
    event.target.classList.toggle("element__button_is-active");
  }

  _handleDeleteNewCard = (event) => {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector(".element__button-trash").addEventListener("click", (event) => { this._handleDeleteNewCard(event) })
    this._element.querySelector(".element__button").addEventListener("click", (event) => { this._handleLikeNewCard(event) })
    this._element.querySelector(".element__image").addEventListener("click", () => {handleCardClick(this._name , this._link);});
    }

  addCard() {
    this._element = this._getTemplate()

    this._setEventListeners()

    const titleCard = this._element.querySelector(".element__title");
    const linkCard = this._element.querySelector(".element__image");

    titleCard.textContent = this._name;
    linkCard.alt = this._name;
    linkCard.src = this._link;

    return this._element
    }
}

