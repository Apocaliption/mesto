import Card from './Card.js'
import FormValidator from './FormValidator.js'
//import {Popup} from './Popup.js'
import { PopupWithImage } from './PopupWithImage.js'
import { PopupWithForm } from './PopupWithForm.js'
import { Section } from './Section.js'
import { initialCards } from './cards.js'
import { UserInfo } from './UserInfo.js'

const popupCard = document.querySelector(".addcard");
const popupOpenButtonAddCard = document.querySelector(".profile__add-button");
const popupProfile = document.querySelector(".editprofile");
const popupOpenEditButtonElement = document.querySelector(
  ".profile__edit-button"
);
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description"
);

export const validData = ({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error-visible",
});

const handleProfileFormSubmit = (data) => {
  const {name, description} = data
  userInfo.setUserInfo(name, description)
  editProfilePopup.close()
}
//Попап редактирования профиля

function openEditPopup() {
  const { name, description } = userInfo.getUserInfo()
  nameInput.value = name;
  descriptionInput.value = description;
  editProfilePopup.open();
}

popupOpenEditButtonElement.addEventListener("click", function () {
  openEditPopup();
});

//Попап добавления карточки
popupOpenButtonAddCard.addEventListener("click", function () {
  addCardPopup.open();
});

function handleAddCardFormSubmit(data) {
  const card = createCard({
    name: data['card-name'],
    link: data.link
  }, '#template')
  addCardPopup.close()
  section.addItem(card)
  debugger;
  validationAddCard.resetButtonCard();
}

// Рендер карточки
const createCard = (data, cardSelector) => {
  const card = new Card(data, cardSelector, () => {
    cardPopup.open(data.name, data.link)
  });
  return card.addCard();
}

function renderCard(data, parent, cardSelector) {
  const card = createCard(data, cardSelector);
  //const cardElement = card.addCard()
  parent.prepend(card);
}

const validationAddCard = new FormValidator(validData, popupCard)
validationAddCard.enableValidation();

const validationEditProfile = new FormValidator(validData, popupProfile)
validationEditProfile.enableValidation();

const section = new Section({ items: initialCards, renderer: renderCard }, '.elements');

const cardPopup = new PopupWithImage('.popup_img')

const editProfilePopup = new PopupWithForm('.editprofile', handleProfileFormSubmit)
const addCardPopup = new PopupWithForm('.addcard', handleAddCardFormSubmit)

cardPopup.setEventListeners()
editProfilePopup.setEventListeners()
addCardPopup.setEventListeners()

section.renderItems();

const userInfo = new UserInfo({profileNameSelector: '.profile__name', profileDescriptionSelector: '.profile__description'})