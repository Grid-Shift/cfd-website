/* =============================================================================
    Firebase
    Hold initialers for Firebase

    Table of Contents
    - Imports
    - Initialize Firebase
    - Exports

  =========================================================================== */

/* -----------------------------------------------------------------------------
    !-- Imports
  --------------------------------------------------------------------------- */

import firebase from 'firebase'

/* -----------------------------------------------------------------------------
    !-- Initialize Firebase
  --------------------------------------------------------------------------- */

const config = {
  apiKey: "AIzaSyAMDiFc3N_ybcdZqPE34a_O8HadqYykOAk",
  authDomain: "my-site-f0b6d.firebaseapp.com",
  databaseURL: "https://my-site-f0b6d.firebaseio.com",
  projectId: "my-site-f0b6d",
  storageBucket: "my-site-f0b6d.appspot.com",
  messagingSenderId: "899201845166"
}

firebase.initializeApp(config)

/* -----------------------------------------------------------------------------
    !-- Exports
  --------------------------------------------------------------------------- */

export const fireDatabase = firebase.database()
