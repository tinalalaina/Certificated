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
$password = $data->password;

$sql = "SELECT * FROM users WHERE username='$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        // Update is_connected to 1
        $updateSql = "UPDATE users SET is_connected=1 WHERE username='$username'";
        $conn->query($updateSql);

        echo json_encode(["success" => true, "username" => $user['username'], "role" => $user['role']]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid password"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "User not found"]);
}

$conn->close();
?>