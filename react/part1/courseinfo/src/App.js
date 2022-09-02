import { useState } from "react"


// const App = () => {
//   const course = 'Half Stack application development'
//   const part1 = 'Fundamentals of React'
//   const exercises1 = 10
//   const part2 = 'Using props to pass data'
//   const exercises2 = 7
//   const part3 = 'State of a component'
//   const exercises3 =14

//   return(
//     <div>
//       <Header course={course} />
//       <Content/>
//       <Total exercises1={exercises1} exercises2 = {exercises2} exercises3={exercises3}/>
//     </div>
//   )
// }

// const Header = (props) => {
//   return (
//     <>
//       <h1> {props.course} </h1>
//     </>
//   )
// }

// const Content = (props) => {
//   const part1 = 'Fundamentals of React'
//   const exercises1 = 10
//   const part2 = 'Using props to pass data'
//   const exercises2 = 7
//   const part3 = 'State of a component'
//   const exercises3 =14
//   return (  
//     <div>
//       <Part1 part1={part1} exercises1={exercises1}/>
//       <Part2 part2={part2} exercises2={exercises2}/>
//       <Part3 part3={part3} exercises3={exercises3}/>
//     </div>
//   )
// }

// const Part1 = (props) => {
//   return (
//     <p>
//       {props.part1} {props.exercises1}
//     </p>
//   )
// }
// const Part2 = (props) => {
//   return (
//     <p>
//       {props.part2} {props.exercises2}
//     </p>
//   )
// }
// const Part3 = (props) => {
//   return (
//     <p>
//       {props.part3} {props.exercises3}
//     </p>
//   )
// }


// const Total = (props) => {
//   return (
//     <>
//       <p> Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
//     </>
//   )
// }

// export default App;


//------------------------------------------Page Re-rendering------------------------------------------

// const App = (props) => {
//   const {counter} = props
//   return(
//     <div>{counter}</div>
//   )
// }

// export default App


// ------------------------------------------//Stateful component------------------------------------------

// //the file imports the useState function
// import { useState } from "react";

// const App = () => {
//   //the function body that defines the component begins with the function call:
//   const [counter, setCounter] = useState(0)

//   // the function call adds state to the component and renders it initialized with the value of zero.
//   //the function returns an array that contains two items. We assign the items to the variables 
//   //counter and setCounter by using the destructuring assignment syntax shown earlier

//   //the counter variable is assigned the initial value of state which is zero. The variable setCounter
//   //is assigned to a function that will be used to modify the state

//   //the applications calls the setTimeout function and passes it two parameters: a function to increment 
//   //the counter state and a timeout of one second
//   setTimeout(
//     () => setCounter(counter + 1),
//     1000
//   )

//   //the function passed as the first parameter to the setTimeout function is invoked one second after calling 
//   //the setTimeout function
//   return(
//     <div>{counter}</div>
//   )
// }

// export default App


//------------------------------------------Event Handling/------------------------------------------

// import { useState } from "react"

// const App = () => {
//   const [counter, setCounter] = useState(0)
//   const increaseByOne = () => setCounter(counter + 1)
//   const setToZero = () => setCounter(0)
//   return(
//     <div>
//       <div>
//         {counter}
//       </div>
//       <button onClick={increaseByOne}> Plus </button>
//       <button onClick={setToZero}> Zero </button>
//       {/* //the event handler function can be defined directly in the value assignment of the onClick-attribute */}
//       {/* <button onClick={()=> setCounter(counter + 1)}> plus </button> */}
//       {/* The below line will result in constant rerendering of the component, causing the application to break */}
//       {/* <button onClick={setCounter(counter + 1)}> plus </button> */}
//       {/* <button onClick={()=> setCounter(0)}> Zero </button> */}
//     </div>
//   )
// }

// export default App

//---------------------------------Passing State to child components------------------
// const Display = ({counter}) => <div>{counter}</div>

// const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

// const App = () => {
//   const [ counter, setCounter ] = useState(0)
//   const increaseByOne = () => setCounter(counter + 1)
//   const decreaseByOne = () => setCounter(counter - 1)
//   const setToZero = () => setCounter(0)

//   return (
//     <div>
//       <Display counter={counter}/>
//       <Button onClick={increaseByOne} text="Plus" />
//       <Button onClick={decreaseByOne} text="Minus" />
//       <Button onClick={setToZero} text="Zero" />
//     </div>
//   )
// }

// export default App

//-----------------------------------Handling Arrays-----------------
// import { useState } from "react"

// const App = () =>{
//   const[left,setLeft] = useState(0)
//   const[right,setRight] = useState(0)
//   const[allClicks, setAll] = useState([])

//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'))
//     setLeft(left + 1)
//   }

//   const handleRightClick = () => {
//     setAll(allClicks.concat('R'))
//     setRight(right + 1)
//   }

//   return(
//     <div>
//       {left}
//       <button onClick={handleLeftClick}>left</button>
//       <button onClick={handleRightClick}>right</button>
//       {right}
//       <p>{allClicks.join (' ')}</p>
//     </div>
//   )
// }

// export default App


//----------------------------------Conditional Rendering -----------------------

// import { useState } from "react"

// const History = (props) => {
//   if(props.allClicks.length === 0){
//     return( 
//       <div>
//         the app is used by pressing the buttons
//       </div>
//     )
//   }
//   return(
//     <div>
//       button press history: {props.allClicks.join('')}
//     </div>
//   )
// }

// const Button = ({handleClick, text}) => (
//   <button onClick={handleClick}>
//     {text}
//   </button>
// )


// const App = () =>{
//   const[left,setLeft] = useState(0)
//   const[right,setRight] = useState(0)
//   const[allClicks, setAll] = useState([])

//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'))
//     setLeft(left + 1)
//   }

//   const handleRightClick = () => {
//     setAll(allClicks.concat('R'))
//     setRight(right + 1)
//   }

//   return(
//     <div>
//       {left}
//       <Button handleClick={handleLeftClick} text='left' />
//       <Button handleClick={handleRightClick} text='right' />
//       {right}
//       <History allClicks={allClicks} />
//     </div>
//   )
// }

// export default App

//------------------------------------------Do Not define components within Components-----------------------------

// const Button = (props) => (
//   <button onClick={props.handleClick}>
//     {props.text}
//   </button>
// )

// const App = () => {
//   const [value,setValue] = useState(10)

//   const setToValue = newValue =>{
//     console.log('value now', newValue)
//     setValue(newValue)
//   }


//   //do not define components inside another component
//   const Display = props => <div>{props.value}</div>

//   return (
//     <div>
//       <Display value={value} />
//       <Button handleClick={() => setToValue(1000)} text="thousand" />
//       <Button handleClick={() => setToValue(0)} text="reset" />
//       <Button handleClick={() => setToValue(value + 1)} text="increment" />

//     </div>
//   )
// }


//move the Display component function to its correct place, which is outside of the App component function: 


//the display component is now in its correct place
const Display = props => <div>{props.value}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = newValue => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}

export default App