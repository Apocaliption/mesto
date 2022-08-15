export default class Card {
   constructor(data, cardSelector, handleCardClick, handleDeleteClick, handleLikeClick, userId) {
     this._data = data;
     this._id = data.id;
     this._name = data.name;
     this._link = data.link;
     this._likes = data.likes;
     this._ownerId = data.owner._id;
     this._userId = userId;
     this._handleCardClick = handleCardClick;
     this._handleLikeClick = handleLikeClick;
     this._cardSelector = cardSelector;
     this._handleDeleteClick = handleDeleteClick;
   }

  _getTemplate() {
  this._element = document.querySelector(this._cardSelector).content.querySelector('.element')
 .cloneNode(true);

  this.like = this._element.querySelector('.element__button');
  this.image = this._element.querySelector('.element__image');
  this.trash = this._element.querySelector('.element__button-trash');
  }

  _handleLikeCard() {
    this.like.classList.toggle('element__button_is-active');
    }

  updateLike(data) {
    this._likes = data.likes;
    }

  isLiked() {
      return Boolean(this._likes.find((item) => item._id === this._userId));
    }


  activeLikes() {
    this._likesCounter.textContent = this._likes.length;
    if (this.isLiked()) {
    this.like.classList.add('element__button_is-active');
      } else {
    this.like.classList.remove('element__button_is-active');
      }
    }

    deleteCard() {
      this._element.remove();
      this._element = null;
    }

  _setEventListeners() {
   this.like.addEventListener("click", () => this._handleLikeClick());
   this.trash.addEventListener("click", () => this._handleDeleteClick());
   this.image.addEventListener("click", () => this._handleCardClick(this._data));
  }

  addCard() {
      this._getTemplate();
      this._element.querySelector('.element__title').textContent = this._name;

      this.image.alt = this._name;
      this.image.src = this._link;

      this._likesCounter = this._element.querySelector('.element__like-counter');
      this._likesCounter.textContent = this._likes.length;

      if (this._ownerId !== this._userId) {
        this.trash.classList.add('element__button-trash_hide');
      }

      if (this.isLiked()) {
        this.like.classList.add('element__button_is-active');
      }

      this._setEventListeners();
        return this._element;
      }
}