const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDc3YTdhYWYzM2I5MzI1ZjEwMzFlNzIwMWI4NmZiZSIsInN1YiI6IjY0NzU0ZDk2OTI0Y2U2MDBmOTc1ZmJiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WIWIGryAqkWX0k4gAfby1hNuoHZnds-jhlzONrqlwxI",
  },
};

// 데이터 받아오는 과정

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    const movies = data.results;

    for (let i = 0; i < movies.length; i++) {
      let id = movies[i].id;
      let imgUrl = movies[i].backdrop_path;
      let title = movies[i].title;
      let desc = movies[i].overview;
      let rate = movies[i].vote_average;

      let movieList = document.getElementById("movie-list");

      let movieBox = document.createElement("div");

      movieBox.setAttribute("id", `${id}`);
      movieBox.setAttribute("class", `movie-list-box`);

      movieList.appendChild(movieBox);

      movieBox.innerHTML = `
          <img src="https://image.tmdb.org/t/p/original${imgUrl}" alt="영화 이미지" class="movie-img">
          <div class="movie-title">
              ${title}
          </div>
          <div class="movie-desc">
              ${desc}
          </div>
          <div class="movie-rate">
              ${rate}⭐
          </div>
      `;

      // 카드 클릭 시 해당 영화 id를 표시하는 alert 창 발생
      document.getElementById(`${id}`).onclick = function () {
        alert(`This movie's id is ${id}`);
      };
    }
  })
  .catch((err) => console.error(err));

// 영화 제목을 검색하면 해당 리스트만 조회되는 기능
// 대/소문자 구분 없이 검색 가능
// 굳이 검색 버튼을 누르지 않아도 글자만 치면 바로 해당 조건에 맞는 리스트가 조회됨
// 검색버튼을 누른 경우에만 조회가 되게 하려면 html 문서 18번째 줄의 onkeydown="search()" 삭제하면 됨
function search() {
  let input = document.getElementById("search-input").value.toLowerCase();
  let movieCards = document.querySelectorAll(".movie-list-box");
  let movieTitles = document.querySelectorAll(".movie-title");
  let titles = [...movieTitles].map((title) => title.innerText.toLowerCase());

  for (let i = 0; i < movieCards.length; i++) {
    if (titles[i].includes(input) === true) {
      movieCards[i].style.display = "flex";
    } else if (titles[i].includes(input) === false) {
      movieCards[i].style.display = "none";
    }
  }
}
