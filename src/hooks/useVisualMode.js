import { useState } from 'react';

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]); // we are initializing our history as an array with the first mode that gets passed to useVisualMode


    function transition(mode, replace = false) {
        if (replace) {
            // Replace the current mode in the history array
            setHistory(prev => [...prev.slice(0, -1), mode]);
        } else {
            // Add the new mode to the history array
            setHistory(prev => [...prev, mode]);
        }
        setMode(mode);
    }


    function back() {
        // Ensure that the back function won't allow us to go past the initial mode
        // If the length is greater than 1, you can safely go back
        if (history.length > 1) {
            const newHistory = history.slice(0, -1);
            setHistory(newHistory);
            setMode(newHistory[newHistory.length - 1]);
        }
    }
    return { mode, transition, back };
}