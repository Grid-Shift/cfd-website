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

export default MoveLabel
