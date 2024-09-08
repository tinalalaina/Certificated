<?php
error_reporting(E_ALL);
ini_set('display_errors',1);
header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$db_conn= mysqli_connect("localhost","root", "", "dashboardmistral1");
if($db_conn===false)
{
  die("ERROR: Could Not Connect".mysqli_connect_error());
}

$method = $_SERVER['REQUEST_METHOD'];

switch($method)
{
  case "GET":
    $path = explode('/', $_SERVER['REQUEST_URI']);

    if (isset($path[4]) && is_numeric($path[4])) {
        $json_array = array();
        $userid = $path[4];
        $getuserrow = mysqli_query($db_conn, "SELECT * FROM users WHERE id='$userid' ");
        $userrow = mysqli_fetch_assoc($getuserrow);
        if ($userrow) {
            echo json_encode($userrow);
        } else {
            echo json_encode(["error" => "Product not found"]);
        }
    } else {
        $allproduct= mysqli_query($db_conn, "SELECT * FROM users");
        if(mysqli_num_rows($allproduct) > 0)
        {
            while($row= mysqli_fetch_array($allproduct))
            {
                $json_array["productdata"][]= array("id"=>$row['id'],
                "username"=>$row["username"],
                "role"=>$row["role"],
                "is_connected"=>$row["is_connected"]
            );
            }
            echo json_encode($json_array["productdata"]);
            return;
        } else {
            echo json_encode(["result"=>"please check the Data"]);
            return;
        }
    }
    break;

  case "DELETE":
    $path = explode('/', $_SERVER['REQUEST_URI']);
    if (isset($path[4]) && is_numeric($path[4])) {
        $userid = $path[4];
        $deleteuser = mysqli_query($db_conn, "DELETE FROM users WHERE id='$userid'");
        if ($deleteuser) {
            echo json_encode(["message" => "User deleted successfully"]);
        } else {
            echo json_encode(["error" => "Failed to delete user"]);
        }
    } else {
        echo json_encode(["error" => "Invalid user ID"]);
    }
    break;
}
?>