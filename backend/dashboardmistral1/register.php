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
$username = isset($data->username) ? trim($data->username) : '';
$password = isset($data->password) ? password_hash($data->password, PASSWORD_DEFAULT) : '';
$role = isset($data->role) ? $data->role : '';

if (empty($username)) {
    echo json_encode(["message" => "Username cannot be empty"]);
} else {
    $sql = "INSERT INTO users (username, password, role) VALUES ('$username', '$password', '$role')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "User registered successfully"]);
    } else {
        echo json_encode(["message" => "Error: " . $sql . "<br>" . $conn->error]);
    }
}

$conn->close();
?>