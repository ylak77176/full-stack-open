const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const { title } = require('node:process')
const { log } = require('node:console')
const api = supertest(app)




beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 2)

})

test('a specific author is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const author = response.body.map(e => e.author)
  assert(author.includes('String'))
})

test('a valid blog can be added ', async () => {
  const newBlog ={
    title: 'String',
    author: 'String',
    url: 'String',
    likes: 12345,

  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  const author = blogsAtEnd.map(n => n.author)

  assert(author.includes('String'))
})

test('blog without url, author or title is not added', async () => {
  const newBlog = {
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('blog posts have an id property', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    assert('id' in blog)
  })
})
test('blog posts likes default to 0', async () => {
  const newBlog = {     
    title: 'noLikes',
    author: 'String',
    url: 'String',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)

  assert.strictEqual(response.body.likes, 0)
})


describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const contents = blogsAtEnd.map((n) => n.content)

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })
})
describe('save change of a blog', () => {
  test('succeeds with status valid likes value change', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const blogToChange = blogsAtStart[0]

    const newBlog = {     
    title: 'noLikes',
    author: 'String',
    url: 'String',
    likes: 9999,
    }

    await api
        .put(`/api/blogs/${blogToChange.id}`)
        .send(newBlog)
        .expect(200)

    const getBlog = await api.get(`/api/blogs/${blogToChange.id}`)

    assert.strictEqual(getBlog.body.likes, 9999)
  })
})

after(async () => {
  await mongoose.connection.close()
})