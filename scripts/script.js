// Create Dynamic Category Section---------------------------

// fetch load & display it from API------------------------
// category button--------------------
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((error) => console.log(error));
};
// video section--------------------
const loadVideo = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};
// "category_id": "1001",
//   "category": "Music"
// fetch load & display it from API------------------------

// display the category button-------------------------------

const displayCatagories = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categories.forEach((item) => {
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;
    categoryContainer.append(button);
  });
};
// display the category button-------------------------------

// display the all the video-------------------------------
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos-container");
  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `<figure class="h-[200px]">
    <img class="w-full h-[200px] object-center object-cover"
      src="${video.thumbnail}" />
  </figure>
  <div class="px-0 py-5 flex">
    <div><img class="w-10 h-10 rounded-full object-cover object-center" src="${video.authors[0].profile_picture}"/></div>
    <div><h2 class="font-bold">${video.title}</h2></div>
  </div>`;
    videoContainer.append(card);
  });
};
// display the all the video-------------------------------

loadVideo();
loadCategories();
