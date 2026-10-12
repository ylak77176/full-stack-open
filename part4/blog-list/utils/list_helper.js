const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) =>{
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favBlog = (blogs) =>{

  if (blogs.length === 0) { return "none" }
  result = blogs.reduce((fav = blogs[0], blog) => {
    if (fav.likes < blog.likes) {return (fav = blog)
    } else{ return (fav)}
  })
  return result

}

module.exports = {
  dummy, totalLikes, favBlog
}
