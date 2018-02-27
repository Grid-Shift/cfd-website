// Vanilla version of FitVids
// Still licencened under WTFPL
//
// Not as robust and fault tolerant as the jQuery version.
// And also, I don't support this at all whatsoever.

const vanillaFitVids = () => {
  // List of Video Vendors embeds you want to support
  const players = [
    'iframe[src*="youtube.com"]',
    'iframe[src*="vimeo.com"]',
    '.js--fitVid'
  ];

  // Select videos
  const videos = document.querySelectorAll(players.join(','))

  // If there are videos on the page...
  if(videos.length) {

    // Loop through videos
    videos.forEach((video) => {

      // Get Video Information
      const width = video.getAttribute('width')
      const height = video.getAttribute('height')
      const aspectRatio = height/width
      const parentDiv = video.parentNode

      // Wrap it in a DIV
      const div = document.createElement('div')
      parentDiv.insertBefore( div, video )
      video.remove()
      div.appendChild( video )

      // Clear height/width from video
      video.removeAttribute('height')
      video.removeAttribute('width')

      // Set Class names
      div.className = 'fitVids'
      video.classList.add('fitVids__video')

      // Set Intrinsic Ratio
      div.style.paddingBottom = aspectRatio * 100 + '%'
      div.style.position = 'relative'
      video.style.position = 'absolute'
      video.style.top = '0'
      video.style.left = '0'
      video.style.height = '100%'
      video.style.width = '100%'
    })
  }
}

module.exports = vanillaFitVids
