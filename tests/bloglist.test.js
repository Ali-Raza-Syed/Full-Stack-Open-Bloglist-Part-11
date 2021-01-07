const listHelper = require('../utils/list_helper')

describe('dummy', () => {
    test('dummy returns one', () => {
        const blogs = []

        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })
})

describe('total likes', () => {
    test('of empty list is zero', () => expect(listHelper.totalLikes([])).toBe(0))

    test('of one blog euqals its own likes', () => {
        const listWithOneBlog = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            }
        ]
        expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
    })

    test('of multiple blog equals sum of individual likes', () => {
        const listWithMultipleBlog = [
            {
                '_id':'5a422a851b54a676234d17f7',
                'title':'React patterns',
                'author':'Michael Chan',
                'url':'https://reactpatterns.com/',
                'likes':7,
                '__v':0
            },
            {
                '_id':'5a422aa71b54a676234d17f8',
                'title':'Go To Statement Considered Harmful',
                'author':'Edsger W. Dijkstra',
                'url':'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                'likes':5,
                '__v':0
            },
            {
                '_id':'5a422b3a1b54a676234d17f9',
                'title':'Canonical string reduction',
                'author':'Edsger W. Dijkstra',
                'url':'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                'likes':12,
                '__v':0
            },
            {
                '_id':'5a422b891b54a676234d17fa',
                'title':'First class tests',
                'author':'Robert C. Martin',
                'url':'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
                'likes':10,
                '__v':0
            },
            {
                '_id':'5a422ba71b54a676234d17fb',
                'title':'TDD harms architecture',
                'author':'Robert C. Martin',
                'url':'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
                'likes':0,
                '__v':0
            },
            {
                '_id':'5a422bc61b54a676234d17fc',
                'title':'Type wars',
                'author':'Robert C. Martin',
                'url':'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                'likes':2,
                '__v':0
            }
        ]
        expect(listHelper.totalLikes(listWithMultipleBlog)).toBe(36)
    })

})

describe('favorite blog', () => {
    test('favorite blog for empty list should be empty', () => {
        const blogs = []
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toBe(null)
    })

    test('for multiple blogs with one maximum like should be this same value', () => {
        const listWithMultipleBlog = [
            {
                '_id':'5a422a851b54a676234d17f7',
                'title':'React patterns',
                'author':'Michael Chan',
                'url':'https://reactpatterns.com/',
                'likes':7,
                '__v':0
            },
            {
                '_id':'5a422aa71b54a676234d17f8',
                'title':'Go To Statement Considered Harmful',
                'author':'Edsger W. Dijkstra',
                'url':'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                'likes':5,
                '__v':0
            },
            {
                '_id':'5a422b3a1b54a676234d17f9',
                'title':'Canonical string reduction',
                'author':'Edsger W. Dijkstra',
                'url':'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                'likes':12,
                '__v':0
            },
            {
                '_id':'5a422b891b54a676234d17fa',
                'title':'First class tests',
                'author':'Robert C. Martin',
                'url':'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
                'likes':10,
                '__v':0
            },
            {
                '_id':'5a422ba71b54a676234d17fb',
                'title':'TDD harms architecture',
                'author':'Robert C. Martin',
                'url':'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
                'likes':0,
                '__v':0
            },
            {
                '_id':'5a422bc61b54a676234d17fc',
                'title':'Type wars',
                'author':'Robert C. Martin',
                'url':'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                'likes':2,
                '__v':0
            }
        ]
        const result = listHelper.favoriteBlog(listWithMultipleBlog)
        expect(result)
            .toEqual({
                '_id':'5a422b3a1b54a676234d17f9',
                'title':'Canonical string reduction',
                'author':'Edsger W. Dijkstra',
                'url':'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                'likes':12,
                '__v':0
            })
    })

    test('for multiple blogs with multiple maximum likes should be the first one with max like', () => {
        const listWithMultipleBlog = [
            {
                '_id':'5a422a851b54a676234d17f7',
                'title':'React patterns',
                'author':'Michael Chan',
                'url':'https://reactpatterns.com/',
                'likes':7,
                '__v':0
            },
            {
                '_id':'5a422aa71b54a676234d17f8',
                'title':'Go To Statement Considered Harmful',
                'author':'Edsger W. Dijkstra',
                'url':'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                'likes':5,
                '__v':0
            },
            {
                '_id':'5a422b3a1b54a676234d17f9',
                'title':'Canonical string reduction',
                'author':'Edsger W. Dijkstra',
                'url':'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                'likes':12,
                '__v':0
            },
            {
                '_id':'5a422b891b54a676234d17fa',
                'title':'First class tests',
                'author':'Robert C. Martin',
                'url':'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
                'likes':10,
                '__v':0
            },
            {
                '_id':'5a422ba71b54a676234d17fb',
                'title':'TDD harms architecture',
                'author':'Robert C. Martin',
                'url':'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
                'likes':0,
                '__v':0
            },
            {
                '_id':'5a422bc61b54a676234d17fc',
                'title':'Type wars',
                'author':'Robert C. Martin',
                'url':'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                'likes':12,
                '__v':0
            }
        ]
        const result = listHelper.favoriteBlog(listWithMultipleBlog)
        expect(result)
            .toEqual({
                '_id':'5a422b3a1b54a676234d17f9',
                'title':'Canonical string reduction',
                'author':'Edsger W. Dijkstra',
                'url':'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                'likes':12,
                '__v':0
            })
    })
})

describe('most blogs', () => {
    test('for empty blog list should return null', () => {
        expect(listHelper.mostBlogs([])).toBe(null)
    })

    test('for single blog should return the same blog\'s author', () => {
        const listWithMultipleBlog = [
            {
                '_id':'5a422a851b54a676234d17f7',
                'title':'React patterns',
                'author':'Michael Chan',
                'url':'https://reactpatterns.com/',
                'likes':7,
                '__v':0
            }
        ]
        const result = listHelper.mostBlogs(listWithMultipleBlog)
        expect(result).toEqual({'author': 'Michael Chan','blogs': 1})
    })

    test('for multiple blogs with single maximum blogged author should return the most blogged author', () => {
        const listWithMultipleBlog = [
            {
                '_id':'5a422a851b54a676234d17f7',
                'title':'React patterns',
                'author':'Michael Chan',
                'url':'https://reactpatterns.com/',
                'likes':7,
                '__v':0
            },
            {
                '_id':'5a422aa71b54a676234d17f8',
                'title':'Go To Statement Considered Harmful',
                'author':'Edsger W. Dijkstra',
                'url':'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                'likes':5,
                '__v':0
            },
            {
                '_id':'5a422b3a1b54a676234d17f9',
                'title':'Canonical string reduction',
                'author':'Edsger W. Dijkstra',
                'url':'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                'likes':12,
                '__v':0
            },
            {
                '_id':'5a422b891b54a676234d17fa',
                'title':'First class tests',
                'author':'Robert C. Martin',
                'url':'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
                'likes':0,
                '__v':0
            },
            {
                '_id':'5a422ba71b54a676234d17fb',
                'title':'TDD harms architecture',
                'author':'Robert C. Martin',
                'url':'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
                'likes':5,
                '__v':0
            },
            {
                '_id':'5a422bc61b54a676234d17fc',
                'title':'Type wars',
                'author':'Robert C. Martin',
                'url':'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                'likes':12,
                '__v':0
            }
        ]

        const result = listHelper.mostBlogs(listWithMultipleBlog)
        expect(result).toEqual({'author': 'Robert C. Martin', 'blogs': 3})
    })

    test('for multiple blogs with multiple maximum blogged author should return the most blogged author occuring first in the list', () => {
        const listWithMultipleBlog = [
            {
                '_id':'5a422a851b54a676234d17f7',
                'title':'React patterns',
                'author':'Edsger W. Dijkstra',
                'url':'https://reactpatterns.com/',
                'likes':7,
                '__v':0
            },
            {
                '_id':'5a422aa71b54a676234d17f8',
                'title':'Go To Statement Considered Harmful',
                'author':'Edsger W. Dijkstra',
                'url':'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                'likes':5,
                '__v':0
            },
            {
                '_id':'5a422b3a1b54a676234d17f9',
                'title':'Canonical string reduction',
                'author':'Edsger W. Dijkstra',
                'url':'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                'likes':12,
                '__v':0
            },
            {
                '_id':'5a422b891b54a676234d17fa',
                'title':'First class tests',
                'author':'Robert C. Martin',
                'url':'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
                'likes':0,
                '__v':0
            },
            {
                '_id':'5a422ba71b54a676234d17fb',
                'title':'TDD harms architecture',
                'author':'Robert C. Martin',
                'url':'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
                'likes':5,
                '__v':0
            },
            {
                '_id':'5a422bc61b54a676234d17fc',
                'title':'Type wars',
                'author':'Robert C. Martin',
                'url':'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                'likes':12,
                '__v':0
            }
        ]

        const result = listHelper.mostBlogs(listWithMultipleBlog)
        expect(result).toEqual({'author': 'Edsger W. Dijkstra', 'blogs': 3})
    })

})

describe('most liked blog', () => {
    test('for empty blog list should return null', () => {
        expect(listHelper.mostLikes([])).toBe(null)
    })

    test('for single blog should return the same blog\'s author', () => {
        const listWithMultipleBlog = [
            {
                '_id':'5a422a851b54a676234d17f7',
                'title':'React patterns',
                'author':'Michael Chan',
                'url':'https://reactpatterns.com/',
                'likes':7,
                '__v':0
            }
        ]
        const result = listHelper.mostLikes(listWithMultipleBlog)
        expect(result).toEqual({'author': 'Michael Chan', 'likes': 7})
    })

    test('for multiple blogs with single maximum liked author should return the most liked author', () => {
        const listWithMultipleBlog = [
            {
                '_id':'5a422a851b54a676234d17f7',
                'title':'React patterns',
                'author':'Michael Chan',
                'url':'https://reactpatterns.com/',
                'likes':7,
                '__v':0
            },
            {
                '_id':'5a422aa71b54a676234d17f8',
                'title':'Go To Statement Considered Harmful',
                'author':'Edsger W. Dijkstra',
                'url':'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                'likes':5,
                '__v':0
            },
            {
                '_id':'5a422b3a1b54a676234d17f9',
                'title':'Canonical string reduction',
                'author':'Edsger W. Dijkstra',
                'url':'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                'likes':12,
                '__v':0
            },
            {
                '_id':'5a422b891b54a676234d17fa',
                'title':'First class tests',
                'author':'Robert C. Martin',
                'url':'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
                'likes':0,
                '__v':0
            },
            {
                '_id':'5a422ba71b54a676234d17fb',
                'title':'TDD harms architecture',
                'author':'Robert C. Martin',
                'url':'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
                'likes':0,
                '__v':0
            },
            {
                '_id':'5a422bc61b54a676234d17fc',
                'title':'Type wars',
                'author':'Robert C. Martin',
                'url':'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                'likes':12,
                '__v':0
            }
        ]

        const result = listHelper.mostLikes(listWithMultipleBlog)
        expect(result).toEqual({'author': 'Edsger W. Dijkstra', 'likes': 17})
    })

    test('for multiple blogs with multiple maximum liked author should return the maximum liked author occuring first in the list', () => {
        const listWithMultipleBlog = [
            {
                '_id':'5a422a851b54a676234d17f7',
                'title':'React patterns',
                'author':'Michael Chan',
                'url':'https://reactpatterns.com/',
                'likes':7,
                '__v':0
            },
            {
                '_id':'5a422aa71b54a676234d17f8',
                'title':'Go To Statement Considered Harmful',
                'author':'Edsger W. Dijkstra',
                'url':'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                'likes':5,
                '__v':0
            },
            {
                '_id':'5a422b3a1b54a676234d17f9',
                'title':'Canonical string reduction',
                'author':'Edsger W. Dijkstra',
                'url':'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                'likes':12,
                '__v':0
            },
            {
                '_id':'5a422b891b54a676234d17fa',
                'title':'First class tests',
                'author':'Robert C. Martin',
                'url':'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
                'likes':0,
                '__v':0
            },
            {
                '_id':'5a422ba71b54a676234d17fb',
                'title':'TDD harms architecture',
                'author':'Robert C. Martin',
                'url':'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
                'likes':5,
                '__v':0
            },
            {
                '_id':'5a422bc61b54a676234d17fc',
                'title':'Type wars',
                'author':'Robert C. Martin',
                'url':'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                'likes':12,
                '__v':0
            }
        ]

        const result = listHelper.mostLikes(listWithMultipleBlog)
        expect(result).toEqual({'author': 'Edsger W. Dijkstra', 'likes': 17})
    })

})