<?php

class Film
{
    private int $id;
    private string $titre;
    private string $description;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return Film
     */
    public function setId(int $id): Film
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return string
     */
    public function getTitre(): string
    {
        return $this->titre;
    }

    /**
     * @param string $titre
     * @return Film
     */
    public function setTitre(string $titre): Film
    {
        $this->titre = $titre;
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
     * @param string $description
     * @return Film
     */
    public function setDescription(string $description): Film
    {
        $this->description = $description;
        return $this;
    }


}

