/* =============================================================================
    FadeOnScroll

    Table of Contents
    - Imports
    - Class
    - Exports

   ========================================================================== */

/* -----------------------------------------------------------------------------
    !-- Imports
   -------------------------------------------------------------------------- */

import {TweenLite, Power3} from 'gsap'
import ScrollCallback from './ScrollCallback'

/* -----------------------------------------------------------------------------
    !-- Class
   -------------------------------------------------------------------------- */

class FadeOnScroll {
  constructor(element, options={}) {
    this.element = element
    this.animation

    this.directions = {
      UP: 'up',
      DOWN: 'down',
      LEFT: 'left',
      RIGHT: 'right'
    }

    const directionClasses = {
      UP: 'js--slide-up',
      DOWN: 'js--slide-down',
      LEFT: 'js--slide-left',
      RIGHT: 'js--slide-right'
    }

    const delayClasses = {
      NORMAL: 'js--animation-delayed',
      LONG: 'js--animation-delayed-long',
      LONGEST: 'js--animation-delayed-longest',
    }

    const defaultOptions = {
      delayIgnoreBreakpoint: 700,
      duration: .4,
      slideDistance: 75,
      delay: {
        NORMAL: .4,
        LONG: .8,
        LONGEST: 1.2
      },
      directionClasses: directionClasses,
      delayClasses: delayClasses
    }

    this.options = Object.assign({}, defaultOptions, options)

    // Binding
    this.createAnimation = this.createAnimation.bind(this)
    this.getX = this.getX.bind(this)
    this.getY = this.getY.bind(this)
    this.getDelay = this.getDelay.bind(this)

    // Init
    this.createAnimation()
    new ScrollCallback(this.element, {
      visible: () => {
        this.animation.play()
      }
    })
  }

  createAnimation() {
    this.animation = TweenLite.fromTo(this.element,
      // duration
      this.options.duration,
      // from
      {
        opacity: 0,
        x: this.getX(),
        y: this.getY()
      },
      // to
      {
        opacity: 1,
        x: 0,
        y: 0,
        delay: this.getDelay(),
        paused: true,
        ease: Power3.easeOut
      }
    )
  }

  getX() {
    let x = 0
    // Left
    if( this.element.classList.contains(this.options.directionClasses.LEFT) ) {
      x = this.options.slideDistance
    }
    // Right
    else if( this.element.classList.contains(this.options.directionClasses.RIGHT) ) {
      x = (this.options.slideDistance * -1)
    }

    return x
  }

  getY() {
    let y = 0
    // Left
    if( this.element.classList.contains(this.options.directionClasses.UP) ) {
      y = this.options.slideDistance
    }
    // Right
    else if( this.element.classList.contains(this.options.directionClasses.DOWN) ) {
      y = (this.options.slideDistance * -1)
    }

    return y
  }

  getDelay() {
    let delay = 0
    // Check for breakpoint first
    if(window.innerWidth >= this.options.delayIgnoreBreakpoint) {
      if( this.element.classList.contains(this.options.delayClasses.NORMAL) ) {
        delay = this.options.delay.NORMAL
      }
      else if( this.element.classList.contains(this.options.delayClasses.LONG) ) {
        delay = this.options.delay.LONG
      }
      else if( this.element.classList.contains(this.options.delayClasses.LONGEST) ) {
        delay = this.options.delay.LONGEST
      }
    }

    return delay
  }
}

/* -----------------------------------------------------------------------------
    !-- Exports
   -------------------------------------------------------------------------- */

export default FadeOnScroll
