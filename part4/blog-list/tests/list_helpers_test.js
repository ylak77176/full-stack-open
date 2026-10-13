const { test, describe } = require('node:test')
const assert = require('node:assert')
var _ = require('lodash')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})


describe('total likes test', () => {
  test('Of empty list is 0', () => {
    const blogs =[]
    const result = listHelper.totalLikes(blogs)

    assert.strictEqual(result, 0)
  })
  test('One blog in list = this list numbers of likes', () => {
    const blogs =[  {
      "_id": "6acb6ece610c724462f2bb13",
      "title": "String",
      "author": "String",
      "url": "String",
      "likes": 5,
      "__v": 0
    },]
    const result = listHelper.totalLikes(blogs)

    assert.strictEqual(result, 5)
  })
  test('Big list is right ?', () => {
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]
    const result = listHelper.totalLikes(blogs)

    assert.strictEqual(result, 36)
  })
})

describe('Favorite Blog test', () => {
  test('most likes blogs is returned ?', () => {
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
    }]
  const result = listHelper.favBlog(blogs)

  assert.deepStrictEqual(result, blogs[1])
  })

  test('no blogs return ?', () => {
    const blogs = []
  const result = listHelper.favBlog(blogs)

  assert.deepStrictEqual(result, "none")
  })

  test('Big list is right ?', () => {
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]
    const result = listHelper.favBlog(blogs)

    assert.strictEqual(result, blogs[2])
  })
})


describe('MostBlogs', () => {
  test('return the good author?', () => {
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
      "likes": 6,
      "__v": 0
    }]
  const result = listHelper.mostBlogs(blogs)

  assert.deepEqual(result, ({author: 'String', blogs: 2 }))
  })

  test('empty blogs list ?', () => {
    const blogs = []
  const result = listHelper.mostBlogs(blogs)

  assert.deepEqual(result, "none")
  })

  test('empty big list result is good ?', () => {
  const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]
  const result = listHelper.mostBlogs(blogs)

  assert.deepEqual(result, ({author: 'Robert C. Martin', blogs: 3 }))
  })
})


describe('MostLikes', () => {
  test('return the good author?', () => {
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
      "likes": 8,
      "__v": 0
    },
      {
      "_id": "6acbba65ffc2c75e23b9c39e",
      "title": "yolo",
      "author": "bobo",
      "url": "String",
      "likes": 6,
      "__v": 0
    }]
  const result = listHelper.mostLikes(blogs)

  assert.deepEqual(result, ({author: 'String', likes: 13 }))
  })

  test('empty blogs list ?', () => {
    const blogs = []
  const result = listHelper.mostLikes(blogs)

  assert.deepEqual(result, {})
  })

  test('empty big list result is good ?', () => {
  const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]
  const result = listHelper.mostLikes(blogs)

  assert.deepEqual(result, ({author: 'Edsger W. Dijkstra', likes: 17 }))
  })
})


