;(function () {

// --------------------model--------------------------------------

//creates a new Die object
function Die(){
  this.view = new Die.View
}

//creates a prototype roll function that renders the results of a  random number between 1 and 6 and returns the roll results to the view
Die.prototype.roll = function(){
    var rollResults = Math.floor((Math.random()*this.NUMBER_OF_SIDES)+1)
    this.view.render(rollResults);
    return rollResults
}

//sets a prototype to each die instant created to have a constant number of sides set to 6
Die.prototype.NUMBER_OF_SIDES = 6


Die.View = function () {
  //when the die object is created, each new instance of the die is appended to the view
  
  //this adds a new div element with a class name of die and an initial text of 0 to indicate that the new die has not been rolled yet
  var $el = $('<div>').addClass(this.className).text(0);


  //i'm not exactly sure what this does but if it is deleted the new die instances will not show up on the DOM
  $el.appendTo(this.getContainer());
  this.$el = $el;
}

//this sets the className to each die object appeneded to the dom as 'die'. this is added on line 25
Die.View.prototype.className = 'die';


//the getContainer function returns an array of all the current dice objects that are on the dom.  this is obtained by a jquery function that searched for all the div elements with the class name 'dice'
Die.View.prototype.getContainer = function () {
  return $('.dice')
}

//the render function on Die.View sets the text of the Die to show the roll results
Die.View.prototype.render = function(rollResults) {
  // set the text of the element to be rollResults
  this.$el.text(rollResults)
}


//there also has to be a Game object created.  the game object is the array that contains all of the die that are created
function Game(){
  this.totalDice = []
}

//since the Game object is an array, there has to be a way to push all of the die object into the array.  The addDie function on the game pushes new Die objects in the the game array
Game.prototype.addDie = function(){
  //a new Die instance is created and pushed into the array when the addDie function is called
  this.totalDice.push(new Die);
}


//a rollAddDice function is called by iterating through each of the die objects that is within the Game array and calling the roll function individually on each iteration to ensure a random number for each div
Game.prototype.rollAllDice = function(){
  for(var index = 0; index < this.totalDice.length; index++){
    var die = this.totalDice[index].roll()
  }
}

// --------------------model---------------------------------------


// --------------------controller---------------------------------------

//refered to Dealer as the controller


// a Dealer object is made that has a game and display property.  The display is set to the View object that was earlier defined in the model and the game model is defined as the Game object
function Dealer(game, view){
  this.game = game
  this.display = view
}


// the dealer has a function addNewDice which calls upon the addDie function previously defined.  This causes a new die to appear on the DOM
Dealer.prototype.addNewDice = function(){
  game.addDie();
}


// the dealer also rolls all the die on the screen.  this is function that calls on the game object that holds all the die and calls the rollDie function which rolls all the die inside of the game array
Dealer.prototype.rollGame = function(){
  game.rollAllDice();
}


//a new game instance and dealer instance have to be instantiated
var game = new Game;
var dealer = new Dealer(game);


// the controller also has to have event listeners to the buttons that actually appear on the view.  These event listeners bind the addNewDice function and rollGame button when the user clicks these buttons. 
var Controller = {
  init: function () {
    this.bindListeners();
  },

  bindListeners: function () {

    $(".add").on("click", dealer.addNewDice);
//the commands must be put in the format dealer.AddNewDice and dealter.rollGame since these are functions from the dealer prototype
    $(".roll").on("click", dealer.rollGame);

  }

}
$(function () {
  Controller.init();
});

// --------------------controller---------------------------------------

// --------------------view---------------------------------------

//create a View object. 
//i need to do more research why this was created this way
function View(){
  this.die_class_name = 'die'
  this.dice_container_name = '.dice'
  this.diceContainer = $(this.dice_container_name)
}





// --------------------view---------------------------------------

})()