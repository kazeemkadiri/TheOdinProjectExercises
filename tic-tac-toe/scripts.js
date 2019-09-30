const gameBoard = (() => {
  const gameBoxes = document.querySelectorAll(".game-play-box");
  
  
  const handleGameBoxClicked = ({target}) => {
    
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
