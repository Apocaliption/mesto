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

const addCardPopup = document.querySelector(".addcard");
const popupOpenButtonAddCard = document.querySelector(".profile__add-button");
const popupCloseButtonAddCard = addCardPopup.querySelector(
  ".popup__close-button"
);
const formElementAddCard = addCardPopup.querySelector(".popup__form");
const nameInputAddCard = addCardPopup.querySelector(".popup__input_type_name");
const linkPicInput = addCardPopup.querySelector(
  ".popup__input_type_description"
);
const popupElement = document.querySelector(".editprofile");
const popupCloseButtonElement = popupElement.querySelector(
  ".popup__close-button"
);
const popupOpenEditButtonElement = document.querySelector(
  ".profile__edit-button"
);
const formElement = popupElement.querySelector(".popup__form");
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

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup();
}

const handleDeleteNewCard = (event) => {
  event.target.closest(".element").remove();
};

const handleLikeNewCard = (event) => {
  event.target.classList.toggle("element__button_is-active");
};

formElement.addEventListener("submit", formSubmitHandler);

//Попап редактирования профиля

const openPopup = () => {
  popupElement.classList.add("popup_opened");
};

const closePopup = () => {
  popupElement.classList.remove("popup_opened");
};

popupOpenEditButtonElement.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup();
});

popupCloseButtonElement.addEventListener("click", closePopup);

//Попап добавления карточки

const openPopupAddCard = () => {
  addCardPopup.classList.add("popup_opened");
};

const closePopupAddCard = () => {
  addCardPopup.classList.remove("popup_opened");
};

popupOpenButtonAddCard.addEventListener("click", openPopupAddCard);
popupCloseButtonAddCard.addEventListener("click", closePopupAddCard);

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
  formElementAddCard.reset();
  newCard = addCard(placeName, placePic);
  renderCard(newCard, "append");
  closePopupAddCard();
}

formElementAddCard.addEventListener("submit", formSubmitHandlerAddCard);

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
  renderCard(newCard, "append");
});
