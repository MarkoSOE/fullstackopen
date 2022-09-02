import { useState } from "react";

const Title = (props) => (
  <div>
    <h1>{props.text}</h1>
  </div>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  if(props.text === "positive"){
    return (
      <div>
        {props.text} {props.value} %
      </div>
    )
  }
  return(
    <div>
      {props.text} {props.value}
    </div>
    )
  }
const Statistics = (props) => {
  if(props.all === 0){
    return(
      <div>
        No feedback given
      </div>
    )
  }

  return(
    <div>
      <StatisticLine text={"good"} value={props.goodvalue}/>
      <StatisticLine text={"neutral"} value={props.neutralvalue}/>
      <StatisticLine text={"bad"} value={props.badvalue}/>
      <StatisticLine text={"average"} value={(props.goodvalue - props.badvalue)/(props.goodvalue + props.badvalue + props.neutralvalue)}/>
      <StatisticLine text={"positive"} value={props.goodvalue/(props.goodvalue + props.badvalue + props.neutralvalue)}/>
    </div>
  )
}


const App = () => {
  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad,setBad] = useState(0)

  //create a function that increases the count of the button click by one
  const increaseValueGood = () => {
    setGood(good + 1 )
  }
  const increaseValueNetural = () => {
    setNeutral(neutral + 1 )
  }
  const increaseValueBad = () => {
    setBad(bad + 1 )
  }

  return (
    <div>
      <Title text="Give Feedback" />
      <Button handleClick={increaseValueGood} text = "good" />
      <Button handleClick={increaseValueNetural} text = "Neutral" />
      <Button handleClick={increaseValueBad} text = "Bad" />
      <Title text='Statistics'/>
      <Statistics goodvalue={good} neutralvalue={neutral} badvalue={bad} all ={good+bad+neutral}/>
    </div>
  )
}

export default App;
