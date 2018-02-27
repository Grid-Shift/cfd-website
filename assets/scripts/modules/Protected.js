/* =============================================================================
    Protected
    callback is called after correct password is entered

    Table of Contents
    - Imports
    - Class
    - Export

  =========================================================================== */

/* -----------------------------------------------------------------------------
    !-- Imports
  --------------------------------------------------------------------------- */

import { bindAll, values } from 'underscore'
import { fireDatabase } from './firebase'

/* -----------------------------------------------------------------------------
    !-- class
  --------------------------------------------------------------------------- */

class Protected {
  constructor(callback) {
    this.AUTHORIZED = 'AUTHORIZED'
    this.protectedClass = 'js--protected'
    this.callback = callback

    this.elements = {
      button: null,
      documentBody: document.querySelector('body'),
      error: null,
      form: null,
      modal: null,
      passwordField: null,
      site: document.querySelector('.site-wrapper'),
    }

    this.passwords = []

    // This binding
    bindAll(this,
      'displayModal',
      'bindFormElements',
      'generateModal',
      'displayErrors',
      'destroyErrors',
      'destroyModal',
      'getStoredAuth',
      'handleFormSubmission',
      'handleInput',
      'initializeFirebase',
      'isAuthorized',
      'isValidPassword',
      'hideSite',
      'requireAuth',
      'runCallback',
      'storeAuth'
    )

    // Init
    this.requireAuth()
  }

  bindFormElements(modal) {
    this.elements.modal = modal
    this.elements.error = this.elements.modal.querySelector('.field__error')
    this.elements.form = this.elements.modal.querySelector('.protected__form')
    this.elements.button = this.elements.modal.querySelector('button')
    this.elements.passwordField = this.elements.modal.querySelector('.field__input')

    this.elements.form.addEventListener('submit', this.handleFormSubmission)
    this.elements.passwordField.addEventListener('change', this.handleInput)
  }

  destroyErrors() {
    this.elements.error.innerHTML = ''
  }

  // Get rid of the form
  destroyModal() {
    this.elements.documentBody.removeChild(this.elements.modal)
    this.elements.documentBody.appendChild(this.elements.site)
  }

  displayErrors() {
    this.elements.error.innerHTML = 'That password doesn’t match our records. Try again.'
  }

  displayModal() {
    if(this.elements.modal) {
      document.querySelector('body').appendChild(this.modal)
    } else {
      const modal = this.generateModal()
      document.querySelector('body').appendChild(modal)
      this.bindFormElements(modal)
    }
  }

  // Create the form we'll get our passwords from
  generateModal() {
    const container = document.createElement('div')
    container.className = 'protected'
    container.innerHTML = `
      <form class="protected__form">
        <h1 class="h3 text--center" id="protected__label">
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/icons.svg#lock"></use>
          </svg>
          Password Needed
        </h1>
        <p class="text--small text--center">
          To protect the privacy of the organizations I’ve worked with, you’ll need to enter a password to view my work.
          <em>Need a password? <a href="/contact">Request access</a></em>
        </p>
        <div class="field">
          <div class="field__layout">
            <div class="field__layout-main">
              <input aria-labelledby="protected__label" class="field__input field__input--borderless" placeholder="Enter password" required="" type="password">
            </div>
            <div class="field__layout-action">
              <button type="submit">Unlock</button>
            </div>
          </div>
          <div aria-live="passive" class="field__error" role="alert"></div>
        </div>
      </form>
    `

    return container
  }

  // Retrieve authorization status from local storage (should confirm auth w/ Firebase)
  getStoredAuth() {
    return sessionStorage.getItem(this.AUTHORIZED)
  }

  // Check authorization and hide form or display error
  handleFormSubmission(event) {
    event.preventDefault()
    const submittedPassword = this.elements.passwordField.value.trim()

    if(this.isValidPassword(submittedPassword)) {
      this.storeAuth(submittedPassword)
      this.destroyModal()
      this.runCallback()
    } else {
      this.displayErrors()
    }
  }

  hideSite() {
    this.elements.documentBody.removeChild(this.elements.site)
  }

  handleInput() {
    this.destroyErrors()
  }

  initializeFirebase() {
    fireDatabase.ref('/passwords')
      .once('value')
      .then((snapshot) => {
        this.passwords = snapshot.val()
      })
      .catch((error) => {
        this.elements.error.innerHTML = 'Unable to connect to server, try refreshing the page.'
      })
  }

  isAuthorized() {
    return this.getStoredAuth()
  }

  // Check password validity
  isValidPassword(password) {
    if (this.passwords instanceof Array === false) {
      this.passwords = values(this.passwords)
    }

    return this.passwords.includes(password)
  }

  requireAuth() {
    if(this.isAuthorized()) {
      this.runCallback()
    } else {
      this.initializeFirebase()
      this.hideSite()
      this.displayModal()
    }

    document.querySelector(`.${this.protectedClass}`).classList.remove(this.protectedClass)
  }

  runCallback() {
    if(typeof this.callback === 'function') {
      this.callback()
    }
  }

  // Store authorization password in local storage
  storeAuth(password) {
    sessionStorage.setItem(this.AUTHORIZED, password)
  }
}

/* -----------------------------------------------------------------------------
    !-- Export
  --------------------------------------------------------------------------- */

export default Protected
