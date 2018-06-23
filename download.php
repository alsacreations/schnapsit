<?php

// S'il y a une valeur, on la copie dans une variable locale
if(isset($_GET['gab']) && $_GET['gab']) $gab = $_GET['gab'];
// Sinon on quitte
else exit;

// Si la valeur ne correspond pas à ce que l'on attend, on quitte
if(!preg_match('/^(tmp)([0-9a-f]{13})$/',$gab,$patterns)) exit;

/*
 * Retrait des éventuels CSRF
 */

$gab = str_replace( '.', '', $gab );
$gab = str_replace( '/', '', $gab );

// À partir d'ici tout va bien...
$filename = 'archive/download/'.$gab.'.zip';

if(file_exists($filename)) {
  header('Content-Transfer-Encoding: binary'); //Transfert en binaire (fichier).
  header('Content-Disposition: attachment; filename="'.$gab.'.zip"'); //Nom du fichier.
  header('Content-Length: '.filesize($filename)); //Taille du fichier.
  header('Content-type: application/zip');
  ob_clean();
  readfile($filename);
  unlink($filename);
}

// Nettoyage des fichiers zip précédents
$zips = glob('./archive/download/*.zip');
foreach($zips as $zip) {
  unlink('./archive/download/'.$zip);
}

//EOF
