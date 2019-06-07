export default class Like{
  constructor(){
    this.likes=[];
  }

  addlike(id,title,author,img){
    const like={id,title,author,img};
    this.likes.push(like);
    this.persistData();
    return like
  }

  delLike(id){
    const index=this.likes.findIndex(el=>el.id===id);
    this.likes.splice(index,1);
    this.persistData();
  }

  islike(id){
    return this.likes.findIndex(el=>el.id===id) !==-1;
  }

  getNumlikes(){
    return this.likes.length;
  }

  persistData(){
    localStorage.setItem('likes',JSON.stringify(this.likes));
  }
  readStorage(){
    const storage=JSON.parse(localStorage.getItem('likes'));
    if (storage) this.likes=storage
  }
}
