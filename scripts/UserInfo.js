export class UserInfo {
  constructor({profileNameSelector, profileDescriptionSelector}) {
    this._nameElement = document.querySelector(profileNameSelector)
    this._descriptionElement = document.querySelector(profileDescriptionSelector)
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent
    }
  }

  setUserInfo(title, description) {
    this._nameElement.textContent = title
    this._descriptionElement.textContent = description
  }
}

// new UserInfo({profileNameSelector: profile__name, profileDescriptionSelector: profile__description})