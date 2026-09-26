import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>
        <p>{text}</p>
      </td>
      <td>
        <p>{value}</p>
      </td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const All = good + neutral + bad
  const Positive = good * 100 / All

  if (All === 0) {
    return (
      <div>
        no feedback given
      </div>
    )
  }
  return(  
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={All} />
        <StatisticLine text="average" value={All/3} />
        <StatisticLine text="positive" value={Positive} />
      </tbody>
      </table>
    </>
  )
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

 const handleGoodClick = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);

 }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);

 }
   const handleBadClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
 }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={handleGoodClick} text="good" />
        <Button onClick={handleNeutralClick} text="Neutral" />
        <Button onClick={handleBadClick} text="Bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}


export default App