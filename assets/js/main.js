var formSearch = document.getElementById('nav__form-search');
var searchHover = document.getElementById('search-hover');
console.log(formSearch, searchHover);


searchHover.addEventListener('mouseover', ()=>{
    formSearch.classList.remove('active');
});
searchHover.addEventListener('mouseout', ()=>{
    formSearch.classList.add('active');
});