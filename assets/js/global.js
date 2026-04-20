const audio = document.querySelector("#tts1");
const audioButton = document.querySelector(".js-audio");
// Gestion du fichier audio
audioButton.addEventListener("click", () => {
  if (audio.paused) {
    // Si c'est en pause on play
    audio.play();
    audioButton.classList.toggle("js-playing");
    audioButton.value = "stop";
  } else {
    // Si ça play on pause et retourne début
    audio.pause();
    audio.currentTime = 0;
    audioButton.classList.toggle("js-playing");
    audioButton.value = "version audio";
  }
});
// Quand l'audio finit naturellement, on supprime la classe
audio.addEventListener("ended", () => {
  audioButton.classList.remove("js-playing");
  audioButton.value = "";
  audioButton.value = "version audio";
});

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function buildSchnapsumParagraph(density) {
  const phrases = [
    "Lorem Salu bissame ! Wie geht's les samis ? Hans apporte moi une Wurschtsalad avec un picon bitte, s'il te plaît.",
    "Yoo dû ch'ai ramené du schpeck, du chambon, un kuglopf et du schnaps dans mon rucksack.",
    "Wotch a kofee avec ton bibalaekaess et ta wurscht ? Yeuh non che suis au régime, je ne mange plus que des Grumbeere light.",
    "Chulien a glissé dans la choucroute, alors on va boire un verre de gewurtztraminer.",
    "Une Carola et du Melfor ? Yo dû, espèce de Knäckes, ch'ai dit un picon !",
    "Ponchour bisame, bibbeleskaas et un rossbolla pour accompagner la flammekueche.",
    "Kouglopf, wurscht, nüdle, et un schnaps pour dichérer, voilà le vrai menu alsacien.",
    "Bande de knäckes ! C'est l'heure du schnapsum gal pour faire la fête.",
    "Mon rottznoz est sur le comptoir et le chambon attend le petit déjeuner.",
  ];

  const baseCount = Math.max(1, density + 1);
  const sentenceCount = baseCount + getRandomInt(2);
  const selected = [];

  while (selected.length < sentenceCount) {
    const phrase = phrases[getRandomInt(phrases.length)];
    if (!selected.includes(phrase)) {
      selected.push(phrase);
    }
  }

  return selected.join(" ");
}

function updateHtmlVersion() {
  const paragraphCount = parseInt(
    document.querySelector("#paragraphCount").value,
    10,
  );
  const density = parseInt(
    document.querySelector("#paragraphDensity").value,
    10,
  );
  const codeBlock = document.querySelector("#quote2 code.html");
  const countOutput = document.querySelector("#paragraphCountOutput");
  const densityOutput = document.querySelector("#paragraphDensityOutput");

  if (!codeBlock || !countOutput || !densityOutput) {
    return;
  }

  countOutput.textContent = paragraphCount;
  densityOutput.textContent = density;

  const lines = ["<h1>Schnapsum</h1>", "<h2>Un faux texte alsacien</h2>"];

  for (let i = 0; i < paragraphCount; i += 1) {
    const paragraph = buildSchnapsumParagraph(density);
    lines.push(`<p>${escapeHtml(paragraph)}</p>`);
  }

  codeBlock.textContent = lines.join("\n");
}

function getTextForActiveView() {
  const htmlTab = document.querySelector("#tab2");
  if (htmlTab && htmlTab.checked) {
    const codeBlock = document.querySelector("#quote2 code.html");
    return codeBlock ? codeBlock.textContent : "";
  }

  const quoteBlock = document.querySelector("#quote1");
  return quoteBlock ? quoteBlock.innerText.trim() : "";
}

function getCopyButtonText() {
  const htmlTab = document.querySelector("#tab2");
  return htmlTab && htmlTab.checked ? "Copier le code" : "Copier le texte";
}

function updateCopyButtonLabel() {
  const copyButton = document.querySelector("#copyHtmlButton");
  if (!copyButton) {
    return;
  }

  copyButton.textContent = getCopyButtonText();
}

function copyHtmlCode() {
  const textToCopy = getTextForActiveView();
  if (!textToCopy) {
    return;
  }

  if (!navigator.clipboard) {
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    return;
  }

  navigator.clipboard.writeText(textToCopy).catch(() => {
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  });
}

function initHtmlVersionControls() {
  const paragraphCount = document.querySelector("#paragraphCount");
  const paragraphDensity = document.querySelector("#paragraphDensity");
  const copyButton = document.querySelector("#copyHtmlButton");
  const tabRadios = document.querySelectorAll("input[name='tabs']");

  if (!paragraphCount || !paragraphDensity || !copyButton) {
    return;
  }

  paragraphCount.addEventListener("input", updateHtmlVersion);
  paragraphDensity.addEventListener("input", updateHtmlVersion);
  copyButton.addEventListener("click", () => {
    copyHtmlCode();
    copyButton.textContent = "Copié !";
    setTimeout(() => {
      copyButton.textContent = getCopyButtonText();
    }, 1500);
  });

  tabRadios.forEach((radio) => {
    radio.addEventListener("change", updateCopyButtonLabel);
  });

  updateHtmlVersion();
  updateCopyButtonLabel();
}

if (document.readyState !== "loading") {
  initHtmlVersionControls();
} else {
  document.addEventListener("DOMContentLoaded", initHtmlVersionControls);
}

// On récupère le form
var form = document.querySelector("#schnapsit");
if (form) {
  // On reset le form pour que ce soit toujours l'input 1 cochée par défaut
  form.reset();
  // On écoute les changements du formulaire
  form.addEventListener("change", (e) => {
    // récupère la value de l'input pour changer l'url du codePen
    switchPenId(e.target.value);
  });
}

function switchPenId(penId) {
  // On récupère l'iframe via sa classe
  const pen = document.querySelector(".cp_embed_iframe");
  if (pen) {
    // On récupère le src de l'iframe sous forme d'url pour gérer ses paramètres
    let url = new URL(pen.src);
    // On récupère l'ancien id de pen, celui qui se trouve après le dernier slash de pathname
    const oldPenid = url.pathname.slice(url.pathname.lastIndexOf("/") + 1);
    // Si j'ai bien reçu un id de codePen et qu'il est différent de l'ancien
    if (penId && penId !== oldPenid) {
      // Je coupe le pathname actuel après le dernier slash (pour virer l'ancien id) et je concatène avec le nouvel id
      url.pathname =
        url.pathname.slice(0, url.pathname.lastIndexOf("/") + 1) + penId;
      pen.src = url; // appliqué c'est pesé
    }
    // Test divers
    // console.log('___ switchPenId ___')
    // console.log('new pen id:', penId)
    // console.log('old pen id:', oldPenid)
  }
}
