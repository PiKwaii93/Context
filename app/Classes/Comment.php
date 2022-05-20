<?php

class Comment
{
    private int $id;
    private string $idFilm;
    private int $authorId;
    private string $date;
    private string $text;
    private string $description;
    private string $title;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return Comment
     */
    public function setId(int $id): Comment
    {
        $this->id = $id;
        return $this;
    }

        /**
     * @return string
     */
    public function getIdFilm(): string
    {
        return $this->idFilm;
    }

    /**
     * @param string $idFilm
     * @return Comment
     */
    public function setIdFilm(string $idFilm): Comment
    {
        $this->idFilm = $idFilm;
        return $this;
    }

    /**
     * @return int
     */
    public function getAuthorId(): int
    {
        return $this->authorId;
    }

    /**
     * @param int $authorId
     * @return Comment
     */
    public function setAuthorId(int $authorId): Comment
    {
        $this->authorId = $authorId;
        return $this;
    }

    /**
     * @return string
     */
    public function getDate(): string
    {
        return $this->date;
    }

    /**
     * @param string $date
     * @return Comment
     */
    public function setDate(string $date): Comment
    {
        $this->date = $date;
        return $this;
    }

    /**
     * @return string
     */
    public function getText(): string
    {
        return $this->text;
    }

    /**
     * @param string $text
     * @return Comment
     */
    public function setText(string $text): Comment
    {
        $this->text = $text;
        return $this;
    }

        /**
     * @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * @param string $Description
     * @return Comment
     */
    public function setDescription(string $description): Comment
    {
        $this->description = $description;
        return $this;
    }

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @param string $Title
     * @return Comment
     */
    public function setTitle(string $title): Comment
    {
        $this->title = $title;
        return $this;
    }


}
