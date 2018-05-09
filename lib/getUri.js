/* -----------------------------------------------------------------------------
    !-- Import
  --------------------------------------------------------------------------- */

const prismicType = require('./prismicType')

/* -----------------------------------------------------------------------------
    !-- Function
  --------------------------------------------------------------------------- */

module.exports = function(node) {
  var slug

  switch (node.type) {
     case prismicType.POSTS:
       slug = node.data.category && node.data.category.uid ? '/blog/' + node.data.category.uid + '/' + node.uid + '/' : '/blog/' + node.uid + '/'
       break
     case prismicType.CATS:
       slug = '/blog/' + node.uid + '/'
       break
     case prismicType.AUTHORS:
       slug = '/blog/' + node.uid + '/'
       break
     case prismicType.GLOBAL_NAV:
       slug = false
       break
     default:
       slug = '/' + node.uid + '/'
  }

  return slug
}
