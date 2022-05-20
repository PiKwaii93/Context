<?php

require_once 'headers.php';
require_once 'Classes/PDOFactory.php';
require_once 'Classes/Comment.php';

$pdo = (new PDOFactory())->getPdo();

$query = $pdo->query('SELECT DISTINCT * FROM comments 
INNER JOIN User
ON comments.authorId = User.id
INNER JOIN films
ON comments.idFilm = films.id
ORDER BY `date` DESC');
$query->setFetchMode(PDO::FETCH_ASSOC);

$res = [];

foreach ($query->fetchAll() as $post) {
//    var_dump($post);
    $res[] = [
        'id' => $post['idComments'],
        'idFilm' => $post['idFilm'],        
        "date" => $post['date'],
        'text' => $post['text'],
        'author' => $post['username'],
        'title' => $post['titre'],
        'description' => $post['description']
    ];
}

echo json_encode($res);
