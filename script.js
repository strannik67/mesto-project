const templates = document.querySelector('#templates').content;
const profileEditButton = document.querySelector('.profile__edit-button');
const addPhotoButton = document.querySelector('.profile__add-button');
const saveFormButtons = document.querySelectorAll('.popup__save-button');
const fullscreenPhoto = document.querySelector('.fullscreen-photo');
const photoImage = fullscreenPhoto.querySelector('.fullscreen-photo__image');
const photoTitle = fullscreenPhoto.querySelector('.fullscreen-photo__title');

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

function showPopup(popup) {
  const closePopupButton = popup.querySelector('.popup__close-button');
  closePopupButton.addEventListener('click', hidePopup);

  popup.classList.add('popup_opened');
}

function hidePopup(evt) {
  const popup = evt.target.parentNode.parentNode.parentNode;
  const closePopupButton = popup.querySelector('.popup__close-button');
  closePopupButton.removeEventListener('click', hidePopup);

  popup.classList.remove('popup_opened');
}

function editProfile(name, status) {
  const profileName = document.querySelector('.profile__name');
  const profileStatus = document.querySelector('.profile__status');
  profileName.textContent = name;
  profileStatus.textContent = status;
}

function addCard(title, link, prepend = false) {
  const cardTemplate = templates.querySelector('.photo');
  const photos = document.querySelector('.photos');
  const card = cardTemplate.cloneNode(true);

  const cardTitle = card.querySelector('.photo__title');
  cardTitle.textContent = title;

  const cardImage = card.querySelector('.photo__image');
  cardImage.src = link;
  cardImage.alt = title;
  cardImage.addEventListener('click', zoomImage);

  const cardLikeButton = card.querySelector('.photo__like-button');
  cardLikeButton.addEventListener('click', likeCard);

  const cardDeleteButton = card.querySelector('.photo__delete-button');
  cardDeleteButton.addEventListener('click', deleteCard);

  if(prepend) {
    photos.prepend(card);
  } else {
    photos.append(card);
  }
}

function saveForm(evt) {
  evt.preventDefault();
  const form = evt.target.parentNode;

  switch(form.querySelector('.popup__heading').textContent) {
    case 'Редактировать профиль':
      const name = form.querySelector('.popup__input[name=name]').value;
      const status = form.querySelector('.popup__input[name=status]').value;
      editProfile(name, status);
    break;
    case 'Новое место':
      const title = form.querySelector('.popup__input[name=title]').value;
      const link = form.querySelector('.popup__input[name=link]').value;
      addCard(title, link, true);
    break;
  }

  hidePopup(evt);
}

function showEditProfileForm() {
  const popup = document.querySelector('.popup_type_profile');

  const inputs = popup.querySelectorAll('.popup__input');
  inputs[0].value = document.querySelector('.profile__name').textContent;
  inputs[1].value = document.querySelector('.profile__status').textContent;

  showPopup(popup);
}

function showImageAddForm() {
  const popup = document.querySelector('.popup_type_card');

  const inputs = popup.querySelectorAll('.popup__input');
  inputs[0].value = '';
  inputs[1].value = '';

  showPopup(popup);
}

function zoomImage(evt) {
  const popup = document.querySelector('.popup_type_image');

  photoImage.src = evt.target.src;
  photoImage.alt = evt.target.alt;

  photoTitle.textContent = evt.target.parentNode.querySelector('.photo__title').textContent;
  showPopup(popup);
}

function likeCard(evt) {
  const button = evt.target;
  button.classList.toggle('photo__like-button_checked');
}

function deleteCard(evt) {
  const card = evt.target.parentNode;
  card.remove();
}

profileEditButton.addEventListener('click', showEditProfileForm);

addPhotoButton.addEventListener('click', showImageAddForm);

initialCards.forEach((card) => {
  addCard(card['name'], card['link']);
})


saveFormButtons[0].addEventListener('click', saveForm);
saveFormButtons[1].addEventListener('click', saveForm);