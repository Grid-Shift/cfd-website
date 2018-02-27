/**
 * Calls provided functions based on an elements visiblity on screen
 * @type   {Class}
 * @param  {HTMLElement} element  Element you'd like to toggle
 * @param  {Object} [options={}]  Optional settings
 */
class ScrollCallback {
  constructor(element, options={}) {
    // Setup default options
    const defaultOptions = {
      visible: () => {},
      hidden: () => {},
      padVisibility: 200
    }

    // Assign properties
    this.element = element
    this.wasPreviouslyOnScreen = null
    this.options = Object.assign({}, defaultOptions, options)

    // This binding
    this.getElementPosY = this.getElementPosY.bind(this)
    this.getWindowPosY = this.getWindowPosY.bind(this)
    this.isCurrentlyOnScreen = this.isCurrentlyOnScreen.bind(this)
    this.scrollHandler = this.scrollHandler.bind(this)

    // Eventlisteners
    window.addEventListener('scroll', () => {
      window.cancelAnimationFrame(this.animationFrame)
      this.animationFrame = window.requestAnimationFrame(this.scrollHandler)
    })

    // Initial call
    this.scrollHandler()
  }

  scrollHandler() {
    const isCurrentlyOnScreen = this.isCurrentlyOnScreen()
    // On screen during initial load
    if (isCurrentlyOnScreen && this.wasPreviouslyOnScreen === null) {
      this.wasPreviouslyOnScreen = true
      this.options.visible()
    }
    // On screen and was offscreen before
    else if (isCurrentlyOnScreen && this.wasPreviouslyOnScreen === false) {
      this.wasPreviouslyOnScreen = true
      this.options.visible()
    }
    // Off screen and was onscreen before
    else if (!isCurrentlyOnScreen && this.wasPreviouslyOnScreen === true) {
      this.wasPreviouslyOnScreen = false
      this.options.hidden()
    }
  }


  /**
   * Determines whether element is on screen based on scroll position
   * @return {Boolean} True if element is visible on screen
   */
  isCurrentlyOnScreen() {
    const windowY = this.getWindowPosY()
    const elementY = this.getElementPosY()

    if(windowY.max >= elementY.min + this.options.padVisibility && windowY.min <= elementY.max - this.options.padVisibility) {
      return true
    } else {
      return false
    }
  }

  /**
   * Gets the offsetTop of the window and end of visible area
   * @return {Object} Object.min and Object.max properties define the visible coordinates
   */
  getWindowPosY() {
    return {
      min: window.scrollY,
      max: window.scrollY + window.innerHeight
    }
  }

  /**
   * Gets the offsetTop of this.element and end of its visible area
   * @return {Object} Object.min and Object.max properties define the visible coordinates
   */
  getElementPosY() {
    const body = document.querySelector('body')
    let offsetY = this.element.offsetTop

    // Let's loop through offsetParents until we reach the body
    let element = this.element
    while (element.offsetParent && element.offsetParent !== body) {
      offsetY += element.offsetParent.offsetTop
      element = element.offsetParent
    }

    return {
      min: offsetY,
      max: offsetY + this.element.offsetHeight
    }
  }
}

export default ScrollCallback
