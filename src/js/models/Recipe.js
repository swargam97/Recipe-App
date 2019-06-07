import axios from 'axios';

export default class Recipe{
  constructor(id){
    this.id=id;
  }
  async getRecipe(){
    const proxy='https://cors-anywhere.herokuapp.com/';
    const key='ac182d984ae79deed40210ced33f008e';
    try {
      const res=await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
      this.title=res.data.recipe.title;
      this.author=res.data.recipe.publisher;
      this.img=res.data.recipe.image_url;
      this.url=res.data.recipe.source_url;
      this.ingredients=res.data.recipe.ingredients;
    } catch (e) {
      alert('Something went wrong in the server');
    }
  }

  calTime(){
    // Assuming we need 15 minutes for each serving
    const numIng=this.ingredients.length;
    const peroids=Math.ceil(numIng/3);
    this.time=peroids*15;
  }

  calServing(){
    this.servings=4
  }
  parseIngredients(){
    const newIngredients=this.ingredients.map((el)=>{
      const unitsLong=['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
      const unitShort=['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
      const units=[...unitShort,'kg','g'];
      let ingredient=el.toLowerCase();
      unitsLong.forEach((unit,i)=>{
        ingredient=ingredient.replace(unit,unitShort[i])
      });
      ingredient=ingredient.replace(/ *\([^)]*\) */g, " ");
      const arrIng=ingredient.split(' ');
      const unitIndex=arrIng.findIndex(el2=>units.includes(el2));

      let objIng;
      if(unitIndex>-1){
        const arrCount=arrIng.slice(0,unitIndex);
        let count;
        if(arrCount.length === 1){
          count=eval(arrIng[0].replace('-','+'));
        }
        else {
          count=eval(arrIng.slice(0,unitIndex).join('+'));

        }
        objIng={
          count,
          unit:arrIng[unitIndex],
          ingredient:arrIng.slice(unitIndex+1).join(' ')

        }
      }else if (parseInt(arrIng[0],10)) {
           objIng={
             count:parseInt(arrIng[0],10),
             unit:'',
             ingredient:arrIng.slice(1).join(' ')
           }
      }
      else if (unitIndex === -1)
      {
        objIng={
          count:1,
          unit:'',
          ingredient
        }
      }
      return objIng;
    });
    this.ingredients=newIngredients

  }
  updateServing(type){
    const newServing=type==='dec' ? this.servings-1:this.servings+1;
    this.ingredients.forEach(ing=>{
      ing.count*=(newServing/this.servings);
    });
    this.servings=newServing;
  }

}
