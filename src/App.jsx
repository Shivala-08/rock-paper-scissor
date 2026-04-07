import { useState } from 'react'
import './App.css'

function App() {
  // Simple state variables for tracking game progress
  const [rounds, setRounds] = useState(0)
  const [playerWins, setPlayerWins] = useState(0)
  const [computerWins, setComputerWins] = useState(0)
  const [ties, setTies] = useState(0)
  const [streak, setStreak] = useState(0)
  const [history, setHistory] = useState([])
  const [message, setMessage] = useState('Pick your move to start!')
  const [lastResult, setLastResult] = useState(null) // 'win', 'lose', or 'tie'

  // Function to handle the game logic when a player clicks a button
  const playRound = (playerChoice) => {
    // 1. Generate computer choice (0 = rock, 1 = paper, 2 = scissors)
    const choices = ['rock', 'paper', 'scissors']
    const randomNumber = Math.floor(Math.random() * 3)
    const computerChoice = choices[randomNumber]

    // 2. Increase total rounds played
    setRounds(rounds + 1)

    // 3. Simple if-else logic to decide the winner
    let result = ''
    let roundMessage = ''

    if (playerChoice === computerChoice) {
      result = 'tie'
      roundMessage = `It's a tie! Both chose ${playerChoice}.`
      setTies(ties + 1)
      setStreak(0) // Reset streak on tie
    } else if (
      (playerChoice === 'rock' && computerChoice === 'scissors') ||
      (playerChoice === 'paper' && computerChoice === 'rock') ||
      (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
      result = 'win'
      roundMessage = `You WIN! ${playerChoice} beats ${computerChoice}.`
      setPlayerWins(playerWins + 1)
      setStreak(streak + 1) // Increase win streak
    } else {
      result = 'lose'
      roundMessage = `You LOSE! ${computerChoice} beats ${playerChoice}.`
      setComputerWins(computerWins + 1)
      setStreak(0) // Reset streak on loss
    }

    // 4. Update the display message
    setMessage(roundMessage)
    setLastResult(result)

    // 5. Add this round to the history list (at the top)
    const newHistoryItem = {
      id: rounds + 1,
      player: playerChoice,
      computer: computerChoice,
      outcome: result
    }
    setHistory([newHistoryItem, ...history])
  }

  // Reset the game to the very beginning
  const resetGame = () => {
    setRounds(0)
    setPlayerWins(0)
    setComputerWins(0)
    setTies(0)
    setStreak(0)
    setHistory([])
    setMessage('Pick your move to start!')
    setLastResult(null)
  }

  return (
    <div className="game-container">
      <header className="game-header">
        <h1>Rock Paper Scissors</h1>
        <p>Can you beat the computer?</p>
      </header>

      <div className="stats-bar">
        <div className="stat-item">
          <span>Rounds</span>
          <strong>{rounds}</strong>
        </div>
        <div className="stat-item">
          <span>Wins</span>
          <strong>{playerWins}</strong>
        </div>
        <div className="stat-item">
          <span>Losses</span>
          <strong>{computerWins}</strong>
        </div>
        <div className="stat-item">
          <span>Ties</span>
          <strong>{ties}</strong>
        </div>
        <div className="stat-item streak">
          <span>🔥 Streak</span>
          <strong>{streak}</strong>
        </div>
      </div>

      <div className={`message-container ${lastResult}`}>
        <p id="winner-message">{message}</p>
      </div>

      <main className="choices-section">
        <button onClick={() => playRound('rock')} className="choice-btn rock">🪨 Rock</button>
        <button onClick={() => playRound('paper')} className="choice-btn paper">📄 Paper</button>
        <button onClick={() => playRound('scissors')} className="choice-btn scissors">✂️ Scissors</button>
      </main>

      <div className="controls">
        <button onClick={resetGame} className="reset-btn">Reset Game</button>
      </div>

      <section className="history-section">
        <h2>Move History</h2>
        <div className="history-list">
          {history.length === 0 ? (
            <p className="empty-msg">No moves yet. Start playing!</p>
          ) : (
            history.map((item) => (
              <div key={item.id} className={`history-card ${item.outcome}`}>
                <span>#{item.id}</span>
                <span>{item.player} vs {item.computer}</span>
                <strong>{item.outcome.toUpperCase()}</strong>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default App
