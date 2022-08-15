export class UserInfo {
  constructor(profileNameSelector, profileDescriptionSelector, avatarSelector) {
    this._name = document.querySelector(profileNameSelector)
    this._description = document.querySelector(profileDescriptionSelector)
    this._avatar = document.querySelector(avatarSelector)
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
    }
  }

  setUserInfo ({name, about, avatar}) {
    this._name.textContent = name;
    this._description.textContent = about;
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }
}