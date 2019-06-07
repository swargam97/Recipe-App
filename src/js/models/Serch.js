import axios from 'axios';

export default class Serch{
  constructor(query){
    this.query=query;
  }
  async getResults(){
    const proxy='https://cors-anywhere.herokuapp.com/';
    const key='ac182d984ae79deed40210ced33f008e';
    try {
      const res=await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
       this.recipe=res.data.recipes;
      // console.log(this.recipe);
    } catch (e) {
      console.log(e)
    }

  }
}
