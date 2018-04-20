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

export default FormValidation
