function showEditProfileForm() {
  let popup = document.querySelector('.popup');

  let profileName = document.querySelector('.profile__name');
  let nameField = popup.querySelector('.popup__input[name=name]');
  nameField.value = profileName.textContent;

  let profileStatus = document.querySelector('.profile__status');
  let statusField = popup.querySelector('.popup__input[name=status]');
  statusField.value = profileStatus.textContent;

  popup.classList.add('popup_opened');
}

function saveEditProfileForm(evt) {
  evt.preventDefault();

  let profileName = document.querySelector('.profile__name');
  let nameField = document.querySelector('.popup__input[name=name]');
   profileName.textContent = nameField.value;

  let profileStatus = document.querySelector('.profile__status');
  let statusField = document.querySelector('.popup__input[name=status]');
  profileStatus.textContent = statusField.value;
  
  hidePopup();
}

function hidePopup() {
  let popup = document.querySelector('.popup');
  popup.classList.remove('popup_opened');
}

let profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', showEditProfileForm);

let popupCloseButton = document.querySelector('.popup__close-button');
popupCloseButton.addEventListener('click', hidePopup);

let popupSaveButton = document.querySelector('.popup__save-button');
popupSaveButton.addEventListener('click', saveEditProfileForm);