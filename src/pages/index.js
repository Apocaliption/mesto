import '../pages/index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { Section } from '../components/Section.js'
import { initialCards } from '../utils/cards.js'
import { UserInfo } from '../components/UserInfo.js'
import { popupCard, popupOpenButtonAddCard, popupProfile, popupOpenEditButtonElement, nameInput, descriptionInput, cardSelector, elementSelector, validData } from '../utils/constants.js'

function openEditPopup() {
  const { name, description } = userInfo.getUserInfo()
  nameInput.value = name;
  descriptionInput.value = description;
  editProfilePopup.open();
}

popupOpenEditButtonElement.addEventListener("click", function () {
  openEditPopup();
});

popupOpenButtonAddCard.addEventListener("click", function () {
  addCardPopup.open();
});

const handleProfileFormSubmit = (data) => {
  const {name, description} = data
  userInfo.setUserInfo(name, description)
  editProfilePopup.close()
}

 function handleAddCardFormSubmit(data) {
   const card = createCard({
     name: data['name'],
     link: data.link
   })
   section.addItem(card)
   validationAddCard.resetButtonCard();
 }

const createCard = (data) => {
     const card = new Card(data, cardSelector, () => {
       cardPopup.open(data)
     });
     return card.addCard();
   }

 const renderCard = (data, parent) => {
   const card = createCard(data);
   parent.prepend(card);
 }

const section = new Section({ items: initialCards, renderer: renderCard }, elementSelector);
const validationAddCard = new FormValidator(validData, popupCard)
validationAddCard.enableValidation();
const validationEditProfile = new FormValidator(validData, popupProfile)
validationEditProfile.enableValidation();
const cardPopup = new PopupWithImage('.popup_img')
const editProfilePopup = new PopupWithForm('.editprofile', handleProfileFormSubmit)
const addCardPopup = new PopupWithForm('.addcard', handleAddCardFormSubmit)
const userInfo = new UserInfo({profileNameSelector: '.profile__name', profileDescriptionSelector: '.profile__description'})

cardPopup.setEventListeners()
editProfilePopup.setEventListeners()
addCardPopup.setEventListeners()

section.renderItems();