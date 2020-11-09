<?php
header('Content-type: application/json'); 
header('Access-Control-Allow-Origin: *');

$jsonInfo = file_get_contents("json/data_cars.json");

$jsonResults = file_get_contents("json/data_attempts.json");

if (isset($_GET['info'])) {
    print_r($jsonInfo);
} elseif (isset($_GET['results'])) {
    print_r($jsonResults);
}
?>