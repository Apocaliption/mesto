import '../pages/index.css';
import { Api } from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { popupCard, popupOpenButtonAddCard, popupProfile, popupOpenEditButtonElement, cardSelector, elementSelector, validData, popupAvatar, profileNameSelector, profileDescriptionSelector, avatarSelector, avatar } from '../utils/constants.js';

const api = new Api ({
  baseUrl: 'https://nomoreparties.co/v1/cohort-47',
  headers: {
    authorization: 'a21fd2af-5b26-4597-a140-3c552cbe9bed',
    'Content-Type': 'application/json',
  }
});

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([user, initialCards]) => {
    userId = user._id;
    userInfo.setUserInfo(user);
    section.renderItems(initialCards);
  })
  .catch((err) => 
    console.log(err))
    .finally(() => 
  {});

let userId;

const validationAddCard = new FormValidator(validData, popupCard);
validationAddCard.enableValidation();

const validationEditProfile = new FormValidator(validData, popupProfile);
validationEditProfile.enableValidation();

const validationEditAvatar = new FormValidator(validData, popupAvatar);
validationEditAvatar.enableValidation();

const editProfilePopup = new PopupWithForm('.editprofile', (data) => {
  editProfilePopup.loading(true);
  api.updateUserData(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfilePopup.loading(false);
    });
});

editProfilePopup._setEventListeners();

popupOpenEditButtonElement.addEventListener('click', () => {
  validationEditProfile.resetButtonCard();
  editProfilePopup.setInputValues(userInfo.getUserInfo());
  editProfilePopup.open();
});

const changeAvatarPopup = new PopupWithForm('.avatar', (formData) => {
  changeAvatarPopup.loading(true);
  api.changeAvatar(formData)
    .then((data) => {
      userInfo.setUserInfo(data);
      changeAvatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeAvatarPopup.loading(false);
    });
});

changeAvatarPopup._setEventListeners();

avatar.addEventListener('click', () => {
  validationEditAvatar.resetButtonCard();
  changeAvatarPopup.open();
});

const userInfo = new UserInfo(profileNameSelector, profileDescriptionSelector, avatarSelector);

const cardPopup = new PopupWithImage('.popup_img');
cardPopup._setEventListeners();

const popupConfirm = new PopupWithConfirm('.confirm');
popupConfirm._setEventListeners();

const addCardPopup = new PopupWithForm('.addcard', (formData) => {
  addCardPopup.loading(true);
  api.addCard(formData)
    .then((data) => {
      section.addItem(data);
      addCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardPopup.loading(false);
    });
});

addCardPopup._setEventListeners();

popupOpenButtonAddCard.addEventListener('click', () => {
  validationAddCard.resetButtonCard();
  addCardPopup.open();
});

const createCard = (data) => {
  const card = new Card(data, cardSelector, () =>
    cardPopup.open(data),
      () => { popupConfirm.setConfirm(
        () => {
          popupConfirm.loading(true);
          api.deleteCard(data._id)
            .then(() => {
              card.deleteCard();
              popupConfirm.close();
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() =>
              popupConfirm.loading(false));
            });
          popupConfirm.open();
        },
        () => {
          if (!card.isLiked()) {
            api.addLike(data._id)
              .then((data) => {
                card.updateLike(data);
                card.activeLikes();
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            api.deleteLike(data._id)
              .then((data) => {
                card.updateLike(data);
                card.activeLikes();
              })
              .catch((err) => {
                console.log(err);
              });
  }
}, userId
  );
  return card.addCard();
};

const section = new Section((card) => createCard(card), elementSelector);