/* =============================================================================
    helpers.js
    Use this file for helper functions

    Table of Contents
    - Imports
    - View Helpers

  =========================================================================== */

/* -----------------------------------------------------------------------------
    !-- Imports
  --------------------------------------------------------------------------- */

import FadeOnScroll from './FadeOnScroll.js'

/* -----------------------------------------------------------------------------
    !-- View Helpers
  --------------------------------------------------------------------------- */

export const loadCodepen = () => {
  if( document.querySelector('.js--has-codepen') ) {
    const bodyElement = document.querySelector('body')
    const scriptElement = document.createElement('script')

    scriptElement.setAttribute('async', true)
    scriptElement.setAttribute('src', 'https://production-assets.codepen.io/assets/embed/ei.js')

    bodyElement.appendChild(scriptElement)
  }
}

export const cueAnimations = () => {
  document.querySelectorAll('.js--animate-on-scroll').forEach((element) => {
    new FadeOnScroll(element)
  })
}
