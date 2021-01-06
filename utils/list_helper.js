const lod = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => blogs.length === 0 ? null: blogs.reduce((favorite, blog) => blog.likes > favorite.likes ? blog: favorite)

const mostBlogs = (blogs) => {
  if(blogs.length === 0) return null
  const mostArr = lod(blogs).countBy('author').entries().maxBy(lod.last)
  return {"author": mostArr[0], "blogs": mostArr[1]}
}

const mostLikes = (blogs) => {
  if(blogs.length === 0) return null
  const authorGrouped = lod.groupBy(blogs, "author")
  const authorGroupedWithTotalLikes = Object.keys(authorGrouped).map(key => ({ 'author': key, likes: lod.sumBy(authorGrouped[key], 'likes') }));
  const mostLikedAuthor = authorGroupedWithTotalLikes.reduce((mostLikedAuthor, currentAuthor) => 
    currentAuthor.likes > mostLikedAuthor.likes ? currentAuthor : mostLikedAuthor )
  return mostLikedAuthor
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}