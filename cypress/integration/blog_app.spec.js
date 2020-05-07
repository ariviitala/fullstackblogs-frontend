describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Pekka',
      username: 'pekka',
      password: 'salis'
    }

    const anotherUser = {
      name: 'Kalle',
      username: 'kalle',
      password: 'salis'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', anotherUser)

    cy.visit('http://localhost:3000')

  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
  })

  it('login form can be opened', function() {
    cy.contains('Log in').click()
  })

  it('user can log in', function() {
    cy.contains('Log in').click()
    cy.get('#username').type('pekka')
    cy.get('#password').type('salis')
    cy.get('#login-button').click()

    cy.contains('You are logged in as Pekka')
  })

  it('user can\'t login with invalid creds', function() {
    cy.contains('Log in').click()
    cy.get('#username').type('pekka')
    cy.get('#password').type('invalid')
    cy.get('#login-button').click()

    cy.contains('Invalid username or password')
  })

  describe('when logged in', function() {
    beforeEach(function() {

      cy.contains('Log in').click()
      cy.get('#username').type('pekka')
      cy.get('#password').type('salis')
      cy.get('#login-button').click()
    })

    it('a new blog can be created', function() {
      cy.contains('Add new blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('Test url')
      cy.contains('Create').click()

      cy.contains('Test Blog Test Author')
    })


  })

  describe('after adding a blog', function () {
    beforeEach(function () {
      cy.contains('Log in').click()
      cy.get('#username').type('pekka')
      cy.get('#password').type('salis')
      cy.get('#login-button').click()

      cy.contains('Add new blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('Test url')
      cy.contains('Create').click()
    })

    it('user can like a blog', function() {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('user can remove their own blog', function () {
      cy.contains('view').click()
      cy.contains('Remove').click()
      cy.contains('Test Blog Test Author').should('not.exist')
    })

    it('user can\'t remove others blogs', function () {
      cy.contains('Log Out').click()
      cy.contains('Log in').click()
      cy.get('#username').type('kalle')
      cy.get('#password').type('salis')
      cy.get('#login-button').click()

      cy.contains('view').click()
      cy.contains('Remove').should('not.exist')
      cy.contains('Log Out').click()
    })

    it('blogs are in right order', function () {

      cy.get('#title').type('Blog2')
      cy.get('#author').type('Test Author2')
      cy.get('#url').type('Test url2')
      cy.contains('Create').click()

      cy.get('#title').type('Blog3')
      cy.get('#author').type('Test Author3')
      cy.get('#url').type('Test url3')
      cy.contains('Create').click()

      cy.wait(1000)

      cy.contains('Test Blog').contains('view').click()
      cy.contains('Test Blog').parent().contains('like').click()

      cy.contains('Blog3 Test Author3').contains('view').click()
      cy.contains('Blog3 Test Author3').parent().contains('like').click()
      cy.wait(1000)
      cy.contains('Blog3 Test Author3').parent().contains('like').click()

      cy.contains('Blog2').contains('view').click()


      //cy.get('#blogs').first('.blog').then(b => {console.log(b)})
      //cy.first('.blog').debug()
      //cy.get('.blog').debug()
      cy.get('.likeForm').then(likeForms => {
        let likes = likeForms.text().split('likes ')
        likes.shift()
        likes = likes.map(l => Number(l.split('like')[0])).reverse()
        console.log(likes)
        expect(likes[1]).to.be.at.least(likes[0])
        expect(likes[2]).to.be.at.least(likes[1])
      })//.shift()))
      //cy.get('#blogs').first('.blog').then(result => console.log(result))
      /* cy.contains('Blog3 Test Author3').parent().parent().children().then(blogs => {
        console.log(blogs)
      }) */
    })


  })
})