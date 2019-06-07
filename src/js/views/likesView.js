import {elements} from './base';
import { limitRecipetitle } from './serchView'
export const toggleLikebtn=islikes=>{
  const iconString=islikes ? 'icon-heart':'icon-heart-outlined';
  // img/icons.svg#icon-heart-outlined
  document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${iconString}`);
}
export const toggleLkemenu=numLikes=>{
  elements.likesMenu.style.visibility=numLikes>0 ? 'visible':'hidden';
}
export const renderLike=like=>{
  const markup=`  <li>
        <a class="likes__link" href="${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitRecipetitle(like.title)}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>`
    elements.likesList.insertAdjacentHTML('beforeend',markup);
};

export const deleteLike=id=>{
  const el=document.querySelector(`.likes__link[href="${id}"]`).parentElement;
  if(el) el.parentElement.removeChild(el);
}
