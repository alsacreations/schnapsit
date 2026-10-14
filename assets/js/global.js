/**
 * Schnapsum : générateur de faux texte alsacien.
 * JavaScript natif, sans dépendance.
 */

const NNBSP = ' ' // espace fine insécable
const NBSP = ' ' // espace insécable

const ALSACIEN = [
  'hopla', 'bredele', 'choucroute', 'knack', 'flammekueche', 'kougelhopf', 'munster', 'bretzel',
  'picon', 'gewurztraminer', 'riesling', 'sylvaner', 'schnaps', 'winstub', 'Elsass', 'Strossburi',
  'baeckeoffe', 'mannele', 'spätzle', 'pinot gris', 'cigogne', 'colombage', 'Colmar', 'Sélestat',
  'Obernai', 'Haguenau', 'Saverne', 'Christkindelsmärik', 'tarte flambée', 'crémant', 'quetsche',
  'mirabelle', 'wurscht', 'hopla geiss', 'Petite France', 'kirsch', 'lewerknepfle', 'fleischschnacka',
  'bissame', 'schpeck', 'chambon', 'rucksack', 'bibbeleskaas', 'rossbolla', 'grumbeere', 'knäckes', 'nüdle',
]

const LATIN = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
  'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim', 'ad',
  'minim', 'veniam', 'quis', 'nostrud', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'voluptate', 'velit', 'esse', 'fugiat', 'nulla', 'pariatur',
]

const DOSES = ['Un doigt', 'Petit verre', 'Bien servi', 'Corsé', 'Cul sec']
const MAX = { p: 20, w: 500 }
const DEFAULT_COUNT = { p: 3, w: 50 }
const UNIT_LABEL = { p: 'paragraphes', w: 'mots' }

/** Générateur pseudo-aléatoire reproductible (mulberry32) */
function random(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Produit une liste de blocs { type: 'h2' | 'p' | 'ul', text, items } */
export function generate({ seed, density, unit, count, start, rich }) {
  const r = random(seed)
  const dose = [0.25, 0.45, 0.6, 0.8, 1][density - 1] ?? 0.6
  const pick = (list) => list[Math.floor(r() * list.length)]
  const word = () => (r() < dose ? pick(ALSACIEN) : pick(LATIN))
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)
  const words = (n) => Array.from({ length: n }, word)
  const end = () => {
    const x = r()
    if (x < 0.1) return `${NNBSP}!`
    if (x < 0.16) return `${NNBSP}?`
    return '.'
  }
  const sentence = () => {
    const w = words(6 + Math.floor(r() * 9))
    if (w.length > 8 && r() < 0.5) {
      const i = 3 + Math.floor(r() * (w.length - 6))
      w[i] += ','
    }
    return cap(w.join(' ')) + end()
  }
  const paragraph = (n) => Array.from({ length: n }, sentence).join(' ')

  const blocks = []
  if (unit === 'p') {
    for (let i = 0; i < count; i++) blocks.push({ type: 'p', text: paragraph(3 + Math.floor(r() * 4)) })
  } else {
    const w = words(count)
    const parts = []
    for (let i = 0; i < w.length; i += 10) parts.push(`${cap(w.slice(i, i + 10).join(' '))}.`)
    blocks.push({ type: 'p', text: parts.join(' ') })
  }

  if (start && blocks.length) {
    const t = blocks[0].text
    blocks[0].text = `Lorem Elsass ipsum ${t.charAt(0).toLowerCase()}${t.slice(1)}`
  }

  if (rich && unit === 'p') {
    const items = [0, 1, 2].map(() => cap(words(3 + Math.floor(r() * 4)).join(' ')))
    blocks.splice(Math.min(2, blocks.length), 0, { type: 'ul', items })
    blocks.unshift({ type: 'h2', text: cap(words(2 + Math.floor(r() * 3)).join(' ')) })
  }
  return blocks
}

export function toText(blocks) {
  return blocks
    .map((b) => (b.type === 'ul' ? b.items.map((i) => `• ${i}`).join('\n') : b.text))
    .join('\n\n')
}

export function toHtml(blocks) {
  return blocks
    .map((b) => {
      if (b.type === 'h2') return `<h2>${b.text}</h2>`
      if (b.type === 'ul') return `<ul>\n${b.items.map((i) => `  <li>${i}</li>`).join('\n')}\n</ul>`
      return `<p>${b.text}</p>`
    })
    .join('\n')
}

/* ---------- Interface ---------- */

function initTheme() {
  const button = document.querySelector('.js-theme-toggle')
  if (!button) return
  const root = document.documentElement
  let saved = null
  try {
    saved = localStorage.getItem('schnapsum-theme')
  } catch {}
  const current = () =>
    root.dataset.theme ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  const apply = (theme) => {
    root.dataset.theme = theme
    button.setAttribute('aria-pressed', String(theme === 'dark'))
  }
  if (saved) apply(saved)
  else button.setAttribute('aria-pressed', String(current() === 'dark'))
  button.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark'
    apply(next)
    try {
      localStorage.setItem('schnapsum-theme', next)
    } catch {}
  })
}

function initGenerator() {
  const form = document.querySelector('.js-settings')
  if (!form) return

  const $ = (selector) => document.querySelector(selector)
  const preview = $('.js-preview')
  const code = $('.js-code')
  const status = $('.js-status')
  const countInput = form.elements.count
  const densityInput = form.elements.density
  const richInput = form.elements.rich

  const state = { seed: 1664, view: 'preview', speaking: false }
  let blocks = []
  let statusTimer

  const settings = () => ({
    seed: state.seed,
    unit: form.elements.unit.value,
    count: Number(countInput.value) || 1,
    density: Number(densityInput.value) || 3,
    start: form.elements.start.checked,
    rich: richInput.checked,
  })

  const flash = (message) => {
    clearTimeout(statusTimer)
    status.textContent = message
    statusTimer = setTimeout(() => (status.textContent = ''), 4000)
  }

  const clampCount = () => {
    const max = MAX[form.elements.unit.value]
    const value = Math.max(1, Math.min(max, Math.round(Number(countInput.value)) || 1))
    countInput.value = value
    countInput.max = max
    $('.js-max').textContent = max
  }

  const render = () => {
    const s = settings()
    blocks = generate(s)

    // Aperçu : construit avec textContent (aucune injection HTML)
    preview.replaceChildren(
      ...blocks.map((b) => {
        if (b.type === 'ul') {
          const ul = document.createElement('ul')
          ul.append(...b.items.map((item) => Object.assign(document.createElement('li'), { textContent: item })))
          return ul
        }
        const p = document.createElement('p')
        p.textContent = b.text
        if (b.type === 'h2') p.className = 'preview-heading'
        return p
      }),
    )
    code.querySelector('code').textContent = toHtml(blocks)

    // Statistiques
    const plain = toText(blocks)
    const fr = (n) => n.toLocaleString('fr-FR')
    const nWords = plain.split(/\s+/).filter((w) => /\p{L}/u.test(w)).length
    const nParagraphs = blocks.filter((b) => b.type === 'p').length
    $('.js-stats').textContent =
      `${fr(nParagraphs)}${NBSP}${nParagraphs > 1 ? 'paragraphes' : 'paragraphe'} · ` +
      `${fr(nWords)}${NBSP}mots · ${fr(plain.length)}${NBSP}caractères`

    // Dose d’alsacien
    const dose = DOSES[s.density - 1]
    $('.js-dose').textContent = dose
    densityInput.setAttribute('aria-valuetext', `${s.density}${NBSP}sur 5${NBSP}: ${dose}`)

    // Option intertitre réservée aux paragraphes
    richInput.disabled = s.unit !== 'p'
    $('.js-unit-label').textContent = UNIT_LABEL[s.unit]
  }

  const setView = (view) => {
    state.view = view
    document.querySelectorAll('.js-view').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.view === view))
    })
    preview.hidden = view !== 'preview'
    code.hidden = view !== 'code'
    $('.js-copy-label').textContent = view === 'code' ? 'Copier le HTML' : 'Copier le texte'
  }

  const regenerate = () => {
    state.seed = Math.floor(Math.random() * 1e9)
    render()
    flash('Nouveau texte servi.')
  }

  // Événements
  form.addEventListener('change', (event) => {
    if (event.target.name === 'unit') countInput.value = DEFAULT_COUNT[event.target.value]
    clampCount()
    render()
  })
  densityInput.addEventListener('input', render)
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    regenerate()
  })
  $('.js-dec').addEventListener('click', () => {
    countInput.value = Number(countInput.value) - 1
    clampCount()
    render()
  })
  $('.js-inc').addEventListener('click', () => {
    countInput.value = Number(countInput.value) + 1
    clampCount()
    render()
  })
  document.querySelectorAll('.js-view').forEach((button) => {
    button.addEventListener('click', () => setView(button.dataset.view))
  })
  $('.js-regenerate').addEventListener('click', regenerate)

  $('.js-copy').addEventListener('click', async () => {
    const text = state.view === 'code' ? toHtml(blocks) : toText(blocks)
    try {
      await navigator.clipboard.writeText(text)
      flash(state.view === 'code' ? 'HTML copié dans le presse-papiers.' : 'Texte copié dans le presse-papiers.')
    } catch {
      flash(`La copie a échoué${NBSP}: sélectionnez le texte puis copiez-le à la main.`)
    }
  })

  const speakButton = $('.js-speak')
  const speakLabel = $('.js-speak-label')
  const setSpeaking = (speaking) => {
    state.speaking = speaking
    speakButton.setAttribute('aria-pressed', String(speaking))
    speakLabel.textContent = speaking ? 'Arrêter la lecture' : 'Écouter'
  }
  speakButton.addEventListener('click', () => {
    if (!('speechSynthesis' in window)) {
      flash('La lecture à voix haute n’est pas disponible dans ce navigateur.')
      return
    }
    speechSynthesis.cancel()
    if (state.speaking) {
      setSpeaking(false)
      return
    }
    const utterance = new SpeechSynthesisUtterance(toText(blocks))
    utterance.lang = 'fr-FR'
    utterance.rate = 0.95
    utterance.addEventListener('end', () => setSpeaking(false))
    utterance.addEventListener('error', () => setSpeaking(false))
    speechSynthesis.speak(utterance)
    setSpeaking(true)
  })

  clampCount()
  render()
}

initTheme()
initGenerator()
