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
        $getuserrow = mysqli_query($db_conn, "SELECT * FROM tbl_projects WHERE p_id='$userid' ");
        $userrow = mysqli_fetch_assoc($getuserrow);
        if ($userrow) {
            echo json_encode($userrow);
        } else {
            echo json_encode(["error" => "Product not found"]);
        }
    } else {
        $destination= $_SERVER['DOCUMENT_ROOT']."/grostore"."/";
        $allproduct= mysqli_query($db_conn, "SELECT * FROM tbl_projects  WHERE status = 'verified'");
        if(mysqli_num_rows($allproduct) > 0)
        {
            while($row= mysqli_fetch_array($allproduct))
            {
                $json_array["productdata"][]= array("id"=>$row['p_id'],
                "ptitle"=>$row["ptitle"],
                "pprenom"=>$row["pprenom"],
                "pnumero"=>$row["pnumero"],
                "pimage"=>$row["pfile"],
                "verified"=>$row["verified"]
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

  break;
}

?>