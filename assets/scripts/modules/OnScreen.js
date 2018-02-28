class OnScreen {
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

export default OnScreen
