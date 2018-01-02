<?php

header('Content-Type: application/json');

$id = $_GET['id'];

include_once 'dbh.inc.php';

$id=$_POST['id'];
$delete = "DELETE FROM users WHERE id=$id";
$result = mysql_query($delete) or die(mysql_error());