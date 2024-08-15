import { useState } from 'react';

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]); // we are initializing our history as an array with the first mode that gets passed to useVisualMode


    function transition(newMode){
      setMode(newMode);
      setHistory(prev => [...prev, newMode]); // grab the previous version of the state
    }

    function back() { 
        setHistory(prev => [...prev.slice(0, prev.length - 1)]); 
       
        // Since setState is an asynchronous function, our setMode isn’t waiting for setHistory to finish. Therefore the history array that setMode is grabbing is an unmodified one.
        // setMode(history[history.length - 1]); 
     }

     // remove the last item from the stack, and then setMode with the last item in the array
   return { mode: history[history.length -1], transition, back };
  }