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

function showForm(evt) {
  const popup = document.querySelector('.popup');
  const popupContainer = popup.querySelector('.popup__container');
  const formTemplate = templates.querySelector('.popup__form');
  const form = formTemplate.cloneNode(true);

  switch (evt.target.name){
    case 'profile-edit-button':
      form.querySelector('.popup__heading').textContent = 'Редактировать профиль';
      form.querySelectorAll('.popup__input')[0].name = 'name';
      form.querySelectorAll('.popup__input')[0].value = document.querySelector('.profile__name').textContent;
      form.querySelectorAll('.popup__input')[1].name = 'status';
      form.querySelectorAll('.popup__input')[1].value = document.querySelector('.profile__status').textContent;
    break;
    case 'add-photo-button':
      form.querySelector('.popup__heading').textContent = 'Новое место';
      form.querySelectorAll('.popup__input')[0].name = 'title';
      form.querySelectorAll('.popup__input')[1].name = 'link';
    break;
  }

  form.querySelector('.popup__close-button').addEventListener('click', hideForm);
  form.querySelector('.popup__save-button').addEventListener('click', saveForm);

  popupContainer.append(form);
  popup.classList.add('popup_opened');
}

function hideForm() {
  const popup = document.querySelector('.popup');
  const form = popup.querySelector('.popup__form');

  form.remove();
  popup.classList.remove('popup_opened');
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

  hideForm();
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

  card.querySelector('.photo__title').textContent = title;
  card.querySelector('.photo__image').src = link;
  card.querySelector('.photo__image').alt = title;
  card.querySelector('.photo__like-button').addEventListener('click', like);

  if(prepend) {
    photos.prepend(card);
  } else {
    photos.append(card);
  }
}

function like(evt) {
  const button = evt.target;
  button.classList.toggle('photo__like-button_checked');
}

const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', showForm);

const addPhotoButton = document.querySelector('.profile__add-button');
addPhotoButton.addEventListener('click', showForm);

for(let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i]['name'], initialCards[i]['link']);
}