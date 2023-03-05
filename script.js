const templates = document.querySelector('#templates').content;
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
  const popup = document.querySelector('.popup');
  const popupContainer = templates.querySelector('.popup__container').cloneNode(true);

  popupContainer.querySelector('.popup__close-button').addEventListener('click', hidePopup);

  popup.lastChild.remove();
  popupContainer.append(element);
  popup.append(popupContainer);
  popup.classList.add('popup_opened');
}

function hidePopup() {
  const popup = document.querySelector('.popup');

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
  const form = document.querySelector('.popup__form');

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
  const formTemplate = templates.querySelector('.popup__form');
  const form = formTemplate.cloneNode(true);

  form.querySelector('.popup__heading').textContent = 'Редактировать профиль';

  const inputs = form.querySelectorAll('.popup__input');
  inputs[0].name = 'name';
  inputs[0].value = document.querySelector('.profile__name').textContent;
  inputs[1].name = 'status';
  inputs[1].value = document.querySelector('.profile__status').textContent;

  form.querySelector('.popup__save-button').addEventListener('click', saveForm);

  showPopup(form);
}

function showImageAddForm() {
  const formTemplate = templates.querySelector('.popup__form');
  const form = formTemplate.cloneNode(true);

  form.querySelector('.popup__heading').textContent = 'Новое место';

  const inputs = form.querySelectorAll('.popup__input');
  inputs[0].name = 'title';
  inputs[1].name = 'link';

  form.querySelector('.popup__save-button').addEventListener('click', saveForm);

  showPopup(form);
}

function zoomImage(evt) {
  const fullscreenPhotoTemplate = templates.querySelector('.fullscreen-photo');
  const fullscreenPhoto = fullscreenPhotoTemplate.cloneNode(true);

  const photoImage = fullscreenPhoto.querySelector('.fullscreen-photo__image');
  photoImage.src = evt.target.src;
  photoImage.alt = evt.target.alt;

  const photoTitle = fullscreenPhoto.querySelector('.fullscreen-photo__title');
  photoTitle.textContent = evt.target.parentNode.querySelector('.photo__title').textContent;

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

const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', showEditProfileForm);

const addPhotoButton = document.querySelector('.profile__add-button');
addPhotoButton.addEventListener('click', showImageAddForm);

initialCards.forEach((card) => {
  addCard(card['name'], card['link']);
})