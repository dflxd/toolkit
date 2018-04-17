<?php
header('Content-Type: application/json');
include 'dbh.inc.php';

$data = file_get_contents('php://input'); ;
$translateData = json_decode($data, true);


foreach((array)$translateData as $item=>$v) {

    mysqli_query($conn, "INSERT INTO lesson_translate (translate_english, translate_czech, translate_alternative, translate_alternative2, lesson_number)  
       VALUES ("
                . $v['translate_english'] .","
                . $v['translate_czech'] .","
                . $v['translate_alternative'] .","
                . $v['translate_alternative2'] .","
                . $v['lesson_number'].")");
}
