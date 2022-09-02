const Course = ({course}) => {
  const exercisestotal = course.parts.reduce((sum,item) => item.exercises + sum, 0)
  return(
    <div>
      <h1>{course.name}</h1>
      <ul className="itemlist">
        {course.parts.map(course => <li key={course.id}>{course.name} {course.exercises}</li>)}
      </ul>
      <h2><strong>total of {exercisestotal}</strong></h2>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return(
    courses.map(course => <Course course={course} key={course.id}/>)
  )
}

export default App