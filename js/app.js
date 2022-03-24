'use strict'
const gridContainer = document.getElementById('grid-container');
const start = document.getElementById('start');
const resultsButton = document.getElementById('resultsButton');
const resultsList = document.getElementById('results');
const sessionRounds = 25;
const varietyCount = 3;
let currentRounds = 0;
let advertList;
let lock = false;
// varietyCount <= adArray.length is REQUIRED or else getRandom() goes infinite
function Ad(name, imagePath) {
  this.name = name;
  this.imagePath = imagePath;
  this.viewCount = 0;
  this.clickCount = 0;
};
let adArray = [ // Repeat product names are NOT supported
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
 start.addEventListener('click', function (eventStart) {
   eventStart.preventDefault();
   start.remove();
   currentRounds++;
   console.log(currentRounds);
   console.log('Starting', eventStart);
   Ad.prototype.render();
 });
 resultsButton.addEventListener('click', function (eventResults){
   eventResults.preventDefault();
   if(currentRounds >= sessionRounds){
     resultsButton.remove();
     chartRender();
     lock = true;
     console.log('Show results'); // print a table of the results here
     for(let i = 0; i < adArray.length; i++) {
       let li = document.createElement('li');
       resultsList.appendChild(li);
       li.textContent = `${adArray[i].name}: ${adArray[i].viewCount} views, ${adArray[i].clickCount} clicks`;
     }
   } else {
     alert('Not enough sessions');
   }
 });
 gridContainer.addEventListener('click',function (eventAdClick){
   eventAdClick.preventDefault();
   if(lock === false && currentRounds <= sessionRounds){
   currentRounds++;
   let clicky = eventAdClick.target.id
   for(let i = 0; i < advertList.length; i++){
     if(clicky === adArray[advertList[i]].name){
       for(let j = 0; j < adArray.length; j++){
         if(clicky === adArray[j].name) {
           adArray[j].clickCount++;
           console.log(adArray[j].clickCount, adArray[j].name);
         }
       }
     }
    }
    Ad.prototype.render();
  }
 });
 function chartRender(){
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
  }