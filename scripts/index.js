import Card from './Card.js'
import FormValidator from './FormValidator.js'
import {initialCards} from './cards.js'

const popupCard = document.querySelector(".addcard");
const popupOpenButtonAddCard = document.querySelector(".profile__add-button");
const popupCloseButtonAddCard = popupCard.querySelector(".popup__close-button");
const formProfileAddCard = popupCard.querySelector(".popup__form");
const nameInputAddCard = popupCard.querySelector(".popup__input_type_name");
const linkPicInput = popupCard.querySelector(".popup__input_type_description");
const popupProfile = document.querySelector(".editprofile");
const btnSaveCard = popupCard.querySelector('.popup__save-button');
const popupCloseButtonElement = popupProfile.querySelector(
  ".popup__close-button"
);
const popupOpenEditButtonElement = document.querySelector(
  ".profile__edit-button"
);
const formProfile = popupProfile.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description"
);
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const popupOpenImg = document.querySelector(".popup_img");
const popupBigImg = popupOpenImg.querySelector(".popup__image");
const popupImgSubitle = popupOpenImg.querySelector(".popup__subtitle");
const popupCloseButtonBigImg = popupOpenImg.querySelector(
  ".popup__close-button"
);
const cardContainer = document.querySelector(".elements");

export const validData = ({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error-visible",
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener('mousedown', clickPopupOverlay);
  document.addEventListener("keyup", handlePressEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener('mousedown', clickPopupOverlay);
  document.removeEventListener("keyup", handlePressEsc);
}

const handlePressEsc = (event) => {
  if (event.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
};

function clickPopupOverlay(evt) {
  if (evt.target === evt.currentTarget){
      closePopup(evt.target)
  };
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupProfile);
}

formProfile.addEventListener("submit", handleProfileFormSubmit);

//Попап редактирования профиля

function openEditPopup() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupProfile);}

popupOpenEditButtonElement.addEventListener("click", function () {
  openEditPopup();
});

popupCloseButtonElement.addEventListener("click", function () {
  closePopup(popupProfile);
});

//Попап добавления карточки
popupOpenButtonAddCard.addEventListener("click", function () {
  openPopup(popupCard);
});
popupCloseButtonAddCard.addEventListener("click", function () {
  closePopup(popupCard);
});

  export function handleCardClick(name, link) {
  popupBigImg.src = link;
  popupBigImg.alt = name;
  popupImgSubitle.textContent = name;
  openPopup(popupOpenImg);
  }

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const data = {}
  data.name = nameInputAddCard.value;
  data.link = linkPicInput.value;
  renderCard(cardContainer, data, '#template');
  validationAddCard.resetButtonCard();
  closePopup(popupCard);
  formProfileAddCard.reset();
}

formProfileAddCard.addEventListener("submit", handleAddCardFormSubmit);

//Закрытие попапа развернутой картинки
const closePopupOpenImg = () => {
  closePopup(popupOpenImg);
};

popupCloseButtonBigImg.addEventListener("click", closePopupOpenImg);

// Рендер карточки
function renderCard(parent, data, cardSelector) {
  const card = new Card(data, cardSelector)
  const cardElement = card.addCard()
  parent.prepend(cardElement)
}

initialCards.forEach(function (item) {
  renderCard(cardContainer, item, '#template')
});

const validationAddCard = new FormValidator(validData, popupCard)
validationAddCard.enableValidation()

const validationEditProfile = new FormValidator(validData, popupProfile)
validationEditProfile.enableValidation()




























