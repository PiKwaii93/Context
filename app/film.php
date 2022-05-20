<?php

require_once 'headers.php';
require_once 'Classes/PDOFactory.php';
require_once 'Classes/Comment.php';

$pdo = (new PDOFactory())->getPdo();

$query = $pdo->query('SELECT * FROM films ');
$query->setFetchMode(PDO::FETCH_ASSOC);

$res = [];

foreach ($query->fetchAll() as $post) {
//    var_dump($post);
    $res[] = [
        'id' => $post['id'],
        'titre' => $post['titre'],        
        "description" => $post['description'],
    ];
}

echo json_encode($res);
