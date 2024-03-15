// The Course
const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
      </div>
    )
  }
  
  // The Header
  const Header = ({name}) => {
    return (
      <div>
        <h2>{name}</h2>
      </div>
    )
  }
  
  // The Content
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => <Part key={part.id} part={part} />)}
        <Total parts={parts} />
      </div>
    )
  }
  
  // The Part
  const Part = ({part}) => {
    return (
      <div>
        <p>{part.name} {part.exercises}</p>
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce((result, part) => result + part.exercises, 0)
  
    return (
      <div>
        <strong>total of {total} exercises</strong>
      </div>
    )
  }

  export default Course