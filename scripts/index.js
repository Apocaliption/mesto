const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const popupCard = document.querySelector(".addcard");
const popupOpenButtonAddCard = document.querySelector(".profile__add-button");
const popupCloseButtonAddCard = popupCard.querySelector(".popup__close-button");
const formProfileAddCard = popupCard.querySelector(".popup__form");
const nameInputAddCard = popupCard.querySelector(".popup__input_type_name");
const linkPicInput = popupCard.querySelector(".popup__input_type_description");
const popupProfile = document.querySelector(".editprofile");
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

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function formSubmitHandlerProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupProfile);
}

const handleDeleteNewCard = (event) => {
  event.target.closest(".element").remove();
};

const handleLikeNewCard = (event) => {
  event.target.classList.toggle("element__button_is-active");
};

formProfile.addEventListener("submit", formSubmitHandlerProfile);

//Попап редактирования профиля

popupOpenEditButtonElement.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupProfile);
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

// Создание карточки

const cardTemplate = document
  .querySelector("#template")
  .content.querySelector(".element");

function addCard(title, img) {
  const newCard = cardTemplate.cloneNode(true);

  const titleCard = newCard.querySelector(".element__title");
  const linkCard = newCard.querySelector(".element__image");

  titleCard.textContent = title;
  linkCard.alt = title;
  linkCard.src = img;
  // Удаление карточки
  const deleteButton = newCard.querySelector(".element__button-trash");
  deleteButton.addEventListener("click", handleDeleteNewCard);
  // Лайк карточки
  const likeButton = newCard.querySelector(".element__button");
  likeButton.addEventListener("click", handleLikeNewCard);
  // Попап развернутой картинки
  linkCard.addEventListener("click", function () {
    popupBigImg.src = img;
    popupImgSubitle.textContent = title;
    popupOpenImg.classList.add("popup_opened");
  });

  return newCard;
}

function formSubmitHandlerAddCard(evt) {
  evt.preventDefault();
  const placeName = nameInputAddCard.value;
  const placePic = linkPicInput.value;
  newCard = addCard(placeName, placePic);
  renderCard(newCard);
  closePopupAddCard();
  formProfileAddCard.reset();
}

formProfileAddCard.addEventListener("submit", formSubmitHandlerAddCard);

//Закрытие попапа развернутой картинки
const closePopupOpenImg = () => {
  popupOpenImg.classList.remove("popup_opened");
};

popupCloseButtonBigImg.addEventListener("click", closePopupOpenImg);

// Рендер карточки
function renderCard(newCard) {
  const cardContainer = document.querySelector(".elements");
  cardContainer.prepend(newCard);
}

initialCards.forEach(function (item) {
  newCard = addCard(item.name, item.link);
  renderCard(newCard);
});
