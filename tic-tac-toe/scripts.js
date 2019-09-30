const gameBoard = (() => {
  const gameBoxes = document.querySelectorAll(".game-play-box");
  
  
  const handleGameBoxClicked = (event) => {
    
    alert(event.target.dataset.boxId);
    
  }
  
  const documentLog = (logString) => {
  	
    const p = document.createElement("p");
    
    p.textContent = target.dataset.boxId;
    document.querySelector("body")
    .appendChild(logString);
    
  }
						
  gameBoxes.forEach(gameBox => {
    gameBox.addEventListener("click", handleGameBoxClicked);
  });

})();

//Factory function for players
const Player = (name, marker) => {
  this.name = name;
  this.marker = marker;
  
  this.getName = () => this.name;
  this.getMarker = () => this.marker;
  
  return {
    getName,
    getMarker
  }
}

//const player1 = Player("Qasim", "X");
//const player2 = Player("Jalasem", "O");

