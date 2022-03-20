'use strict'
const gridContainer = document.getElementById('grid-container');
const start = document.getElementById('start');
const results = document.getElementById('results');
const sessionRounds = 25;
const varietyCount = 3;
let currentRounds = 0;
let advertList;
// varietyCount <= adArray.length is REQUIRED or else getRandom() goes infinite
function Ad(name, imagePath) {
  this.name = name;
  this.imagePath = imagePath;
  this.viewCount = 0;
  this.clickCount = 0;
};
let adArray = [
  new Ad('Bag', "img/bag.jpg"),
  new Ad('Banana', "img/banana.jpg"),
  new Ad('Bathroom', "img/bathroom.jpg"),
  new Ad('Boots',"img/boots.jpg"),
  new Ad('Breakfast', "img/breakfast.jpg"),
  new Ad('Bubblegum', "img/bubblegum.jpg"),
  new Ad('Chair', "img/chair.jpg"),
  new Ad('Cthulu',"img/cthulu.jpg"),
  new Ad('Dog Duck', "img/dog-duck.jpg"),
  new Ad('Dragon', "img/dragon.jpg"),
  new Ad('Pen', "img/pen.jpg"),
  new Ad('Pet Sweep', "img/pet-sweep.jpg"),
  new Ad('Scissors', "img/scissors.jpg"),
  new Ad('Shark',"img/shark.jpg"),
  new Ad('Sweep', "img/sweep.png"),
  new Ad('Tauntaun', "img/tauntaun.jpg"),
  new Ad('Unicorn',"img/unicorn.jpg"),
  new Ad('Water Can',"img/water-can.jpg"),
  new Ad('Wine Glass', "img/wine-glass.jpg"),
  new Ad('Coconut', "img/coconut.jpg"),
  new Ad('Rail Tiger', "img/railtiger.png"),
]
// DONE need an RNG function to determine products used and incriment viewCount
// an event listener that incriments clickCount 
// a for loop that runs the voting session a number of times
// a button that begins the test(?)
// add a view results button.
// table for results screen?
// 
Ad.prototype.getRandom = function() {
  let selectionCheck = [];
  let selectionHold;
  for(let i = 0; i < varietyCount; i++) {
   selectionHold = Math.floor(Math.random() * adArray.length);
    if(selectionCheck.includes(selectionHold)){
      i--;
    } else {
      selectionCheck.push(selectionHold);
    }
  }
  return selectionCheck;
}
Ad.prototype.render = function() {
  while(gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  };
  let imageSet = this.getRandom();
  advertList = imageSet;
  console.log(imageSet);
  for(let i = 0; i < imageSet.length; i++){
    let gridItem = document.createElement('img');
    gridItem.src = adArray[imageSet[i]].imagePath;
    gridItem.id = `${adArray[imageSet[i]].name}`
    gridContainer.appendChild(gridItem);
    adArray[imageSet[i]].viewCount++;
  }
}
// Ad.prototype.clickyEvent = function(clicky) {
//   for(let j = 0; j < adArray.length; j++){
//     if(clicky === adArray[advertList[j]].name){
//       adArray[advertList[j]].clickCount++;
//     }
//   }
// }
 start.addEventListener('click', function (eventStart) {
   eventStart.preventDefault();
   start.textContent = 'Next set!';
   currentRounds++;
   console.log(currentRounds);
   console.log('Starting', eventStart);
   Ad.prototype.render();
 });
 results.addEventListener('click', function (eventResults){
   eventResults.preventDefault();
   if(currentRounds >= sessionRounds){
     results.textContent = 'Refresh results';
     console.log('Show results'); // print a table of the results here
   } else {
     console.log('Not enough sessions');
   }
 });
 gridContainer.addEventListener('click',function (eventAdClick){
   eventAdClick.preventDefault();
   let clicky = eventAdClick.target.id
   for(let i = 0; i < advertList.length; i++){
     if(clicky === adArray[advertList[i]].name){
       for(let j = 0; j < adArray.length; j++){
         if(clicky === adArray[j].name) {
           adArray[j].clickCount++;
           console.log(adArray[j].clickCount, 'Yo');
         }
       }
     }
    }
 });