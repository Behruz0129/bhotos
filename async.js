const auth = '563492ad6f91700001000001171319cfea71405883b8ce4bfe4abb8e';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const submitButton = document.querySelector('.submit-btn');
let searchValue;
const more = document.querySelector('.more');
let page = 1;
let fetchLink;
let currentSearch;

//Event Listeners
searchInput.addEventListener('input', updateInput);

form.addEventListener('submit', e => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

more.addEventListener('click', loadMore);

function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach(photo => {
    const galleryImg = document.createElement('div');
    galleryImg.classList.add('gallery-img');
    galleryImg.innerHTML = `
    <img src=${photo.src.large}></img>
    <div class="gallery-info">
    <p>${photo.photographer}</p>
    <a href=${photo.src.original}>Yuklash</a>
    </div>
    `;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  fetchLink = 'https://api.pexels.com/v1/curated?per_page=15&page=1';
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

function clear() {
  gallery.innerHTML = '';
  searchInput.value = '';
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

curatedPhotos();
