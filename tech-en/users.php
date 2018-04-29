<?php
// JSON má problém s diakritikou
include_once 'scripts/dbh.inc.php';

$array = array();

$translate = "SELECT * FROM users LIMIT 6";
$result = mysqli_query($conn, $translate);


while($row = mysqli_fetch_assoc($result)) {
    $array[] = $row;
}

function utf8ize($d) {
    if (is_array($d)) {
        foreach ($d as $k => $v) {
            $d[$k] = utf8ize($v);
        }
    } else if (is_string ($d)) {
        return utf8_encode($d);
    }
    return $d;
}

echo json_encode(utf8ize($array));