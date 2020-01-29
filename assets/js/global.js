const audio       = document.querySelector('#tts1')
const audioButton = document.querySelector('.js-audio')
// Gestion du fichier audio
audioButton.addEventListener('click', () => {
  if (audio.paused) {
    // Si c'est en pause on play
    audio.play()
    audioButton.classList.toggle('js-playing')
    audioButton.value = 'stop'
  } else {
    // Si ça play on pause et retourne début
    audio.pause()
    audio.currentTime = 0
    audioButton.classList.toggle('js-playing')
    audioButton.value = 'version audio'
  }
})
// Quand l'audio finit naturellement, on supprime la classe
audio.addEventListener('ended', () => {
  audioButton.classList.remove('js-playing')
  audioButton.value = ''
  audioButton.value = 'version audio'
})


// On récupère le form
var form = document.querySelector('#schnapsit')
// On reset le form pour que ce soit toujours l'input 1 cochée par défaut
form.reset()
// On écoute les changements du formulaire
form.addEventListener('change', (e) => {
  // récupère la value de l'input pour changer l'url du codePen
  switchPenId(e.target.value)
})

function switchPenId(penId) {
  // On récupère l'iframe via sa classe
  const pen = document.querySelector('.cp_embed_iframe')
  if(pen) {
    // On récupère le src de l'iframe sous forme d'url pour gérer ses paramètres 
    let url = new URL(pen.src)
    // On récupère l'ancien id de pen, celui qui se trouve après le dernier slash de pathname
    const oldPenid = url.pathname.slice(url.pathname.lastIndexOf('/') + 1)
    // Si j'ai bien reçu un id de codePen et qu'il est différent de l'ancien
    if (penId && penId !== oldPenid) {
      // Je coupe le pathname actuel après le dernier slash (pour virer l'ancien id) et je concatène avec le nouvel id
      url.pathname = url.pathname.slice(0, url.pathname.lastIndexOf('/') + 1) + penId
      pen.src = url // appliqué c'est pesé
    }
    // Test divers
    // console.log('___ switchPenId ___')
    // console.log('new pen id:', penId)
    // console.log('old pen id:', oldPenid)
  }
  
}
