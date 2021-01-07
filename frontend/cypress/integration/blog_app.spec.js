describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'name1',
      username: 'username1',
      password: 'password1'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3001')
  })
  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('username1')
      cy.get('#password').type('password1')
      cy.get('#login-button').click()
      cy.contains('Welcome name1')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('username1')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.contains('Wrong Credentials')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'username1', password: 'password1' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('title1')
      cy.get('#author').type('author1')
      cy.get('#url').type('url1')
      cy.contains('save').click()
      cy.contains('New blog added successfully')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.contains('title1')
      cy.contains('author1')
    })

    it('A blog can be liked', function(){
      cy.createBlog({ 'title': 'title1', 'author': 'author1', 'url': 'url1' })
      cy.contains('title1').find('button').click()
      cy.contains('title1').parent().find('#like-div').as('like-div')
      cy.get('@like-div').contains('like').click()
      cy.get('@like-div').contains('likes: 1')
    })

    it('A blog can be removed by the same user who created it', function(){
      cy.createBlog({ 'title': 'title1', 'author': 'author1', 'url': 'url1' })
      cy.contains('title1').find('button').click()
      cy.contains('title1').parent().find('#del-div').find('button').click()
      cy.get('html').should('not.contain', 'title1')
    })

    it('A blog can not be removed by different user', function(){
      cy.createBlog({ 'title': 'title1', 'author': 'author1', 'url': 'url1' })
      cy.contains('Logout').click()
      cy.createUser({ 'name': 'name2', 'username': 'username2', 'password': 'password2' })
      cy.login({ 'username': 'username2', 'password': 'password2' })
      cy.contains('title1').find('button').click()
      cy.contains('title1').parent().should('not.contain', '#del-div')
    })

    it('Blogs are sorted in descending order of likes', function(){
      cy.createBlog({ 'title': 'title2', 'author': 'author2', 'url': 'url2', 'likes': 2 })
      cy.createBlog({ 'title': 'title1', 'author': 'author1', 'url': 'url1', 'likes': 1 })
      cy.createBlog({ 'title': 'title3', 'author': 'author3', 'url': 'url3', 'likes': 3 })
      cy.createBlog({ 'title': 'title4', 'author': 'author4', 'url': 'url4', 'likes': 4 })
      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('likes: 4')
        cy.wrap(blogs[1]).contains('likes: 3')
        cy.wrap(blogs[2]).contains('likes: 2')
        cy.wrap(blogs[3]).contains('likes: 1')
      })
    })
  })
})