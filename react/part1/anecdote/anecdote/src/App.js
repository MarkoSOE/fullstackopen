import { useState } from "react";

const Button = ({handleClick, text}) => (
	<button onClick={handleClick}>
		{text}
	</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

//   initialize an array of zeros and adds state to the variable points and setPoints 
  const [points,setPoints] = useState(Array(anecdotes.length).fill(0))

//   initialize variables and assign an initial value of state which is zero
  const [selected, setSelected] = useState(0)

//   function that picks a random number between two numbers
  function pickrandomNumber() {
    return Math.round(Math.random() * (anecdotes.length-1 - 0) + 0)
  }

//   event handler that creates a copy of the zero filled points array
  const increaseVote = () => {
	const pointscopy = [...points]
	// increment the value of the coppied array at the index of the currently selected anedote by one
	pointscopy[selected] += 1
	// the points array's state is then updated using the setpoints function, passing in the newly incrememnted pointscopy array 
	setPoints(pointscopy)

 }

//  function that finds the index of the highest value in an array
 const findhighestvalue = (arr) => {
	let max = arr[0]
	let maxIndex = 0;
	for(let i = 0; i < arr.length; i ++){
		if(arr[i] > max){
			max = arr[i]
			maxIndex = i
		}
	}
	return maxIndex
 }

//   an event handler function that changes the selected variable to a random number using the setSelected variable that would modify the state of the selected variable, in turn
  const handleClick = () => {
	setSelected(pickrandomNumber())
  }
  return(
    <div>
		<h1>anecdote of the day</h1>
		{/* //display the anecdotes array at a random index */}
		<p>{anecdotes[selected]}</p>
		{/* //button to increment the vote count of the currently selected anecdote : anecdotes[selected] */}
		<Button text="vote" handleClick={increaseVote} />
		{/* //button to randomly select the next anecdote */}
      	<Button text="next anecdote" handleClick={handleClick}/>
		<h1>anecdote with the most votes</h1>
		{/* //finding the index of the highest value of the points array and displaying the corresponding anecdote */}
		<p>{anecdotes[findhighestvalue(points)]}</p>
    </div>
  )
}

export default App