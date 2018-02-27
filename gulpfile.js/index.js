/* =============================================================================
    Gulp index

    Table of Contents
    - Requires
    - Configs
    - Import Tasks
    - Default Tasks

   ========================================================================== */

/* -----------------------------------------------------------------------------
    !-- Requires
   -------------------------------------------------------------------------- */

const gulp = require('gulp')
const exec = require('child_process').exec
const ghPages = require('gulp-gh-pages')
const path = require('path')
const requireDir = require('require-dir')
const sequence = require('gulp-sequence')

/* -----------------------------------------------------------------------------
    !-- Configs
   -------------------------------------------------------------------------- */

const paths = require('./paths')
const config = require('./config')

/* -----------------------------------------------------------------------------
    !-- Tasks
   -------------------------------------------------------------------------- */

requireDir('./tasks', {recursive: true})

/* -----------------------------------------------------------------------------
    !-- Default Tasks
   -------------------------------------------------------------------------- */

gulp.task('default', ['images', 'scripts', 'sprite', 'styles'])

gulp.task('watch', sequence('default', ['images:watch', 'scripts:watch', 'sprite:watch', 'styles:watch']))

// NOTE: You must set NODE_ENV=production in the command line to get a true
// production build
gulp.task('build:production', sequence('clean', 'default'))
