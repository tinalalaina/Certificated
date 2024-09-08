<?php
error_reporting(E_ALL);
ini_set('display_errors',1);
header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$conn= mysqli_connect("localhost","root", "", "dashboardmistral1");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $conn->prepare("SELECT COUNT(*) as count FROM users WHERE role='admin'");
        $stmt->execute();
        $result = $stmt->get_result();
        $count = $result->fetch_assoc()['count'];

        echo json_encode(['success' => true, 'count' => $count]);
        break;

}
?>