<?php
include_once '../dbh.inc.php';

$translate = "SELECT * FROM lesson_match order by RAND() LIMIT 5";
$result = mysqli_query($conn, $translate);

$match = array();

while($row = mysqli_fetch_assoc($result)) {
    $match[] = $row;
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

echo json_encode(utf8ize($match));

