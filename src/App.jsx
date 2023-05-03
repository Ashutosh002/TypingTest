import React, {useState, useEffect, useRef} from "react"


export default function App() {

    const START_TIME = 120
    
    const [textArea, setTextArea] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(START_TIME)
    const [gameStatus, setGameStatus] = useState(false)
    const [wordCount, setWordCount] = useState()
    const [wpm, setWpm] = useState()
    const inputRef = useRef(null)



    useEffect(() => {
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

    useEffect(() => {
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
          setGameStatus(true);
          setTimeRemaining(START_TIME)
          setWordCount();
          setTimeout(() => {
            inputRef.current.focus();
          }, 0);

      } else if(gameStatus == false){
          setGameStatus(true);
          setTimeout(() => {
            inputRef.current.focus();
          }, 0);
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
                  <h2 className="block--div--h1">Click the START button to begin typing...</h2>
                </div>
              :   
                <textarea 
                ref={inputRef}
                onChange={handleTextAreaChange}
                name="textarea"
                type="text"
                value={textArea}
            />}
            <h4>Time remaining: {timeRemaining} sec.</h4>
            {gameStatus ? <h1>WPM: {wpm ? wpm : 0}</h1> : <button onClick={startGame}>Start</button>}
            <br/>
            <button onClick={resetGame} >Reset</button>
            <h1>{timeRemaining === 0 ? 'You were able to type ' + wordCount + ' words in ' + START_TIME + ' sec.' : null} </h1>
            <h1>{timeRemaining === 0 ? 'WPM: ' + wpm : null} </h1>
        </div>
    )
}


