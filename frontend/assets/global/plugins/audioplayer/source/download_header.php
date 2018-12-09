<?php



$path = 'sounds/adg3.mp3';
$name = 'song.mp3';


if(isset($_GET['path'])){
    $path = $_GET['path'];
}
if(isset($_GET['name'])){
    $name = $_GET['name'];
}

if(strpos($path,'sounds/')!==0){
    die("NOT ALLOWED!");
}


header('Content-Disposition: attachment; filename="'.$name.'"');

echo file_get_contents($path);