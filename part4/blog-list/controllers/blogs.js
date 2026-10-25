const blogsRouter = require('express').Router()
const { isEmpty } = require('lodash')
const Blog = require('../models/blog')
const blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
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


blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  
  response.status(204).end()
})


blogsRouter.put('/:id', async (request, response) => {

  const old = await Blog.findById(request.params.id)

  if (!old) {
    return response.status(404).end()
  }

  const newBlog = old
  const { title, author, url, likes, id } = request.body

  newBlog.likes = likes

  const udpateBlog = await newBlog.save()
  response.json(udpateBlog)

})

module.exports = blogsRouter
