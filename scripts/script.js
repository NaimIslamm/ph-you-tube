// Create Dynamic Category Section---------------------------

// fetch load & display it from API------------------------
// category button--------------------
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((error) => console.log(error));
};
// video load by category----------------
const videoByCategory = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.category))
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
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `<button id="btn-${item.category_id}" class="btn" onclick="videoByCategory(${item.category_id})">${item.category}</button>`;
    // const button = document.createElement("button");
    // button.classList = "btn";
    // button.innerText = item.category;
    categoryContainer.append(buttonContainer);
  });
};
// display the category button-------------------------------

// display the all the video-------------------------------
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos-container");
  videoContainer.innerHTML = "";
  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `<figure class="h-[180px]">
    <img class="w-full h-full object-center object-cover"
      src="${video.thumbnail}" />
  </figure>
  <div class="px-0 py-5 flex gap-3">
    <div><img class="w-10 h-10 rounded-full object-cover object-center" src="${
      video.authors[0].profile_picture
    }"/></div>
    
    <div><h2 class="font-bold">${video.title}</h2>
   
    <div class="flex gap-2"><p>${video.authors[0].profile_name}</p>
    
    ${
      video.authors[0].verified === true
        ? `<img class="w-6" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png"/>`
        : ""
    }
    </div>
    
    <h3>${video.others.views}</h3>
    </div>
    
  </div>`;
    videoContainer.append(card);
  });
};
// display the all the video-------------------------------

loadVideo();
loadCategories();
