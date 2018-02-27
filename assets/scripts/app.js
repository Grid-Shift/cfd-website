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
import {TweenLite, Strong} from 'gsap'

/* -----------------------------------------------------------------------------
    !-- Import custom modules
  --------------------------------------------------------------------------- */

import FormValidation from './modules/FormValidation'
import InputValidation from './modules/InputValidation'
import MoveLabel from './modules/MoveLabel'
import OnScreen from './modules/OnScreen'

/* -----------------------------------------------------------------------------
    !-- Do Stuff
  --------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  // MoveLabel
  document.querySelectorAll('.js--field').forEach((element) => {
    new MoveLabel(element)
  })

  // onScreen
  document.querySelectorAll('.js--is-onscreen').forEach((element) => {
    new OnScreen(element)
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
