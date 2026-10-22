const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'String',
    author: 'String',
    url: 'String',
    likes: 12345,
  },
  {
    title: 'yelow',
    author: 'monkey',
    url: 'String',
    likes: 25,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({     
    title: 'String',
    author: 'String',
    url: 'String',
    likes: 12345, })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}