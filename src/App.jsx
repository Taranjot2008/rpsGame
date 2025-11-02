import Header from './components/header'
import Choices from './components/choices'
import options from './components/svg'
import React from 'react'
import confetti from 'canvas-confetti'

export default function App() {

  const getComputerMove = () => {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex].url;
  }


  const [userChoice, setUserChoice] = React.useState(null);
  const [computerChoice, setComputerChoice] = React.useState(null);
  const [showcase, setShowcase] = React.useState(true);
  const [userCount, setUserCount] = React.useState(0);
  const [computerCount, setComputerCount] = React.useState(0);
  const buttonRef = React.useRef(null);
  
  const handleNewGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setWinner(null);
    setShowcase(true);
  };


  const handleselect = (selected) => {
    const userSelection = options.find(option => option.name === selected);
    setUserChoice(userSelection?.url);
    setComputerChoice(getComputerMove());
    setShowcase(false);
    console.log(`User selected: ${selected}`);
    console.log(`Computer selected: ${getComputerMove()}`);
  }
  
  const userPick = React.useMemo(() => {
    const userMatch = options.find(option => option.url === userChoice);
    return userMatch?.name || null;
  }, [userChoice]);


  const computerPick = React.useMemo(() => {
    const match = options.find(option => option.url === computerChoice);
    return match?.name || null;
  }, [computerChoice]);
  const [winner, setWinner] = React.useState(null);


  const gameFinished = winner !== null;

  React.useEffect(() => {

    const winMap ={
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper'
    }

    console.log(userPick, computerPick);

    let newWinner = null;

    if (!userPick || !computerPick) return;
    
    if (userPick === computerPick) {
      newWinner = 'draw';
    } else if (winMap[userPick] === computerPick) {
      newWinner = 'user';
    } else {
      newWinner = 'computer';
    }

    if (newWinner && newWinner !== winner) {
      setWinner(newWinner);
    }


    //console.log(draw ? "It's a draw!" : "");
    //console.log(userWin ? "User wins!" : computerWin ? "Computer wins!" : "No winner this time.");
  }, [userPick, computerPick, winner]);

  React.useEffect(() => {
    if (winner === null) return

    console.log(`The Winner is ${winner === 'draw' ? 'Its A Draw' : winner.toUpperCase()}`);
  }, [winner]);


  React.useEffect(() => {
    if (winner === 'user') {
      setUserCount(prevCount => prevCount + 1);
    }
    else if (winner === 'computer') {
      setComputerCount(prevCount => prevCount + 1);
    }
  }, [winner])

  React.useEffect(() => {
    if (gameFinished){  
      buttonRef.current.focus()
    }
  }, [gameFinished])

  const handleConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 20, spread: 300, ticks: 60, zIndex: 0 };
    const confettiColors = [
      '#FF3B3F', // Bright Red
      '#FF9F1C', // Vivid Orange
      '#2EC4B6', // Aqua Blue
      '#E6FF00', // Neon Yellow
      '#9B5DE5', // Electric Purple
      '#00F5D4', // Minty Cyan
      '#F15BB5', // Hot Pink
      '#00BBF9', // Sky Blue
      '#FEE440', // Sunny Yellow
      '#FF006E', // Magenta
      '#3A86FF', // Bright Royal Blue
      '#FB5607', // Tangy Orange
    ];

    const randomInRange = (max, min) => 
      Math.random() * (max - min) + min

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      //fireworks confetti canvas
      confetti({
        ...defaults,
        colors: confettiColors,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        colors: confettiColors,
        particleCount,
        origin: {x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)
  }

  return (    
    <main className="game-section flex flex-col items-center mb-8">
      <Header />

      <div className="count-container absolute top-10 right-10 font-medium font-(family-name:--status-text) text-2xl
      max-sm:right-25 max-sm:top-[270px] max-sm:font-bold max-sm:mt-2 max-sm:flex max-sm:gap-5">
        <p className="user-win">User: {userCount}</p>
        <p className="computer-win">Computer: {computerCount}</p>
      </div>

      {showcase && <Choices onselect={handleselect} />}

      {gameFinished && winner === 'user' && handleConfetti()}
      {gameFinished && winner === 'computer' && handleConfetti()}

      {gameFinished && <section className="game-status mt-8 w-1/3 rounded-lg py-8 px-2 bg-white
      max-sm:w-7/10 max-sm:py-4 max-sm:px-3 max-sm:mt-5">
        {winner === 'draw' && <p className='text-gray-600 text-center font-bold text-3xl font-(family-name:--status-text)
        max-sm:text-xl'>
          DRAW. Nobody Won. <span className="text-2xl">😞</span></p>}
        {winner === 'user' && <p className='text-green-600 text-center font-bold text-3xl font-(family-name:--status-text)
        max-sm:text-xl'>
          USER WINS! <span className="text-2xl">🎉</span></p>}
        {winner === 'computer' && <p className='text-red-600 text-center font-bold text-3xl font-(family-name:--status-text)
        max-sm:text-xl'>
          COMPUTER WINS! <span className="text-xl">💻🏆</span></p>}
      </section>}
          
      

      <section className="play-section flex justify-center gap-20 mt-15 max-sm:flex-col max-sm:items-center
      max-sm:gap-3 max-sm:mt-8 max-sm:rotate-180">
        <div className="user-section flex flex-col items-center gap-10 min-w-[190px] max-sm:gap-3
        max-sm:rotate-180">
          <div className="user-choice rotate-180 scale-y-[-1]">
            <img src={userChoice} alt="" className="w-40 aspect-square max-sm:w-30 max-sm:rotate-90" />
          </div>
          <h1 className="user-title text-white font-semibold text-4xl font-(family-name:--title-font) 
          max-sm:text-2xl">
            User
          </h1>
        </div>
        <h1 className="versus text-white font-semibold text-6xl font-(family-name:--title-font) mt-10 
        max-sm:text-xl max-sm:flex max-sm:items-center max-sm:mt-0 max-sm:rotate-180">Vs.</h1>
        <div className="computer-section flex flex-col items-center gap-10 min-w-[190px] max-sm:gap-3">
          <div className="computer-choice">
            <img src={computerChoice} alt="" className="w-40 aspect-square max-sm:w-30 max-sm:rotate-90" />
          </div>
          <h1 className="computer-title text-white font-semibold text-4xl font-(family-name:--title-font) 
          max-sm:text-2xl max-sm:scale-y-[-1] max-sm:scale-x-[-1]">
            Computer
          </h1>
        </div>
      </section>

      <button 
        onClick={handleNewGame}
        ref={buttonRef}
        className="newGame-btn bg-orange-500 flex justify-center text-2xl text-white transition-colors duration-300
        font-medium px-8 py-3 mt-6 rounded-full focus:outline-2 focus:outline-white focus:outline-offset-4 hover:cursor-pointer hover:bg-orange-600">
        Play Again
      </button>
      
    </main>
  )
}