// IMPORTING MODULES
import {elements} from './base';
// EXPORTING MODULES
export const getInput=()=>elements.serchInput.value;

// FUNCTION TO CLEAR FIELDS
export const clearFileds=()=>{
  elements.serchInput.value='';
}
export const clearResult=()=>{
  elements.serchReslist.innerHTML='';
  elements.serchResPages.innerHTML='';
}

// FUNCTION TO LIMIT THE RECIPE TITLE
export const limitRecipetitle=(title,limit=17)=>{
  const newtitle=[];
  if (title.length>limit){
    title.split(' ').reduce((acc,cur)=>{
      if (acc+cur.length<=limit){
        newtitle.push(cur);
      }
      return acc+cur.length;

    },0);
    return `${newtitle.join(' ')}...`;
  }
  return title;

}

// FUNCTION TO RENDER RECIPE ON UI
const renderRecipe=recipes=>{
  const markup=`  <li>
        <a class="results__link" href="#${recipes.recipe_id}">
            <figure class="results__fig">
                <img src="${recipes.image_url}" alt="${recipes.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipetitle(recipes.title)}</h4>
                <p class="results__author">${recipes.publisher}</p>
            </div>
        </a>
    </li>`;
  elements.serchReslist.insertAdjacentHTML('beforeend',markup);
}

// FUNCTION TO GENERATE BUTON BASED ON TYPE
const createButton=(page,type)=>
 `  <button class="btn-inline results__btn--${type}" data-goto="${type==='prev'?page-1:page+1}">
    <span>Page ${type==='prev'?page-1:page+1}</span>
       <svg class="search__icon">
           <use href="img/icons.svg#icon-triangle-${type==='prev'?'left':'right'}"></use>
       </svg>

   </button>`

// RENDERING BUTTON BASED ON PAGES
const renderButton=(page,numResults,resPerPage)=>{
  const pages=Math.ceil(numResults/resPerPage);
  let button;
  if (page===1 && pages>1){
    button=createButton(page,'next');
  }else if (page<pages) {
    button=`
      ${createButton(page,'prev')}
      ${createButton(page,'next')}
    `;
  }else if (page===pages && pages>1) {
    button=createButton(page,'prev');
  }
  elements.serchResPages.insertAdjacentHTML('afterbegin',button);
};

// RENDERING RECIPE ON UI BY CALLING FUNCTION TO EACH API WE GET FROM SERVER
// ALSO RENDERING THE PAGNATION BUTTON BY SENDING PAGE AND RESULT PER PAGE
export const renderResults=(recipe,page=1,resPerPage=10)=>{
  const start=(page-1)*resPerPage;
  const end=page*resPerPage;
  recipe.slice(start,end).forEach(renderRecipe);
  renderButton(page,recipe.length,resPerPage);
}
