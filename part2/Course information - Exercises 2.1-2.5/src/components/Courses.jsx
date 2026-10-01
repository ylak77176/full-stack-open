
const Courses = ({courses}) => {
return (
  <>
    {courses.map(course => 
      <Course key={course.id} course={course} />
    )}
  </>
)
}

const Course = ({course}) => {
  const parts = course.parts
  const partsSum = parts.reduce((sum, part) => sum + part.exercises, 0)


  return(
    <div>
      <h1>{course.name}</h1>
      {parts.map(part =>
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      )}
      <b>total of {partsSum} exercices</b>
    </div>
  )
}
