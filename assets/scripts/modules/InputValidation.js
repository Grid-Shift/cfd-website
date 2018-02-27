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

export default InputValidation
