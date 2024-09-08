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
  case "POST":
    if(isset($_FILES['pfile']))
    {
        $ptitle= $_POST['ptitle'];
        $pprenom= $_POST['pprenom'];
        $pnumero= $_POST['pnumero'];
        $username= $_POST['username'];
        $role= $_POST['role'];
        $pfile= time().$_FILES['pfile']['name'];
        $pfile_temp= $_FILES['pfile']['tmp_name'];
        $destination= $_SERVER['DOCUMENT_ROOT'].'/dashboardmistral1/images_projects'."/".$pfile;

        $result= mysqli_query($db_conn,"INSERT INTO tbl_projects (ptitle, pprenom, pnumero, pfile, username, role, status, created_at)
        VALUES('$ptitle','$pprenom','$pnumero','$pfile','$username','$role', 'unverified', NOW())");

        if($result)
        {
            move_uploaded_file($pfile_temp, $destination);
            echo json_encode(["success"=>"Projet ajouté avec succès"]);
            return;
        } else{
            echo json_encode(["success"=>"Erreur : le projet n'a pas été enregistré"]);
            return;
        }

    } else{
        echo json_encode(["success"=>"Data not in Correct Format"]);
        return;
    }
    break;
    case "GET":
        $path = explode('/', $_SERVER['REQUEST_URI']);
    
        if (isset($path[4]) && $path[4] === 'project-counts') {
            $projectCounts = array();
            $result = mysqli_query($db_conn, "SELECT username, DATE(created_at) as date, COUNT(*) as count FROM tbl_projects GROUP BY username, DATE(created_at)");
    
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $projectCounts[] = $row;
                }
                echo json_encode($projectCounts);
            } else {
                echo json_encode(["error" => "No projects found"]);
            }
        } else {
          $destination= $_SERVER['DOCUMENT_ROOT']."/grostore"."/";
          $allproduct= mysqli_query($db_conn, "SELECT * FROM tbl_projects");
          if(mysqli_num_rows($allproduct) > 0)
          {
              while($row= mysqli_fetch_array($allproduct))
              {
                  $json_array["productdata"][]= array(
                      "id"=>$row['p_id'],
                      "ptitle"=>$row["ptitle"],
                      "pprenom"=>$row["pprenom"],
                      "pnumero"=>$row["pnumero"],
                      "pimage"=>$row["pfile"],
                      "username"=>$row["username"],
                      "role"=>$row["role"],
                      "status"=>$row["status"],
                      "created_at"=>$row["created_at"],
                      "updated_at"=>$row["updated_at"],
                      "updated_by"=>$row["updated_by"],
                      "updated_date"=>$row["updated_date"]
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

    case "PUT":
      $userUpdate= json_decode(file_get_contents("php://input"));
  
      $userid= $userUpdate->id;
      $ptitle= $userUpdate->ptitle;
      $pprenom= $userUpdate->pprenom;
      $pnumero= $userUpdate->pnumero;
      $status= $userUpdate->status; // Ajoutez cette ligne pour obtenir le statut
      $updated_by = $userUpdate->username; // Ajoutez cette ligne pour obtenir l'utilisateur qui fait la mise à jour
  
      $updateData= mysqli_query($db_conn, "UPDATE tbl_projects SET ptitle='$ptitle',pprenom='$pprenom',pnumero='$pnumero', status='$status', updated_at=NOW(), updated_by='$updated_by', updated_date=NOW() WHERE p_id='$userid'");
      if($updateData)
      {
          echo json_encode(["success"=>"Modification enregistrée avec succès"]);
          return;
      } else {
          echo json_encode(["success"=>"Veuillez vérifier les données de l'utilisateur !"]);
          return;
      }
      break;
    case "DELETE":
    $path = explode('/', $_SERVER['REQUEST_URI']);
    $product_id = $path[4] ?? null;

    if ($product_id && is_numeric($product_id)) {
        // Récupérer le nom du fichier image avant de supprimer le projet
        $getProject = mysqli_query($db_conn, "SELECT pfile FROM tbl_projects WHERE p_id='$product_id'");
        $project = mysqli_fetch_assoc($getProject);
        $imagePath = $_SERVER['DOCUMENT_ROOT'] . '/dashboardmistral1/images_projects/' . $project['pfile'];

        // Supprimer le projet de la base de données
        $result = mysqli_query($db_conn, "DELETE FROM tbl_projects WHERE p_id='$product_id'");
        if ($result) {
            // Supprimer le fichier image
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
            echo json_encode(["success" => "Product Deleted Successfully"]);
        } else {
            echo json_encode(["error" => "Failed to delete product"]);
        }
    } else {
        echo json_encode(["error" => "Invalid product ID"]);
    }
    break;
}

?>
