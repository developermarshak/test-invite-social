<?php

namespace App\Controller;

use App\Repository\InviteRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class StatisticsController extends BaseController
{
    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @var InviteRepository
     */
    private $inviteRepository;

    function __construct(Security $security, UserRepository $userRepository, InviteRepository $inviteRepository)
    {
        $this->userRepository = $userRepository;
        $this->inviteRepository = $inviteRepository;
        parent::__construct($security);
    }

    /**
     * Get stat of registered users by invite and waiting invite
     *
     * @Route("/api/stat", name="stat", methods={"GET"})
     */
    function getStat(){
        $user = $this->getCurrentUser();

        return new JsonResponse([
            "registered" => $this->userRepository->countByUserFromId($user->getId()),
            "wait" => $this->inviteRepository->countByCreatorId($user->getId())
            ]);
    }
}