//Редактирование профиля
function hidePopup() {
  const popup = document.querySelector('.popup');
  popup.classList.remove('popup_opened');
}

function showEditProfileForm() {
  const popup = document.querySelector('.popup');

  const profileName = document.querySelector('.profile__name');
  const nameField = popup.querySelector('.popup__input[name=name]');
  nameField.value = profileName.textContent;

  const profileStatus = document.querySelector('.profile__status');
  const statusField = popup.querySelector('.popup__input[name=status]');
  statusField.value = profileStatus.textContent;

  popup.classList.add('popup_opened');
}

function saveEditProfileForm(evt) {
  evt.preventDefault();

  const profileName = document.querySelector('.profile__name');
  const nameField = document.querySelector('.popup__input[name=name]');
   profileName.textContent = nameField.value;

  const profileStatus = document.querySelector('.profile__status');
  const statusField = document.querySelector('.popup__input[name=status]');
  profileStatus.textContent = statusField.value;
  
  hidePopup();
}

const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', showEditProfileForm);

const popupCloseButton = document.querySelector('.popup__close-button');
popupCloseButton.addEventListener('click', hidePopup);

const popupSaveButton = document.querySelector('.popup__save-button');
popupSaveButton.addEventListener('click', saveEditProfileForm);

//Отображение карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 
const templates = document.querySelector('#templates').content;
const cardTemplate = templates.querySelector('.photo');
const photos = document.querySelector('.photos');

function addCard(name, link) {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.photo__title').textContent = name;
  card.querySelector('.photo__image').src = link;

  photos.append(card);
}

for(let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i]['name'], initialCards[i]['link']);
}