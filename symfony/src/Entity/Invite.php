<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Invite entity
 *
 * @ORM\Entity(repositoryClass="App\Repository\InviteRepository")
 */
class Invite
{
    const STATUS_NEW = 'new';

    const STATUS_USED = 'used';

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     */
    private $code;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $status;

    /**
     * @ORM\Column(type="integer")
     */
    private $from_user_id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $for_email;

    /**
     * @ORM\Column(type="datetime")
     */
    private $expired_at;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): self
    {
        $this->code = $code;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getFromUserId(): ?int
    {
        return $this->from_user_id;
    }

    public function setFromUserId(int $from_user_id): self
    {
        $this->from_user_id = $from_user_id;

        return $this;
    }

    public function getForEmail(): ?string
    {
        return $this->for_email;
    }

    public function setForEmail(string $for_email): self
    {
        $this->for_email = $for_email;

        return $this;
    }

    public function getExpiredAt(): ?\DateTimeInterface
    {
        return $this->expired_at;
    }

    public function setExpiredAt(\DateTimeInterface $expired_at): self
    {
        $this->expired_at = $expired_at;

        return $this;
    }
}
