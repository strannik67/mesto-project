const templates = document.querySelector('#templates').content;
const popup = document.querySelector('.popup');
const form = popup.querySelector('.popup__form');
const fullscreenPhoto = document.querySelector('.fullscreen-photo');
const profileEditButton = document.querySelector('.profile__edit-button');
const addPhotoButton = document.querySelector('.profile__add-button');
const closePopupButton = document.querySelector('.popup__close-button');

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

function showPopup(element) {
  closePopupButton.style.display = 'block';
  popup.classList.add('popup_opened');
}

function hidePopup() {
  popup.classList.remove('popup_opened');
  setTimeout(() => {
    form.style.display = 'none';
    fullscreenPhoto.style.display = 'none';
    closePopupButton.style.display = 'none';
  }, 500);
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

  hidePopup();
}

function showEditProfileForm() {
  form.querySelector('.popup__heading').textContent = 'Редактировать профиль';

  const inputs = form.querySelectorAll('.popup__input');
  inputs[0].name = 'name';
  inputs[0].value = document.querySelector('.profile__name').textContent;
  inputs[1].name = 'status';
  inputs[1].value = document.querySelector('.profile__status').textContent;

  form.querySelector('.popup__save-button').addEventListener('click', saveForm);

  form.style.display = 'flex';
  showPopup(form);
}

function showImageAddForm() {
  form.querySelector('.popup__heading').textContent = 'Новое место';

  const inputs = form.querySelectorAll('.popup__input');
  inputs[0].name = 'title';
  inputs[0].value = '';
  inputs[1].name = 'link';
  inputs[1].value = '';

  form.querySelector('.popup__save-button').addEventListener('click', saveForm);

  form.style.display = 'flex';
  showPopup(form);
}

function zoomImage(evt) {
  const photoImage = fullscreenPhoto.querySelector('.fullscreen-photo__image');
  photoImage.src = evt.target.src;
  photoImage.alt = evt.target.alt;

  const photoTitle = fullscreenPhoto.querySelector('.fullscreen-photo__title');
  photoTitle.textContent = evt.target.parentNode.querySelector('.photo__title').textContent;

  fullscreenPhoto.style.display = 'flex';
  showPopup(fullscreenPhoto);
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

closePopupButton.addEventListener('click', hidePopup);

initialCards.forEach((card) => {
  addCard(card['name'], card['link']);
})