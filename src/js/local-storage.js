// !!!!!!!!!!добавил это  !!!!!!!!!!!!!!!!

import { paginationMarkUp } from './pagination.js';
const paginationBox = document.querySelector('.pagination');
let currentPage = 1;
let maxPage = 1;

// -----------------------

const watchedLibBtn = document.querySelector('.js-watched-lib-btn');
const queueLibBtn = document.querySelector('.js-queue-lib-btn');
const libraryBox = document.querySelector('.js-library-gallery');
const emptyGalleryBox = document.querySelector('.info-notify-box');
const emptyGalleryText = document.querySelector('.info-notify-text');

// Функція розпарсить об'єкти з localStorage
function localStorageObject(key) {
  const getObjectFromLs = localStorage.getItem(key);
  const parseObjectFromLs = JSON.parse(getObjectFromLs);
  console.log(parseObjectFromLs);
  return parseObjectFromLs;
}
// ключі від localStorage
const watchedArray = localStorageObject('TRENDING_DATA_KEY');
const queueArray = localStorageObject('SEARCH_RESULT_DATA_KEY');

// Рендерить розмітку у бібліотеці по дефолту
renderLibrary(watchedArray);
watchedLibBtn.classList.add('btn-is-active');

// Функція для рендуру розмітки
function renderLibrary(arrayMovies) {
  if (arrayMovies.length === 0) {
    clearMarkup();
    return emptyGalleryBox.classList.remove('is-hidden');
  }

  const markupOneCard = obj => {
    clearMarkup();
    checkGenresById(obj);

    return ` <li class="card-wraper" id="${obj.id}">
       <img class="card-img" src="https://image.tmdb.org/t/p/w500${
         obj.poster_path
       }" alt="#" />
       <div class="card-title">${obj.title || obj.name}</div>
      <div class="wraper">
         <div class="card-genre-wraper">
           <div class="card-genre">${checkGenresById(obj)}</div>
         </div>
         <div class="card-year">

         
         
         </div>
         <div class="card-rating-wraper"><div class="card-rating">${obj.vote_average.toFixed(
           1
         )}</div></div>
       </div>
     </li>`;
  };

  // ${obj.release_date.slice(0, 4) || obj.first_air_date.slice(0, 4) || ''}

  const libraryMarkup = arrayMovies.map(markupOneCard).join('');
  libraryBox.insertAdjacentHTML('beforeend', libraryMarkup);

  // !!!!!!!!!!добавил это  !!!!!!!!!!!!!!!!

  currentPage = 1;
  let arr = localStorage.getItem('TRENDING_DATA_KEY');
  let parsedArr = JSON.parse(arr);
  console.log(parsedArr);
  maxPage = Math.ceil(parsedArr.length / 20);
  console.log(maxPage);
  paginationMarkUp(currentPage, maxPage);

  // paginationMarkUp(currentPage, 30);

  // -----------------------
}

// Функція для генерації жанрів по id
function checkGenresById(obj) {
  const savedGenresData = localStorage.getItem('TRENDING_DATA_KEY');
  const parseGenresData = JSON.parse(savedGenresData);
  let genresArr = [];

  const genresIds = obj.genre_ids;

  for (const parseGenre of parseGenresData) {
    if (genresIds.includes(parseGenre.id)) {
      genresArr.push(parseGenre.name);
    }
  }

  let genresStr = '';
  if (genresArr.length === 0) {
    genresStr = 'Unknown genre';
  } else if (genresArr.length <= 2) {
    genresStr = genresArr.join(', ');
  } else {
    genresArr.splice(2, genresArr.length);
    genresStr = genresArr.join(', ') + ', Other';
  }
  return genresStr;
}

watchedLibBtn.addEventListener('click', onClickWatched);
queueLibBtn.addEventListener('click', onClickQueue);

function onClickWatched() {
  // !!!!!!!!!!добавил это  !!!!!!!!!!!!!!!!

  currentPage = 1;
  let arr = localStorage.getItem('TRENDING_DATA_KEY');
  let parsedArr = JSON.parse(arr);
  maxPage = Math.ceil(parsedArr.length / 20);
  paginationMarkUp(currentPage, maxPage);

  // -----------------------

  watchedLibBtn.classList.add('btn-is-active');
  queueLibBtn.classList.remove('btn-is-active');
  emptyGalleryBox.classList.add('is-hidden');
  renderLibrary(watchedArray);
}

function onClickQueue() {
  // !!!!!!!!!!добавил это  !!!!!!!!!!!!!!!!

  currentPage = 1;
  let arr = localStorage.getItem('SEARCH_RESULT_DATA_KEY');
  let parsedArr = JSON.parse(arr);
  maxPage = Math.ceil(parsedArr.length / 20);
  paginationMarkUp(currentPage, maxPage);
  // -----------------------

  emptyGalleryBox.classList.add('is-hidden');
  queueLibBtn.classList.add('btn-is-active');
  watchedLibBtn.classList.remove('btn-is-active');
  renderLibrary(queueArray);
}

function clearMarkup() {
  libraryBox.innerHTML = '';
}

// !!!!!!!!!!добавил это  !!!!!!!!!!!!!!!!

paginationBox.addEventListener('click', Onclick);

function Onclick(evt) {
  if (evt.target.textContent == '...') {
    return;
  }
  if (evt.target.nodeName !== 'P') {
    return;
  }
  currentPage = evt.target.textContent;

  if (evt.target.textContent == '>>') {
    currentPage = Number(targetPage.textContent) + 1;
  }

  if (evt.target.textContent == '<<') {
    currentPage = Number(targetPage.textContent) - 1;
  }

  paginationMarkUp(currentPage, maxPage);
  for (i = (currentPage - 1) * 20; i < (currentPage - 1) * 20 + 20; i += 1) {
    console.log(`i=${i}`);

    // И вот тут отрисовываем карточки из массива по интексам   <<<<<-----------
  }
}

// -----------------------
