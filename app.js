function initLng() {
  'use strict'
  const options = INSTALL_OPTIONS
  const format = options.format
  let language = ''

  function redirect(l, path) {
    let langParts = l.split("-")
    let a = langParts[0].toLowerCase()
    let A = langParts[0].toUpperCase()
    let b = ''
    let B = ''
    if(langParts[1]) {
      b = langParts[1].toLowerCase()
      B = langParts[1].toUpperCase()
    }
    const redir = path.replace('$a', a).replace('$A', A).replace('$b', b).replace('$B', B)
    location.assign(redir)
    return
  }

  let supportedLocales = options.languages.split(',').map(function(lang) {
    return lang.trim()
  })

  // Check `navigator.language` ISO 639-1 occurences in lowercase
  if(navigator.language && supportedLocales.includes(navigator.language.toLowerCase())) {
    language = navigator.language
    redirect(language, format)
    return
    // Check `navigator.userLanguage` ISO 639-1 occurences in lowercase
  } else if (navigator.userLanguage && supportedLocales.includes(navigator.userLanguage.toLowerCase())) {
    language = navigator.userLanguage
    redirect(language, format)
    return
  }
  // Check `navigator.languages` array ISO 639-1 occurences in lowercase
  navigator.languages.forEach(function (lng) {
    if(supportedLocales.includes(lng.toLowerCase())) {
      redirect(lng, format)
      return
    }
  })
}

// history.length is less than 2 => new page is openned
if (history.length<=2) {
  initLng()
}
