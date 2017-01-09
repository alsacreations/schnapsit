<?php

function deltree($dossier){
  if(($dir=opendir($dossier))===false)
  return;

  while($name=readdir($dir)){
    if($name==="." or $name==="..")
      continue;
    $full_name=$dossier."/".$name;

    if( is_dir($full_name) ) {
      deltree($full_name);
    }
    else {
      unlink($full_name );
    }
  }

  closedir($dir);

  @rmdir($dossier);
}

// Réception des paramètres
if(isset($_POST["datas"]) && !empty( $_POST["datas"] ) ){
  parse_str( $_POST['datas'], $userChoice );
}

/*
 * Start HTML output
 */

ob_start(); ?>
<!doctype html>
<html class="no-js" lang="fr">
  <head>
    <meta charset="UTF-8">
    <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge"><![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title><?php
        if( isset( $userChoice['title'] ) && !empty( $userChoice['title'] ) ) {
          echo $userChoice['title'];
        } else {
          echo 'Titre du document';
        }
      ?></title>
    <link rel="stylesheet" href="css/knacss.css" media="all" />
    <link rel="stylesheet" href="css/styles.css" media="all" />
  </head>
  <body>
    <?php
      if( isset( $_POST['codehtml'] ) && !empty( $_POST['codehtml'] ) ) { echo $_POST['codehtml']; }
      
      if( isset($_POST["googleAnalytics"]) && $_POST["googleAnalytics"] == "true" ) {

      if( !isset($userChoice["ua"]) || !empty( $userChoice["ua"] ) ) { $userChoice["ua"] = 'UA-XXXXXXXX-X'; } ?>
      
      <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create',<?php echo $userChoice['ua'] ?>, 'XXXXXXXXXXX.TLD');
      ga('send', 'pageview');
      </script><?php } ?>

  </body>
</html><?php
  
  /*
   * Build ZIP archive
   */

  if(isset($_POST["compression"]) && $_POST["compression"]=="true") {
    $file_html   = ob_get_contents();
    ob_end_clean();
    $file_knacss = file_get_contents("archive/css/knacss.css");

    // Création des dossiers
    $dossier = 'tmp'.uniqid();
    mkdir("archive/download/".$dossier);
    mkdir("archive/download/".$dossier."/js-test");
    mkdir("archive/download/".$dossier."/css-test");
    mkdir("archive/download/".$dossier."/img-test");

    // Création des fichiers
    $f = fopen("archive/download/".$dossier."/index.html", "x+");
    $s = fopen("archive/download/".$dossier."/css-test/styles.css", "x+");
    $k = fopen("archive/download/".$dossier."/css-test/knacss.css", "x+");
    // Ecriture
    fputs($f, $file_html);
    fputs($s, "/* Votre Style */");
    fputs($k, $file_knacss);
    // Fermeture
    fclose($f);
    fclose($s);
    fclose($k);

    // Zip avec tous les $file_* (éventuellement dans des dossiers)
    // On instancie la classe.
    $zip = new ZipArchive();

    if( is_dir("archive/download/".$dossier."/") ) {
      // On teste si le dossier existe, car sans ça le script risque de provoquer des erreurs.
      
      if($zip->open("archive/download/".$dossier.".zip", ZipArchive::CREATE) == TRUE) {

        // Récupération des fichiers.
        $fichiers = scandir("archive/download/".$dossier."/");
        unset($fichiers[0], $fichiers[1]);

        foreach($fichiers as $f) { 
          $zip->addEmptyDir("css");
          $zip->addEmptyDir("js");
          $zip->addEmptyDir("img");
          $zip->addFile("archive/download/".$dossier."/index.html", "index.html");
          $zip->addFile("archive/download/".$dossier."/css-test/knacss.css", "css/knacss.css");
          $zip->addFile("archive/download/".$dossier."/css-test/styles.css", "css/styles.css");
        }

        // On ferme l’archive.
        $zip->close();

        // On retourne le nom du dossier pour la requête AJAX
        if( strlen( $dossier ) === 16 ) {
          echo $dossier;
        }
      }
      else {
        // Erreur lors de l’ouverture.
        echo "Erreur : impossible de créer l'archive.";
      }
    }
    else {
      echo "Erreur : Le dossier n'existe pas.";
    } 
    //On supprime le dossier
    deltree("archive/download/".$dossier);
  }

//EOF