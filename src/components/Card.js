
export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    // this._name = data.name;
    // this._link = data.link;
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    this._element = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

      this.like = this._element.querySelector(".element__button")
      this.image = this._element.querySelector(".element__image")
      this.delete = this._element.querySelector(".element__button-trash")
  }
  
  _handleLikeNewCard() {
    this.like.classList.toggle("element__button_is-active");
  }

  _handleDeleteNewCard = () => {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this.like.addEventListener("click", () => this._handleLikeNewCard());
    this.delete.addEventListener("click", () => this._handleDeleteNewCard());
    this.image.addEventListener("click", () => this._handleCardClick(this._data));
  }

  addCard() {
    this._getTemplate()
    this._setEventListeners()

    this._element.querySelector(".element__title").textContent = this._data.name;
    this.image.alt = this._data.name;
    this.image.src = this._data.link;
    return this._element
    }
}

