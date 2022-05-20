<?php

require_once 'headers.php';
require_once 'Classes/PDOFactory.php';
require_once 'Classes/User.php';
require_once 'Classes/Comment.php';

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
$commentText = $_POST['text'] ?? '';
$commentIdFilm = $_POST['idFilm'] ?? '';

var_dump($commentText);
var_dump($commentIdFilm);

if (!$token) {
    echo json_encode([
        'status' => 'error',
        'message' => 'You need a bearer token to post here'
    ]);
    exit;
}


if (!$commentIdFilm || !$commentText) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Your comment needs a text and an id'
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

    $comment = (new Comment())
        ->setText($commentText)
        ->setIdFilm($commentIdFilm)
        ->setAuthorId($user->getId());

    $update = $pdo->prepare('INSERT INTO comments (text, idFilm, authorId, date) VALUES (:text, :idFilm, :authorId, NOW())');
    $update->bindValue('text', $comment->getText(), PDO::PARAM_STR);
    $update->bindValue('idFilm', $comment->getIdFilm(), PDO::PARAM_STR);
    $update->bindValue('authorId', $user->getId(), PDO::PARAM_INT);

    if ($update->execute()) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Comment saved',
            'cookie' => $_COOKIE['hetic_token'] ?? 'expired cookie'
        ]);
    }
}

exit;
