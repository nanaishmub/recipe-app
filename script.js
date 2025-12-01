let result = document.getElementById('results');
let searchBtn = document.getElementById('search-btn');
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

let userInp = document.getElementById('search-inp').value;

fetch(url)
.then ((response) => response.json())
.then ((data) => {
    
})