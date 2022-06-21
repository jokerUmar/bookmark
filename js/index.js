const elMovieList = document.querySelector(".movie__list");
const elResult = document.querySelector(".movie__result-num");
let genrelists = document.querySelector(".movieLists");
let elform = document.querySelector(".form")
let elBookmarkList = document.querySelector(".bookmark__list")
let elBookmarkNumber = document.querySelector(".bookmark-number")

let localData = JSON.parse(window.localStorage.getItem("bookmarkData"))

let bookmarks =localData || [] ;


// filmsarr arg ul
// tenglash


elResult.textContent = films.length



let renderBookmark = function(arr , element){

  elBookmarkNumber.textContent = bookmarks.length


  arr.forEach( (bookmark) => {
    
  let newBookmarkItem = document.createElement("li")
  let newBookmarkText = document.createElement("p")
  let BookmarkdeleteBtn = document.createElement("button")
  BookmarkdeleteBtn.setAttribute("class" , "bookmark-delete btn btn-danger")    

  newBookmarkItem.style.listStyleType = "none"
  newBookmarkItem.style.border = "solid 1px"
  newBookmarkItem.style.padding = "10px"
  newBookmarkItem.style.textAlign = "left"
  newBookmarkItem.style.marginTop = "10px"
  


  newBookmarkText.textContent = bookmark.title
  BookmarkdeleteBtn.textContent = "remove"

  elBookmarkList.appendChild(newBookmarkItem)
  newBookmarkItem.appendChild(newBookmarkText)
  newBookmarkItem.appendChild(BookmarkdeleteBtn)
  
  BookmarkdeleteBtn.dataset.bookmarkDeleteBtnId = bookmark.id

  window.localStorage.setItem("bookmarkData" , JSON.stringify(bookmarks) )


  });
}

elBookmarkList.addEventListener("click" , function(e){

  if (e.target.matches(".bookmark-delete")) {

    let bookmarkDeleteid = e.target.dataset.bookmarkDeleteBtnId

    
    let foundBookmarkDel = bookmarks.findIndex( bookmarkDel => bookmarkDel.id ===  bookmarkDeleteid)

    bookmarks.splice(foundBookmarkDel , 1)

    elBookmarkList.innerHTML = ""

    if (bookmarks.length === 0 ) {
      window.localStorage.removeItem("bookmarkData")
    }

    window.localStorage.setItem("bookmarkData" , JSON.stringify(bookmarks) )

    renderBookmark(bookmarks , elBookmarkList)
  }

})


let renderMovies = function (filmsArr, htmlElement) {
  elMovieList.innerHTML = null
  filmsArr.forEach(movie => {
    //CREATE ELEMENT
    const newLi = document.createElement("li");
    const newImg = document.createElement("img");
    const newDiv = document.createElement("div");
    const newTitle = document.createElement("h5");
    const newLanguage = document.createElement("p");
    const newYear = document.createElement("p");
    const newButton = document.createElement("a");
    const newBookmarkButton = document.createElement("button")
    //SET ATTTIBUTE
    newLi.setAttribute("class", "card mb-3");
    newLi.style.width = "18rem";
    newImg.classList.add("card-img-top");
    newImg.setAttribute("src", movie.poster);

    newDiv.classList.add("card-body");
    newTitle.classList.add("card-title");
    newLanguage.classList.add("card-text");
    newYear.classList.add("card-text");
    newButton.setAttribute("class", "btn btn-danger");
    newBookmarkButton.setAttribute("class", "btn btn-primary newbookmark-btn ");
    newBookmarkButton.style.marginLeft = "20px"
    newButton.setAttribute(
      "href",
      `https://www.youtube.com/watch?v=${movie.youtubeId}`
    );

    newTitle.textContent = movie.title;
    newYear.textContent = movie.year;
    newButton.textContent = "Watch Trailer";
    let genresList = document.createElement("ul")

    movie.genres.forEach((genre) => {

      let genresItem = document.createElement("li")

      genresItem.textContent = genre;

      newBookmarkButton.textContent = 'Bookmark'

      genresList.appendChild(genresItem)

    });
    //APPEND

    htmlElement.appendChild(newLi);
    newLi.appendChild(newImg);
    newLi.appendChild(newDiv);
    newDiv.appendChild(newTitle);
    newDiv.appendChild(newYear);
    newDiv.appendChild(newButton);
    newDiv.appendChild(newBookmarkButton)
    newDiv.appendChild(genresList)

    // DATASET
    newBookmarkButton.dataset.bookmarkBtnId = movie.id

  });
}
renderMovies(films, elMovieList)




elMovieList.addEventListener("click", function (e) {
  if (e.target.matches(".newbookmark-btn")) {

    const bookmarkId = e.target.dataset.bookmarkBtnId

    const foundBookmark = films.find(film => film.id == bookmarkId)

    if (!bookmarks.includes(foundBookmark)) {
      bookmarks.push(foundBookmark)
    }

    elBookmarkNumber.textContent = bookmarks.length

    elBookmarkList.innerHTML = ""

    renderBookmark(bookmarks , elBookmarkList)

  }

})

renderBookmark(bookmarks , elBookmarkList)

genrelists.addEventListener("change", (e) => {
  let filterName = e.target.value;
  if (filterName != "all") {
    let filtered = films.filter(e => {
      return e.genres.includes(filterName)
    })

    elResult.textContent = filtered.length

    renderMovies(filtered, elMovieList)
  } else {
    renderMovies(films, elMovieList)
    elResult.textContent = films.length
  }

})


let genresList = [];
for (i of films) {
  for (j of i.genres) {
    if (!genresList.includes(j)) {
      genresList.push(j);
      genrelists.options.add(new Option(j, j));
      elResult.textContent = films.length
    }
  }
}



// genrelist select elementiga teng
// bu elementimizani option dgan xususiyati bor
// classlist.add () faqat ichida new kalit so`zi orqali
// yengi yengi option elementini hosil qilib, uni birinchi 
// parametriga text ikkinchi parametriga qiymat beriladi