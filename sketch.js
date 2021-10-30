
var dog, dogImg, dogImg1, database, foodS, foodStock;
var feed,  addFood, fedTime, lastFed, foodObj;
function preload()
{
	dogImg = loadImage("images/dogImg.png");
  dogImg1 = loadImage("images/dogImg1.png");

}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();
  foodStock = database.ref("Food")
  foodStock .on ("value",readStock);
  foodStock. set(20);
   
  dog = createSprite(250,350,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  foodObj=new Food()

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
   lastFed=data.val();
  });
}


function draw() {  
  background("green");
  foodObj.display();
  if(foodS!== undefined){
    textSize(20);
    fill(255);
    text("Note: Press UP ARROW to feed DRAGO milk", 50,50);
    text("Food Remaining: " +foodS, 150,150);
    

  drawSprites();
  }

}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  });
}

function readStock(data){
  foodS = data.val();
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(dogImg1);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
