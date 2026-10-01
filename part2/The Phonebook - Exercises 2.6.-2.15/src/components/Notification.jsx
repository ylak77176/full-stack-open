const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="validation">
      {message}
    </div>
  )
}

export default Notification