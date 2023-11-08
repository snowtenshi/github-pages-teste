<?php
require '../vendor/autoload.php';  

// use App\Response\JsonResponse;
use \Firebase\JWT\JWT;
use App\Model\Model;
use App\Model\Usuarios;
use App\Controller\UserController;
// use App\Router;
$algoritimo='HS256';
$model = new Model();
$user = new Usuarios();

$usercontroller = new UserController();
$ipautorizado = ['::1', '123.123.123.124'];
// if (!in_array($_SERVER['REMOTE_ADDR'], $ipautorizado)) {
//     echo JsonResponse::make(['error' => 'Acesso não autorizado'], 403);
//     exit;
// }

// $secretKey = $usercontroller->generateToken();
$secretKey = "1234567890098765432112345678900987654321";
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['email']) && isset($data['senha'])) {
    $loginEmail = $data['email'];
    $loginPassword = $data['senha'];
    
    $user->setEmail($loginEmail);
    $user->setSenha($loginPassword);

    $data = $model->select('users', ['email' => $loginEmail]);
    if (!$data) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro interno do servidor.']);
        exit;
    }
    if (!empty($data) && password_verify($loginPassword, $data[0]['senha'])) {
        $user->setId($data[0]['id']);

        $payload = [
            "iss" => "127.0.0.1",
            "aud" => "127.0.0.1",
            "iat" => time(),
            "exp" => time() + (60 * 3),  
            "data" => [
                "user_id" => $user->getId(),
                "email" => $user->getEmail(),
            ]
        ];
        

        $jwt = JWT::encode($payload, $secretKey, $algoritimo);
        $model->create('token', ['id_user' => $user->getId(),'token'=> $jwt]);
        echo json_encode(['token' => $jwt]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Nome de usuário ou senha inválidos.']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Requisição inválida.']);
}
