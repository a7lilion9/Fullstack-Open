import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const avg = (good - bad) / all
  const positive = good / all * 100

  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={avg} />
          <StatisticLine text="positive" value={`${positive} %`} />
        </tbody>
      </table>
    </div>
  )
}

const Button = ({title, clickHandle}) => {
  return (
    <button onClick={clickHandle}>{title}</button>
  )
}

const Title = () => {
  return (
    <h1>give feedback</h1>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incGood = () => setGood(good + 1)
  const incNeutral = () => setNeutral(neutral + 1)
  const incBad = () => setBad(bad + 1)

  return (
    <div>
      <Title />
      <Button title='good' clickHandle={incGood} />
      <Button title='neutral' clickHandle={incNeutral} />
      <Button title='bad' clickHandle={incBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App