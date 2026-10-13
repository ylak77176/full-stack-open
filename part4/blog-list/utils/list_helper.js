var _ = require('lodash');

const blog = require("../models/blog")

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

const mostBlogs = (blogs) =>{
  if (blogs.length === 0) { return "none"}
  const counts = _.countBy(blogs, 'author')
  const blog = _.maxBy(blogs, (blog) => counts[blog.author])

  const result = {author: blog.author, blogs: counts[blog.author]}

  return result
  
}

module.exports = {
  dummy, totalLikes, favBlog, mostBlogs
}


const blogs = [  
   
]
    
console.log(mostBlogs(blogs));


