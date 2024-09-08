<?php
error_reporting(E_ALL);
ini_set('display_errors',1);
header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$conn = mysqli_connect("localhost","root", "", "dashboardmistral1");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"));
$username = $data->username;

$sql = "UPDATE users SET is_connected=0 WHERE username='$username'";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Error updating record: " . $conn->error]);
}

$conn->close();
?>