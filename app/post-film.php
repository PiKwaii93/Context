<?php

require_once 'headers.php';
require_once 'Classes/PDOFactory.php';
require_once 'Classes/User.php';
require_once 'Classes/Film.php';

$token = str_replace('Bearer ', '', getallheaders()['Authorization'] ?? '') ?? '';

/**
 * Je pourrais ne pas passer d'authorization en header
 * et simplement me servir du fait que le cookie d'auth
 * est passé également en requête !
 * Attention cependant à la validité du cookie.
 * Il faudrait le vérifier avant la requête, on en reparle
 * avec les Interceptor de Axios !
 */
$token = $_COOKIE['hetic_token'] ?? '';
$filmTitre = $_POST['titre'] ?? '';
$filmDescription = $_POST['description'] ?? '';

if (!$token) {
    echo json_encode([
        'status' => 'error',
        'message' => 'You need a bearer token to post here'
    ]);
    exit;
}

if (!$filmDescription || !$filmTitre) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Your film needs a titre and a Description'
    ]);
    exit;
}

$pdo = (new PDOFactory())->getPdo();
$query = $pdo->prepare('SELECT * FROM `User` WHERE `token` = :token');
$query->bindValue('token', $token, PDO::PARAM_STR);
$query->setFetchMode(PDO::FETCH_CLASS, User::class);
if ($query->execute()) {
    /** @var User $user */
    $user = $query->fetch();
    var_dump($user);
    if (!$user) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid Token'
        ]);
        exit;
    }

    $film = (new Film())
        ->setTitre($filmTitre)
        ->setDescription($filmDescription)
        ->setId($user->getId());

    $update = $pdo->prepare('INSERT INTO films (titre, description) VALUES (:titre, :description)');
    $update->bindValue('titre', $film->getTitre(), PDO::PARAM_STR);
    $update->bindValue('description', $film->getDescription(), PDO::PARAM_STR);

    if ($update->execute()) {
        echo json_encode([
            'status' => 'success',
            'message' => 'film saved',
            'cookie' => $_COOKIE['hetic_token'] ?? 'expired cookie'
        ]);
    }
}

exit;


