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
    .then((data) => {
      removeActiveClass();
      const button = document.getElementById(`btn-${id}`);
      button.classList.add("active");
      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};
// video section--------------------
const loadVideo = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};
// load video by search term-------------------------------
const videoBySearch = (searchText) => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

// details section-----------------------------------------------
const loadDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data.video))
    .catch((error) => console.log(error));
};
// "category_id": "1001",
//   "category": "Music"
// fetch load & display it from API------------------------
// get time----------------------------------
const getTime = (time) => {
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  let minute = parseInt(remainingSecond % 60);
  remainingSecond = remainingSecond % 60;
  return `${hour} hour ${minute}minute ${remainingSecond} second ago`;
};
// remove active class from button-----------------------------------
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (const button of buttons) {
    button.classList.remove("active");
  }
};
// remove active class from button-----------------------------------
// display the details--------------------
const displayDetails = (details) => {
  const detailsContainer = document.getElementById("modal-content");
  detailsContainer.innerHTML = `
  <img src="${details.thumbnail}"/>
  <p>${details.description}</p>`;
  document.getElementById("customModal").showModal();
};
// display the details--------------------

// display the category button-------------------------------------

const displayCatagories = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `<button id="btn-${item.category_id}" class="btn category-btn" onclick="videoByCategory(${item.category_id})">${item.category}</button>`;

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

  if (videos.length === 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
      <div class="flex flex-col min-h-[300px] gap-5 items-center justify-center">
      <img src="assets/Icon.png"/>
        <h2 class="text-center text-xl font-bold">No Video</h2>
      </div>`;
  } else {
    videoContainer.classList.add("grid");
  }
  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `<figure class="h-[180px] relative">
    <img class="w-full h-full object-center object-cover"
      src="${video.thumbnail}"/>
      ${
        video.others.posted_date?.length === 0
          ? ""
          : `<div class="absolute right-4 bottom-4 bg-black text-white text-xs p-1">
            <p>${getTime(video.others.posted_date)}</p>
          </div>`
      }
     
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
    <button class="btn btn-sm btn-error" id="${
      video.video_id
    }" onclick="loadDetails('${video.video_id}')">Details</button>
    </div>
    
  </div>`;
    videoContainer.append(card);
  });
};
// display the all the video-------------------------------
// display the all the video by search-------------------------------

document.getElementById("search-bar").addEventListener("keyup", (e) => {
  videoBySearch(e.target.value);
});
// display the all the video by search-------------------------------

loadVideo();
loadCategories();
