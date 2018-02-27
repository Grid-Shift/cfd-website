/* =============================================================================
    App.js
    Primary file for all site related JavaScript.

    Table of Contents
    - Import vendor plugins
    - Import custom modules
    - Helpers
    - Do stuff

  =========================================================================== */

/* -----------------------------------------------------------------------------
    !-- Import vendor plugins
  --------------------------------------------------------------------------- */

// const vanillaFitVids = require('./vendor/vanillaFitVids')
// import {TweenLite, Power3} from 'gsap'

/* -----------------------------------------------------------------------------
    !-- Old Scripts
  --------------------------------------------------------------------------- */
class MoveLabel {
  constructor(fieldContainerEle, options) {
    // Setup
    const defaultOptions = {
      fieldSelector: '.js--field__input',
      labelSelector: '.js--field__label',
      labelIsDirtyClass: 'field__label--is-dirty',
      fieldIsDirtyClass: 'field__input--is-dirty'
    }
    this.options = Object.assign({}, defaultOptions, options)
    this.fieldContainerEle = fieldContainerEle
    this.fieldEle = this.fieldContainerEle.querySelector(this.options.fieldSelector)
    this.labelEle = this.fieldContainerEle.querySelector(this.options.labelSelector)

    // 'this' binding
    this.addDirtyClass = this.addDirtyClass.bind(this)

    // Event listeners
    this.fieldEle.addEventListener('input', this.addDirtyClass)
    this.fieldEle.addEventListener('change', this.addDirtyClass)
  }

  addDirtyClass(event) {
    if(event.target.value !== '') {
      this.labelEle.classList.add(this.options.labelIsDirtyClass)
      event.target.classList.add(this.options.fieldIsDirtyClass)
    } else {
      this.labelEle.classList.remove(this.options.labelIsDirtyClass)
      event.target.classList.remove(this.options.fieldIsDirtyClass)
    }
  }
}

class FormValidation {
  constructor(formEle, options) {
    // Setup defaults
    const defaultOptions = {
      onSubmit: () => {},
      errorEleSelector: '.js--validate__alert',
      errorHiddenClass: 'is--hidden',
      errorMessage: 'There were errors with your submission. Check the fields below.'
    }
    this.options = Object.assign({}, defaultOptions, options)

    // Capture necessary elements
    this.formEle = formEle
    this.formEle.setAttribute('novalidate', true)
    this.errorEle = formEle.querySelector(this.options.errorEleSelector)

    // Bind this to methods that need it
    // this.methodName = this.methodName.bind(this)
    this.handleSubmission = this.handleSubmission.bind(this)
    this.hideError = this.hideError.bind(this)
    this.showError = this.showError.bind(this)

    this.formEle.addEventListener('submit', this.handleSubmission)
  }

  handleSubmission(event) {
    let isValid = true
    this.errorEle.innerHTML = ''

    this.formEle.querySelectorAll('input').forEach((input) => {
      if(!input.checkValidity()) {
        isValid = false
      }
    })

    if(isValid === false) {
      event.preventDefault()
      this.errorEle.innerHTML = this.options.errorMessage
      this.showError()
    } else {
      this.hideError()
      this.options.onSubmit()
    }
  }

  hideError() {
    this.errorEle.classList.add(this.options.errorHiddenClass)
  }

  showError() {
    this.errorEle.classList.remove(this.options.errorHiddenClass)
  }
}

class InputValidation {
  constructor(inputContainerEle, options) {
    // Strings for names of things
    this.messageNames = {
      badInput: 'badInput',
      patternMismatch: 'patternMismatch',
      rangeOverflow: 'rangeOverflow',
      rangeUnderflow: 'rangeUnderflow',
      stepMismatch: 'stepMismatch',
      tooLong: 'tooLong',
      tooShort: 'tooShort',
      typeMismatch: 'typeMismatch',
      valueMissing: 'valueMissing',
      default: 'default',
    }

    // Setup options
    let defaultOptions = {
      fieldSelector: '.js--field__input',
      fieldErrorSelector: '.js--field__error',
      errorHiddenClass: 'is--hidden',
      emailPattern: '.+@.+\\..+',
      messages: {
      }
    }
    defaultOptions.messages[this.messageNames.badInput] = 'Bad input, try again.'
    defaultOptions.messages[this.messageNames.patternMismatch] = 'Invalid email address.'
    defaultOptions.messages[this.messageNames.rangeOverflow] = 'Number is greater than the max allowed'
    defaultOptions.messages[this.messageNames.rangeUnderflow] = 'Number is less than the min allowed'
    defaultOptions.messages[this.messageNames.stepMismatch] = 'This number doesn\'t match the accepted values.'
    defaultOptions.messages[this.messageNames.tooLong] = 'Too many characters.'
    defaultOptions.messages[this.messageNames.tooShort] = 'Not enough characters.'
    defaultOptions.messages[this.messageNames.typeMismatch] = 'Not the format we\'re looking for, try again.'
    defaultOptions.messages[this.messageNames.valueMissing] = 'This field is required.'
    defaultOptions.messages[this.messageNames.default] = 'An error happened. Try again.'
    this.options = Object.assign({}, defaultOptions, options)

    // Bind this to methods that need it
    // this.methodName = this.methodName.bind(this)
    this.createErrorMessage = this.createErrorMessage.bind(this)
    this.destroyErrorMessage = this.destroyErrorMessage.bind(this)
    this.hideError = this.hideError.bind(this)
    this.initListeners = this.initListeners.bind(this)
    this.inputChangeHandler = this.inputChangeHandler.bind(this)
    this.showError = this.showError.bind(this)

    // Grab DOMElements
    this.containerEle = inputContainerEle
    this.fieldEle = this.containerEle.querySelector(this.options.fieldSelector)
    this.errorEle = this.containerEle.querySelector(this.options.fieldErrorSelector)

    this.initListeners()
    this.addEmailPattern()
  }

  addEmailPattern() {
    if(this.fieldEle.getAttribute('type') === 'email') {
      this.fieldEle.setAttribute('pattern', this.options.emailPattern)
    }
  }

  createErrorMessage() {
    for(let messageName in this.messageNames) {
      if(this.fieldEle.validity[messageName]) {
        this.fieldEle.setCustomValidity(this.options.messages[messageName])
        break
      }
    }
  }

  destroyErrorMessage() {
    this.fieldEle.setCustomValidity('')
  }

  hideError() {
    this.errorEle.classList.add(this.options.errorHiddenClass)
  }

  initListeners() {
    this.fieldEle.addEventListener('input', this.inputChangeHandler)
    // Show errors if form submission triggered validation
    this.fieldEle.addEventListener('invalid', this.inputChangeHandler)
  }

  inputChangeHandler(event) {
    const validity = this.fieldEle.validity
    this.destroyErrorMessage()

    if(validity.valid) {
      this.hideError()
    } else {
      this.createErrorMessage()
      this.showError()
    }
  }

  showError() {
    this.errorEle.classList.remove(this.options.errorHiddenClass)
    this.errorEle.innerHTML = this.fieldEle.validationMessage
  }
}

class onScreen {
  constructor(element, classToAdd='is--on-screen') {
    this.element = element
    this.classToAdd = classToAdd
    this.offsetDistance = 150

    this.scrollThrottle = this.scrollThrottle.bind(this)
    this.isOnScreen = this.isOnScreen.bind(this)
    this.toggleOnScreenClass = this.toggleOnScreenClass.bind(this)

    this.toggleOnScreenClass()
    window.addEventListener('scroll', () => {
        this.scrollThrottle(this.toggleOnScreenClass)
    })
  }

  scrollThrottle(callback) {
    window.requestAnimationFrame(() => {
      callback()
    })
  }

  isOnScreen() {
    // TODO: Handle scrolling past target
    const scrollBarPos = document.scrollingElement.scrollTop
    const windowHeight = window.innerHeight
    let elementPos = this.element.offsetTop
    if (this.element.offsetParent) {
      elementPos += this.element.offsetParent.offsetTop
    }

    if (scrollBarPos + windowHeight - this.offsetDistance >= elementPos) {
      return true
    } else {
      return false
    }
  }

  toggleOnScreenClass() {
    if(this.isOnScreen()) {
      this.element.classList.add(this.classToAdd)
    } else {
      this.element.classList.remove(this.classToAdd)
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // MoveLabel
  document.querySelectorAll('.js--field').forEach((element) => {
    new MoveLabel(element)
  })

  // onScreen
  document.querySelectorAll('.js--is-onscreen').forEach((element) => {
    new onScreen(element)
  })

  // ScrollTo
  document.querySelectorAll('.js--scrollTo').forEach((element) => {
    element.addEventListener('click', (event) => {
      event.preventDefault()
      event.target.blur()

      TweenLite.to(window, .75, {
        ease: Strong.easeInOut,
        scrollTo: event.target.getAttribute('href'),
        onCompleteParams: [document.querySelector(event.target.getAttribute('href'))],
        onComplete: (targetEle) => {
          targetEle.focus()
        }
      })
    })
  })

  // Form validation
  new FormValidation(document.querySelector('.js--validate'), {
    onSubmit: () => {
      ga('send', {
        hitType: 'event',
        eventCategory: 'Form',
        eventAction: 'submit',
        eventLabel: 'Newsletter Signup',
        transport: 'beacon'
      })
    }
  })
  // Field Validation
  document.querySelectorAll('.js--field').forEach((element) => {
    new InputValidation(element)
  })
})
