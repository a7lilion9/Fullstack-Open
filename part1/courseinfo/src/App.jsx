const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />

      <Content part1={part1} part2={part2} part3={part3} />

      <Total ex1={part1.exercises} ex2={part2.exercises}
        ex3={part3.exercises} />
    </div>
  )
}

const Header = (props) => {
  console.log('Header:', props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log('Content:', props)
  return (
    <div>
      <Part part={props.part1.name} exercise={props.part1.exercises} />
      <Part part={props.part2.name} exercise={props.part2.exercises} />
      <Part part={props.part3.name} exercise={props.part3.exercises} />
    </div>
  )
}

const Total = (props) => {
  console.log('Total:', props)
  return (
    <div>
      <p>Number of exercises {props.ex1 + props.ex2 + props.ex3}</p>
    </div>
  )
}

const Part = (props) => {
  console.log('Part:', props)
  return (
    <div>
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}

export default App