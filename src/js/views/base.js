// Taking class name of all css and assigning it to a variable
export const elements={
  serchForm:document.querySelector('.search'),
  serchInput:document.querySelector('.search__field'),
  serchResult:document.querySelector('.results'),
  serchReslist:document.querySelector('.results__list'),
  serchResPages:document.querySelector('.results__pages'),
  recipe:document.querySelector('.recipe'),
  shopping:document.querySelector('.shopping__list'),
  likesMenu:document.querySelector('.likes__field'),
  likesList:document.querySelector('.likes__list')
};
// Taking the loader class
export const elementstring={
  loader:'loader'
}
// Redering the loader based on parent
export const renderloader=parent=>{
  const loader=`
  <div class=${elementstring.loader}>
  <svg> <use href='img/icons.svg#icon-cw'></use></svg>
  </div>`
  ;
  parent.insertAdjacentHTML('afterbegin',loader);
};
// Clearing the loader when the api is fetch
export const clearLoader=()=>{
  const loader=document.querySelector(`.${elementstring.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
}
