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

const mostLikes = (blogs) =>{

  // const uniqueAuthor = _.map(_.uniqBy(blogs, 'author'), (blog) => blog.author)

  // const result = _.pickBy( blogs, (blog) => blog["author"] == uniqueAuthor[0])
  const groups = _.groupBy(blogs, 'author')
  let maxSum = 0
  let result = {}
  for (author in groups){
    likesSum = _.sumBy(groups[author], 'likes')
    if (likesSum >= maxSum){
      maxSum = likesSum
      result = { 'author': author, likes: likesSum}
      }
    }
  return result
  
}


module.exports = {
  dummy, totalLikes, favBlog, mostBlogs, mostLikes
}


const blogs = [  
    {
      "_id": "6acb6ece610c724462f2bb13",
      "title": "String",
      "author": "String",
      "url": "String",
      "likes": 5,
      "__v": 0
    },
    {
      "_id": "6acbba65ffc2c75e23b9c39e",
      "title": "yolo",
      "author": "String",
      "url": "String",
      "likes": 6,
      "__v": 0
    },
      {
      "_id": "6acbba65ffc2c75e23b9c39e",
      "title": "yolo",
      "author": "bobo",
      "url": "String",
      "likes": 45,
      "__v": 0
    },      {
      "_id": "6acbba65ffc2c75e23b9c39e",
      "title": "yolo",
      "author": "cassos",
      "url": "String",
      "likes": 6,
      "__v": 0
    }]
    
console.log(mostLikes(blogs));


