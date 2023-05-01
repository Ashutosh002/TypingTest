import React from "react"


export default function App() {

    const START_TIME = 60
    
    const [textArea, setTextArea] = React.useState("")
    const [timeRemaining, setTimeRemaining] = React.useState(START_TIME)
    const [gameStatus, setGameStatus] = React.useState(false)
    const [wordCount, setWordCount] = React.useState()
    const [wpm, setWpm] = React.useState()


    React.useEffect(() => {
        // console.log('effect')
        // console.log(timeRemaining)
        // console.log(gameStatus)
        if (gameStatus && timeRemaining > 0) {
          const timeoutID = setTimeout(() => setTimeRemaining((time) => --time), 1000)
          // console.log('timeout scheduled')
          return () => clearTimeout(timeoutID) 
          
          //! This RETURN statment stores the callback function and whenever the dependency updates/component unmounts; it removes the clearTimeout, which 
          //! helps timeout that was scheduled just before we hit reset.
      }    
        else if(timeRemaining === 0){
          setGameStatus(false);
          setWordCount(textArea.split(" ").filter((word) => word !== "").length)
      }
    }, [timeRemaining, gameStatus])

    React.useEffect(() => {
        let words = textArea.split(" ").filter((word) => word !== "").length
        let elapsedTime = START_TIME - timeRemaining
        let wordPerMinute = Math.floor(words/elapsedTime*60)
  
        setWpm(wordPerMinute)
    }, [timeRemaining])


    function handleTextAreaChange(event){
      setTextArea(event.target.value)
    }

    function startGame(){
      if(gameStatus == false && timeRemaining === 0){
          setTextArea("")
          setGameStatus(true)
          setTimeRemaining(START_TIME)
          setWordCount();
      } else if(gameStatus == false){
          setGameStatus(true)
      }

    }

    function resetGame(){
      setTextArea("")
      setGameStatus(false)
      setTimeRemaining(START_TIME)
      setWordCount();

    }

    return (
        <div>
            <h1>How fast do you type?</h1>
            {gameStatus == false 
              ?
                <div className="block--div">
                  <h1 className="block--div--h1">Click the START button to begin typing...</h1>
                </div>
              :   
                <textarea 
                onChange={handleTextAreaChange}
                name="textarea"
                type="text"
                value={textArea}
                disabled={gameStatus == false ? true : false}
            />}
            <h4>Time reminaing: {timeRemaining} sec.</h4>
            {gameStatus ? <h1>WPM: {wpm ? wpm : 0}</h1> : <button onClick={startGame}>Start</button>}
            <br/>
            <button onClick={resetGame} >Reset</button>
            <h1>{timeRemaining === 0 ? 'Word Count: ' : null}  {wordCount}</h1>
        </div>
    )
}


