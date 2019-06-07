// Global app controller

//                      importing module
import Serch from './models/Serch';
import Recipe from './models/Recipe'
import List from './models/List'
import Like from './models/Likes'
import {elements,renderloader,clearLoader} from './views/base'
import * as serchView from './views/serchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likeView from './views/likesView';



//                      importing module

/*We are storing every particular serch controller query and recipe clicked id and shopping list value and liked value*/
const state={}

 /* Serch controller */
const controlSerch=async () =>{
  const query=serchView.getInput();
  // const query='pizza'
  if(query)
  {
    // Create new serch object
    state.serch=new Serch(query);
    // Clearing fields for new serch object
    serchView.clearFileds();
    serchView.clearResult();
    // Redering the loader before results come
    renderloader(elements.serchResult)
    // Awaiting for the results
    await state.serch.getResults();
    // Removing the loader before the data comes from API
      clearLoader();
    // Rendering it to the UI
    serchView.renderResults(state.serch.recipe);

  }
}
// Serching for the recipe
elements.serchForm.addEventListener('click',(e)=>{
  e.preventDefault();
  controlSerch();

});


// USING EVENT DELGATION TO TARGET THE BUTTON AND SEND ITS NUMBER AS PARAMETER
elements.serchResPages.addEventListener('click',e=>{
  const btn=e.target.closest('.btn-inline');
  if (btn){
    const goToPage=parseInt(btn.dataset.goto,10);
      serchView.clearResult();
    serchView.renderResults(state.serch.recipe,goToPage)
    // console.log(goToPage);

  }
});


/*Recipe Controller*/
const controlRecipe=async ()=>{
  const id=window.location.hash.replace('#','');
  // console.log(id)
  if (id){
    recipeView.clearRecipe()
    renderloader(elements.recipe);
    if(state.recipe) recipeView.highSelector(id)
    state.recipe=new Recipe(id);
    try {
      await state.recipe.getRecipe();
      // console.log(state.recipe.ingredients)

      state.recipe.parseIngredients();
      state.recipe.calTime();
      state.recipe.calServing();
      clearLoader();
      recipeView.recipeRender(state.recipe,
      state.likes.islike(id))

      // console.log(state.recipe)
    } catch (e) {
      console.log(e)
      alert('Somethig went wrong with server');
    }




  }
}
/* List controller */
const controlList=()=>{
  if(!state.list) state.list=new List();
  state.recipe.ingredients.forEach(el=>{
       const item=state.list.additem(el.count,el.unit,el.ingredient);
       listView.renderItem(item);
    });
}
// Handels DELETE ITEM AND UPDATE FROM SHOPPING LIST
elements.shopping.addEventListener('click',e=>{
  const id=e.target.closest('.shopping__item').dataset.itemid;
  // HANDLE DELETE EVENT
  if (e.target.matches('.shopping__delete,.shopping__delete *')) {
      state.list.delitem(id);
      listView.deleteItem(id);
  }
  // HANDLE UPDATE EVENT
  else if (e.target.matches('.shopping__count--value')) {
    const val=parseFloat(e.target.value,10);
if (val>0){
  state.list.updateCount(id,val);

  }
}
});

// RELOAD LIKE RECIPE
window.addEventListener('load',()=>{
  state.likes= new Like();
  state.likes.readStorage();
  // toggle the like menu
  likeView.toggleLkemenu(state.likes.getNumlikes());
  // redering the existing like
  state.likes.likes.forEach(like1=>likeView.renderLike(like1));

});

/*LIKE CONTROLLER*/
  state.likes= new Like();
  likeView.toggleLkemenu(state.likes.getNumlikes());

const controlLike=()=>{
  if(!state.likes) state.likes= new Like()
  const currentID=state.recipe.id;

  // when user has not like it
  if(!state.likes.islike(currentID)){
    const newLike=state.likes.addlike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );
    // Toggeling the like button
    likeView.toggleLikebtn(true)
    likeView.renderLike(newLike);
    // console.log(state.likes);
  }else {
    state.likes.delLike(currentID)
    // toggeling like button
    likeView.toggleLikebtn(false)
    likeView.deleteLike(currentID);

    // console.log(state.likes)
  }
  likeView.toggleLkemenu(state.likes.getNumlikes());
}



// LOADS ITEM WHEN ID IS IN WINDOW
['hashchange','load'].forEach(e=>window.addEventListener(e,controlRecipe));
// DECREASE OR INCREASE SERVING
elements.recipe.addEventListener('click',e=>{
  if(e.target.matches('.btn-decrease, .btn-decrease *')){
    if (state.recipe.servings>1){
      state.recipe.updateServing('dec');
      recipeView.updateServingsIngredient(state.recipe);
    }
  }
  else if(e.target.matches('.btn-increase, .btn-increase *')){
    state.recipe.updateServing('inc');
    recipeView.updateServingsIngredient(state.recipe);
  }
  else if (e.target.matches('.recipe__btn--add,.recipe__btn--add *')) {
    // Adding to shopping list
    controlList();
  }
  else if (e.target.matches('.recipe__love,.recipe__love *')) {
    // Like Controller
    controlLike();
  }
  // console.log(state.recipe);
});
