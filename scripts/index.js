//объявляем переменные для открыия и закрытия попапа
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

//объявляем переменные для изменения и сохранения "имя" и "о себе"
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input-name');
const descriptionInput = formElement.querySelector('.popup__input-description');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

function formSubmitHandler (evt) {
  evt.preventDefault(); 

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value; 
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 

const openPopup = function() {
  popupElement.classList.add('popup_opened');
};

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
};

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);