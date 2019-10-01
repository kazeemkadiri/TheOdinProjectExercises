const gameBoard = (() => {
  const players = {};
  let activePlayer = null;
  const winPatterns = [
   [1,2,3],
   [4,5,6],
   [7,8,9],
   [1,5,9],
   [3,5,7],
   [1,4,7],
   [2,5,8],
   [3,6,9]
  ];
  
  const gameBoxes = document.querySelectorAll(".game-play-box");
  
  const handleGameBoxClicked = (event) => {
    
      let boxElement = event.target;
      
    //alert(event.target.dataset.boxId);    
       if(markGameBox(boxElement)){
       	  saveMarkedBox(boxElement.dataset.boxId);     
       //console.log(activePlayer.getMarkedBoxes().join("-"));
       if( activePlayer.getMarkedBoxes().length >= 3 
       	&& verifyWin() === true ){
       	//endGame();
       	//return;
       }
       
       toggleActivePlayer();
      
       }
     
  }
  
  const verifyWin = () => {
   const boxesMarked = activePlayer
     .getMarkedBoxes()
     .join("");
   
   return winPatterns.some( winPattern => {
   	  return winPattern.reduce((prev, number) => {
   	  	  return prev += boxesMarked.indexOf(number) !== -1 ? 1 : 0;
   	  }, 0) === 3 ;
   	  
   });
  }
  
  const saveMarkedBox = (boxId) => {
    
    activePlayer.storeMarkedBoxId(boxId);
    
  }
  
  const toggleActivePlayer = () => {
  	
  	  activePlayer = (players.player1 === activePlayer) ? players.player2 : players.player1;
  	  
 }
  
  const setActivePlayer = player => {
  	 activePlayer = player;
  }
  
  const markGameBox = boxElement => {
  	  const { textContent } = boxElement;
  	  
  	  if( textContent !== "" ) return false;
  	  
  	  boxElement.textContent = activePlayer.getMarker();
  	  
  	  return true;
  }
  
  const registerPlayers = (player1, player2) => {
  	
    players.player1 = player1;
    players.player2 = player2;
    
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
  	return markedBoxes;
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


