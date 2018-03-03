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

import vanillaFitVids from './vendor/vanillaFitVids'
import {TweenLite, Strong} from 'gsap'
import ScrollToPlugin from "gsap/ScrollToPlugin"

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
  vanillaFitVids()

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
      const targetEle = document.querySelector(event.target.getAttribute('href'))

      TweenLite.to(window, .75, {
        ease: Strong.easeInOut,
        scrollTo: targetEle,
        onCompleteParams: [targetEle],
        onComplete: (targetEle) => {
          targetEle.focus()
        }
      })
    })
  })

  // Form validation
  const formEle = document.querySelector('.js--validate')
  if (formEle) {
    new FormValidation(formEle, {
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
  }

  // Field Validation
  document.querySelectorAll('.js--field').forEach((element) => {
    new InputValidation(element)
  })
})
