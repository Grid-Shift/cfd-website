/* =============================================================================
    Menu.js

    Table of Contents
    - Imports
    - Class
    - Export

  =========================================================================== */


/* -----------------------------------------------------------------------------
    !-- Imports
   -------------------------------------------------------------------------- */

import {
  Power2,
  TimelineLite,
  TweenLite
  } from 'gsap'
import {bindAll} from 'underscore'

/* -----------------------------------------------------------------------------
    !-- Class
  --------------------------------------------------------------------------- */

class Menu {
  constructor(options) {
    // Setup options
    const defaultOptions = {
      menuClass: 'js--menu',
      menuNavClass: 'js--menu__nav',
      scrollLockClass: 'body--not-scrollable',
      socialNavClass: 'js--menu__social',
      triggerClass: 'js--menu-trigger'
    }
    this.options = Object.assign({}, defaultOptions, options)

    // Bind this
    bindAll(this,
      'initEventListeners',
      'handleMenuTrigger',
      'hideMenu',
      'initMenuAnimation',
      'showMenu'
    )

    // Store some variables
    this.body = document.querySelector('body')
    this.animation = {}
    this.menuElement = document.querySelector(`.${this.options.menuClass}`)

    // Initialize
    if(this.menuElement) {
      this.initMenuAnimation()
      this.initEventListeners()
    }
  }

  initEventListeners() {
    document.querySelectorAll(`.${this.options.triggerClass}`).forEach((element) => {
      element.addEventListener('click', this.handleMenuTrigger)
    })
  }

  handleMenuTrigger(event) {
    event.preventDefault()
    event.target.blur()

    if(this.menuElement.getAttribute('hidden') || this.menuElement.getAttribute('hidden') === '' || this.menuElement.getAttribute('hidden') === 'true') {
      this.showMenu()
    } else {
      this.hideMenu()
    }
  }

  hideMenu() {
    this.animation.reverse()
  }

  initMenuAnimation() {
    const labels = {
      START: 'START',
      MENU: 'MENU',
      NAV: 'NAV',
      SOCIAL: 'SOCIAL'
    }

    this.animation = new TimelineLite({
      paused: true,
      onStart: () => {
        this.menuElement.removeAttribute('hidden')
        this.body.classList.add(this.options.scrollLockClass)
      },
      // onStartScope: this
      onReverseComplete: () => {
        this.menuElement.setAttribute('hidden', true)
        this.body.classList.remove(this.options.scrollLockClass)
      }
    })

    this.animation
      .add(labels.START)
      // Fade in menu
      .fromTo(
        this.menuElement,
        .4,
        {
          opacity: 0
        },
        {
          opacity: 1,
          ease: Power2.easeOut
        }
      )
      .add(labels.MENU)
      // fade in menu items
      .staggerFromTo(
        `.${this.options.menuNavClass} li`,
        .3,
        {
          x: '-50px',
          opacity: 0
        },
        {
          x: '0px',
          opacity: 1,
          ease: Power2.easeOut
        },
        .05,
        `${labels.START}+=.2`
      )
      .add(labels.NAV)
      // Fade in social-icon
      .fromTo(
        `.${this.options.socialNavClass}`,
        .3,
        {
          y: '30px',
          opacity: 0
        },
        {
          y: '0px',
          opacity: 1,
          ease: Power2.easeOut
        },
        `.${labels.NAV}-=.15`
      )
      .addLabel(labels.SOCIAL)
  }

  showMenu() {
    this.animation.play()
  }
}

/* -----------------------------------------------------------------------------
    !-- Export
  --------------------------------------------------------------------------- */

export default Menu
