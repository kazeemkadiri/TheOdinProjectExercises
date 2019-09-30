const gameBoard = (() => {
  const players = {};
  let activePlayer = null;
  
  const gameBoxes = document.querySelectorAll(".game-play-box");
  
  const handleGameBoxClicked = (event) => {
    
      let boxElement = event.target;
      
    //alert(event.target.dataset.boxId);    
       markGameBox(boxElement);
       saveMarkedBox(boxElement.dataset.boxId);
     
  }
  
  const saveMarkedBox = (boxId) => {
    
    activePlayer.storeMarkedBoxId(boxId);
    
  }
  
  const setActivePlayer = player => {
  	 activePlayer = player;
  }
  
  const markGameBox = boxElement => {
  	  boxElement.textContent = activePlayer.getMarker();
  }
  
  const registerPlayers = (player1, player2) => {
  	
    this.players = { player1, player2 };
    
    setActivePlayer(player1);
    
  }
  
  //const documentLog = (logString) => {
  	
    //const p = document.createElement("p");
    
    //p.textContent = target.dataset.boxId;
    //document.querySelector("body")
    //.appendChild(logString);
    
//¹  }
						
  gameBoxes.forEach(gameBox => {
    gameBox.addEventListener("click", handleGameBoxClicked);
  });

  return {
  	 registerPlayers
  }
  
})();

//Factory function for players
const Player = (name, marker) => {
  const pName = name;
  const pMarker = marker;
  const markedBoxes = [];
  
  const getName = () => { return pName };
  const getMarker = () => { return pMarker };
  const storeMarkedBoxId = (boxId) => {
  	  markedBoxes.push(boxId);
  };
  const getMarkedBoxes = () => {
  	return markedBoxes.join("-");
  }
  
  return {
    getName,
    getMarker,
    storeMarkedBoxId,
    getMarkedBoxes
  }
}

const player1 = Player("Qasim", "X");
const player2 = Player("Jalasem", "O");

gameBoard.registerPlayers(player1, player2);


