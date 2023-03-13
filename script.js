const page = document.querySelector('.page');
const templates = document.querySelector('#templates').content;
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonOpenPopupAddPhoto = document.querySelector('.profile__add-button');
const fullscreenPhoto = document.querySelector('.popup__fullscreen-photo');
const photoImage = fullscreenPhoto.querySelector('.popup__image');
const photoTitle = fullscreenPhoto.querySelector('.popup__image-title');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const inputFieldName = document.querySelector('.popup__input[name=name]');
const inputFieldStatus = document.querySelector('.popup__input[name=status]');
const inputFieldCardTitle = document.querySelector('.popup__input[name=title]');
const inputFieldImageLink = document.querySelector('.popup__input[name=link]');
const popupProfile = document.querySelector('.popup_type_profile');
const formEditProfile = popupProfile.querySelector('.popup__form');
const popupCard = document.querySelector('.popup_type_card');
const formAddCard = popupCard.querySelector('.popup__form');
const popupImage = document.querySelector('.popup_type_image');
const cards = document.querySelector('.photos');


function clickHandler(evt) {
  if(evt.target.classList.contains('popup')) {
    hidePopup(evt.target);
  }
}

function keyHandler(evt) {
  if(evt.key === 'Escape') {
    popup = document.querySelector('.popup_opened');
    if(popup) hidePopup(popup);
  }

}

function showPopup(popup) {
  const buttonClosePopup = popup.querySelector('.popup__close-button');
  page.addEventListener('keydown', keyHandler);
  buttonClosePopup.addEventListener('click', () => {hidePopup(popup)});

  popup.classList.add('popup_opened');
}

function hidePopup(popup) {
  const buttonClosePopup = popup.querySelector('.popup__close-button');
  page.removeEventListener('keydown', keyHandler);
  buttonClosePopup.removeEventListener('click', hidePopup);

  popup.classList.remove('popup_opened');
}

function editProfile(name, status) {
  profileName.textContent = name;
  profileStatus.textContent = status;
}

function createCard(title, link) {
  const cardTemplate = templates.querySelector('.photo');
  const card = cardTemplate.cloneNode(true);

  const cardTitle = card.querySelector('.photo__title');
  cardTitle.textContent = title;

  const cardImage = card.querySelector('.photo__image');
  cardImage.src = link;
  cardImage.alt = title;
  cardImage.addEventListener('click', () => {zoomImage(title, link)});

  const buttonCardLike = card.querySelector('.photo__like-button');
  buttonCardLike.addEventListener('click', likeCard);

  const buttonCardDelete = card.querySelector('.photo__delete-button');
  buttonCardDelete.addEventListener('click', deleteCard);

  return card;
}

function saveEditProfileForm(evt) {
  evt.preventDefault();

  const name = inputFieldName.value;
  const status = inputFieldStatus.value;
  editProfile(name, status);

  hidePopup(popupProfile);
}

function saveImageAddForm(evt) {
  evt.preventDefault();

  const title = inputFieldCardTitle.value;
  const link = inputFieldImageLink.value;

  cards.prepend(createCard(title, link));
  hidePopup(popupCard);
}

function showEditProfileForm() {
  inputFieldName.value = profileName.textContent;
  inputFieldStatus.value = profileStatus.textContent;

  showPopup(popupProfile);
}

function showImageAddForm() {
  inputFieldCardTitle.value = '';
  inputFieldImageLink.value = '';

  showPopup(popupCard);
}

function zoomImage(title, link) {
  photoImage.src = link;
  photoImage.alt = title;

  photoTitle.textContent = title;
  showPopup(popupImage);
}

function likeCard(evt) {
  const button = evt.target;
  button.classList.toggle('photo__like-button_checked');
}

function deleteCard(evt) {
  const card = evt.target.parentNode;
  card.remove();
}

buttonOpenPopupProfile.addEventListener('click', showEditProfileForm);
buttonOpenPopupAddPhoto.addEventListener('click', showImageAddForm);

formEditProfile.addEventListener('submit', saveEditProfileForm);
formAddCard.addEventListener('submit', saveImageAddForm);

page.addEventListener('click', clickHandler);

initialCards.forEach((card) => {
  cards.append(createCard(card['name'], card['link']));
})