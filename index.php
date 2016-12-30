<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <title>schnaps.it, générateur de templates HTML5 et CSS3</title>
  <meta name="description" content="Générateur de lorem ipsum alsacien et de template HTML5 CSS3">
  <meta name="keywords" content="lorem, lipsum, générateur, gabarits, structure, HTML, CSS, css, framework, html layout,  grid, template, boilerplate, bootstrap, html5, css3, knacss">
  <meta name="author" content="Alsacreations">

  <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
  <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
  <meta name="theme-color" content="#ffffff">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <link rel="stylesheet" href="assets/css/styles.min.css">

</head>

<body>

  <header>
    <h1><img src="assets/img/logo.png" alt="Schnaps.it"></h1>
    <p class="pre-title">since 1664</p>
    <p>Yeuh, t'en as marre de tous ces knèkes et de leurs Lorem Ipsum en latin, gal&nbsp;?
      <br>Alors profite du Schnapsum en alsacien, le langage moderne et tendance pour créer tes faux textes et remplir tes pages de contenu. Hopla&nbsp;!</p>
  </header>

  <section class="schnapsum">
    <input type="radio" name="tabs" id="tab1" checked>
    <label for="tab1" class="button">version mélanchée</label>
    <input type="radio" name="tabs" id="tab2">
    <label for="tab2" class="button">version paragraphe</label>

    <div class="quotes">
      <blockquote class="quote" id="quote1">Lorem Elsass Ipsum mitt picon bière munster du ftomi! Ponchour bisame. Bibbeleskaas jetz rossbolla sech choucroute un schwanz geburtstàg, Chinette dû, ìch bier deppfele schiesser. Flammekueche de knèkes Seppele gal! a hopla geburtstàg, alles fraü Chulia Roberts oder knäckes dûû blottkopf. Noch bredele schissabibala, yeuh e schmutz. E gewurtztraminer doch Carola schneck, schmutz a riesling de chambon eme rucksack Roger dû hopla geiss, jetz Chorchette de Scharrarbergheim. Kouglopf ech ìch wurscht gueut mitt schneck jetz a schiss mannele, knèkes saucisse de Niederhausbergen of fill mauls schéni fleischwurcht schnaps de eme gal nüdle blottkopf, de Chulien Roger hop pfourtz! bett mer ech schpeck un salami schmutz. Gal!</blockquote>

      <blockquote class="quote" id="quote2"><pre><code class="html">&lt;p&gt;Lorem Salu bissame &excl; Wie geht&apos;s les samis &quest; Hans apporte moi une Wurschtsalad avec un picon bitte&comma; s&apos;il te pla&icirc;t&period; Voss &quest; Une Carola et du Melfor &quest; Yo d&ucirc;&comma; esp&egrave;ce de Kn&auml;ckes&comma; ch&apos;ai dit un picon&excl;&lt;&sol;p&gt;&NewLine;&lt;p&gt;Yoo ch ch&apos;ai ramen&eacute; du schpeck&comma; du chambon&comma; un kuglopf et du schnaps dans mon rucksack&period; Allez&comma; s&apos;guelt &excl;&lt;&sol;p&gt;&NewLine;&lt;p&gt;Wotch a kofee avec ton bibalaekaess et ta wurscht &quest; Yeuh non che suis au r&eacute;chime&comma; je ne mange plus que des Grumbeere light et che fais de la chym avec Chulien&period; Tiens&comma; un rottznoz sur le comptoir&period;&lt;&sol;p&gt;&NewLine;&lt;p&gt;Bande de kn&auml;ckes&excl;&lt;&sol;p&gt;</code></pre></blockquote>
    </div>
  </section>

  <form enctype="multipart/form-data" id="schnapsit">
    
    <?php echo '<pre style="padding:10px">';
    print_r( $_POST );
    echo '</pre>'; ?>

    <section class="template">
      
      <div class="autogrid">
        
        <div class="autogrid-item">
          <label for="title">Titre</label>
          <input type="text" name="title" id="title" <?php if( isset( $_POST['title'] ) && empty( $_POST['title'] ) ) { echo 'value="' . htmlentities( $_POST['title'] ) . '"'; } else { echo 'value="J\'aime Schnaps.it"'; } ?> placeholder="J'aime Schnaps.it">
        </div>

        <div class="autogrid-item">
          <input type="checkbox" name="jquery" id="jquery" <?php if(isset($_POST['jquery'])) { echo 'checked="checked"'; } ?>>
          <label for="jquery">Intégrer jQuery ?</label>
        </div>

        <div class="autogrid-item">
          <input type="checkbox" name="ga" id="ga" <?php if(isset($_POST['ga'])) { echo 'checked="checked"'; } ?>>
          <label for="ga">Google Analytics</label>
          
          <label for="ua">ID de suivi</label>
          <input type="text" name="ua" id="ua" <?php if( isset( $_POST['ua'] ) && empty( $_POST['ua'] ) ) { echo 'value="' . htmlentities( $_POST['ua'] ) . '"'; } ?> placeholder="UA-XXXXX-X">
        </div>

      </div>

      <img class="fr" alt="la réflexion c'est maintenant" src="assets/img/cerveau.png">
      <h2>Ton template HTML maintenant ? Hopla !</h2>
      <p>Choisis ton gabarit en fonction de tes besoins (nombre de colonnes, hauteurs identiques, grille intégrée), puis télécharge le code source obtenu.</p>
      <p>Dans ton dossier .zip tu trouveras l'ensemble des fichiers nécessaires&nbsp;: HTML et CSS, ainsi que le fichier CSS du micro-framework <a href="http://knacss.com/">KNACSS</a> pour parfaire ton projet.</p>

      <fieldset class="autogrid">
        <a class="template-item gabarit" href="#">
          <img alt="nope" src="assets/img/gabarit/00.png">
          <span>structure HTML seule</span>
          <input type="radio" name="gabarit" id="gabarit0" class="visually-hidden" value="gabarit0">
        </a>
        <a class="template-item gabarit" href="#">
          <img alt="simple" src="assets/img/gabarit/01.png">
          <span>une seule colonne, entête, contenu</span>
          <input type="radio" name="gabarit" id="gabarit11" class="visually-hidden" value="gabarit11">
        </a>
        <a class="template-item gabarit" href="#">
          <img alt="nope" src="assets/img/gabarit/05.png">
          <span>sidebar, contenu fluide</span>
          <input type="radio" name="gabarit" id="gabarit12" class="visually-hidden" value="gabarit12">
        </a>
        <a class="template-item gabarit" href="#">
          <img alt="nope" src="assets/img/gabarit/07.png">
          <span>entête, sidebar, contenu fluide</span>
          <input type="radio" name="gabarit" id="gabarit13" class="visually-hidden" value="gabarit13">
        </a>
        <a class="template-item gabarit" href="#">
          <img alt="simple" src="assets/img/gabarit/01.png">
          <span>entête, sidebar, contenu fluide, footer</span>
          <input type="radio" name="gabarit" id="gabarit14" class="visually-hidden" value="gabarit14">
        </a>
        <a class="template-item gabarit" href="#">
          <img alt="nope" src="assets/img/gabarit/05.png">
          <span>entête, double sidebar, contenu fluide, footer</span>
          <input type="radio" name="gabarit" id="gabarit21" class="visually-hidden" value="gabarit21">
        </a>
        <a class="template-item gabarit" href="#">
          <img alt="nope" src="assets/img/gabarit/07.png">
          <span>entête, grille x3, footer</span>
          <input type="radio" name="gabarit" id="gabarit22" class="visually-hidden" value="gabarit22">
        </a>
        <a class="template-item gabarit" href="#">
          <img alt="nope" src="assets/img/gabarit/07.png">
          <span>entête, grille x6, footer</span>
          <input type="radio" name="gabarit" id="gabarit23" class="visually-hidden" value="gabarit23">
        </a>
      </fieldset>

      <div id="mockup-place">
        <!-- code mockup ici -->
      </div>

      <h2>Y'a quoi dans mon template ?</h2>
      <ul>
        <li>une structure de base HTML5 propre</li>
        <li>une <a href="http://www.alsacreations.com/article/lire/1490-comprendre-le-viewport-dans-le-web-mobile.html">meta "viewport"</a> pour le Responsive Webdesign</li>
        <li>la feuille de styles CSS du framework <a href="http://knacss.com/">KNACSS</a></li>
        <li>un fichier <a href="http://editorconfig.org/">.editorconfig</a> pour favoriser les conventions du projet</li>
        <li>du lorem ipsum alsacien ♥</li>
      </ul>
    </section>
  </form>


  <footer>
    <h2>Yeuh, mais c'est quoi le secret ?</h2>
    <p>Schnaps.it est un outil permettant de générer la structure de base d'une page HTML en un clic, réalisé par l'agence web <a href="http://www.alsacreations.fr">Alsacréations</a>.
      <br>En plus d'offrir des modèles HTML de base, Schnaps.it inclut les classes CSS du framework <a href="http://knacss.com/">KNACSS</a> offrant une personnalisation aisée de ta page.
      <br>Les textes par défaut sont remplis avec l'algorithme savant <i>Schnapsum®</i>, le lorem ipsum alsacien.</p>
    <p>Ah oui, j'oubliais. Tu savais donc qu'il existe aussi un <a class="button button--alternate" href="https://github.com/raphaelgoetter/brackets-schnapsum">plugin brackets</a> et un <a class="button button--alternate" href="https://gist.github.com/raphaelgoetter/69c84d434ee202dc5c9495591075e2df">snippet Atom</a></p>

  </footer>

  <div class="choice">
    <a class="quit">Q</a>
    <span class="margin">Margin</span>
      <input type="radio" name="mar" class="visually-hidden" value="mal"><label>Large</label>
      <input type="radio" name="mar" class="visually-hidden" value="mam"><label>Moyen</label>
      <input type="radio" name="mar" class="visually-hidden" value="mas"><label>Fin</label>
      <input type="radio" name="mar" class="visually-hidden" value=""><label>Défaut</label>
      <input type="radio" name="mar" class="visually-hidden" value="ma0"><label>Aucune</label>
    <span class="padding">Padding</span>
      <input type="radio" name="pad" class="visually-hidden" value="pal"><label>Large</label>
      <input type="radio" name="pad" class="visually-hidden" value="pam"><label>Moyen</label>
      <input type="radio" name="pad" class="visually-hidden" value="pas"><label>Fin</label>
      <input type="radio" name="pad" class="visually-hidden" value=""><label>Défaut</label>
      <input type="radio" name="pad" class="visually-hidden" value="pa0"><label>Aucun</label>
    <span class="largeur">Width</span>
      <input type="radio" name="lar" class="visually-hidden" value="w10"><label>10%</label>
      <input type="radio" name="lar" class="visually-hidden" value="w20"><label>20%</label>
      <input type="radio" name="lar" class="visually-hidden" value="w25"><label>25%</label>
      <input type="radio" name="lar" class="visually-hidden" value="w30"><label>30%</label>
      <input type="radio" name="lar" class="visually-hidden" value="w33"><label>33%</label>
      <input type="radio" name="lar" class="visually-hidden" value="w40"><label>40%</label>
      <input type="radio" name="lar" class="visually-hidden" value="w50"><label>50%</label><br>
      <input type="radio" name="lar" class="visually-hidden" value="w60"><label>60%</label>
      <input type="radio" name="lar" class="visually-hidden" value="w66"><label>66%</label>
      <input type="radio" name="lar" class="visually-hidden" value="w70"><label>70%</label>
      <input type="radio" name="lar" class="visually-hidden" value="w75"><label>75%</label>
      <input type="radio" name="lar" class="visually-hidden" value="w80"><label>80%</label>
      <input type="radio" name="lar" class="visually-hidden" value="w90"><label>90%</label>
      <input type="radio" name="lar" class="visually-hidden" value="w100"><label>100%</label>
      <input type="radio" name="lar" class="visually-hidden" value="auto"><label>auto</label>
    <span class="text">Text-align</span>
      <input type="radio" name="txt" class="visually-hidden" value="txtleft"><label>Gauche</label>
      <input type="radio" name="txt" class="visually-hidden" value="txtcenter"><label>Centre</label>
      <input type="radio" name="txt" class="visually-hidden" value="txtright"><label>Droite</label>
    <a class="supression">Supprimer cet élément</a>
  </div>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script> 
  <script type="text/javascript" src="assets/js/global.js"></script>
  <script type="text/javascript">
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-1456483-20']);
    _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script');
      ga.type = 'text/javascript';
      ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(ga, s);
    })();
  </script>

</body>

</html>
