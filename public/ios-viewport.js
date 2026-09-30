// iOS dá zoom automático ao focar campos; maximum-scale=1 evita (pinça continua funcionando).
if (/iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent)))
  document.querySelector('meta[name=viewport]').content += ', maximum-scale=1'
