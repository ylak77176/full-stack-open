const blogsRouter = require('express').Router()
const { isEmpty } = require('lodash')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
 if (!body.title || !body.author || !body.url) {
    return response.status(400).json({ error: 'title, author or url missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)

})

module.exports = blogsRouter
