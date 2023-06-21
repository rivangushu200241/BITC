// const body=document.body;
// const div=document.createElement("div");
// div.innerHTML="hello word";
// body.append(div);
const tilesContainer = document.querySelector(".tiles");
const colors=["aqua","aquamarine","crimson","blue","dodgerblue","gold","greenyellow","teal"];
const colorsPickList=[...colors,...colors];///duplicate
const tileCount=colorsPickList.length;//need in loop
//3 variables wic indicate the current state of the game
let revealCount=0;
let activeTile=null;
let awaitingEndOfMove=false;//window 4 the nxt move

function buildTile(color){
    const element=document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("data-color",color);
    element.setAttribute("data-revealed","false");

    element.addEventListener("click",()=>{
        const revealed=element.getAttribute("data-revealed");

        if(awaitingEndOfMove ||revealed=="true"||element==activeTile){
            return;
        }
        element.style.backgroundColor=color;
        if(!activeTile){
            activeTile=element;
            return;
        }
        //logic
        const colorToMatch=activeTile.getAttribute("data-color");
        if(colorToMatch==color){
            activeTile.setAttribute("data-revealed","true");
            element.setAttribute("data-revealed","true");
            awaitingEndOfMove=false;
            activeTile=null;
            revealCount+=2;//we go use to see if game is complete.
            if(revealCount==tileCount){
                alert("You win! You are a Genius");
            }
            return;
        }
        //down here
        awaitingEndOfMove=true;
        setTimeout(()=>{
            element.style.backgroundColor=null;
            activeTile.style.backgroundColor=null;
            //set again
            awaitingEndOfMove=false;
            activeTile=null;
            
        },1000);
    });
    return element;
}
///build up tiles
for(let i=0;i<tileCount;i++){
    const randomIndex=Math.floor(Math.random()*colorsPickList.length);
    const color=colorsPickList[randomIndex];
    const tile=buildTile(color);
    colorsPickList.splice(randomIndex,1);//pick 1 color
    tilesContainer.appendChild(tile);
   
}