import { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [exercises, setExercises] = useState(null)

  useEffect(() => {
    fetch('/exercises')
      .then(res => {
        return res.json()
      })
      .then((data) => {
        setExercises(data)
      })
  }, [])

  return (
    <div className="App">
      <h1>List of Exercises</h1>
      { exercises 
        ? exercises.map((exercise, index) => (
          <h2 key={index}>{exercise.description}</h2>
        ))
        : 'Loading ...'
      }
    </div>
  );
}

export default App;
