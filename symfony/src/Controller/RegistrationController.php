<?php

namespace App\Controller;

use App\Entity\Invite;
use App\Entity\User;
use App\Repository\InviteRepository;
use App\Repository\UserRepository;
use App\Exceptions\ValidationApiException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Validator\Constraints\Collection;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class RegistrationController extends BaseController
{

    /***
     * @var UserPasswordEncoderInterface
     */
    private $passwordEncoder;

    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @var InviteRepository
     */
    private $inviteRepository;

    function __construct(Security $security, UserPasswordEncoderInterface $passwordEncoder, UserRepository $userRepository, InviteRepository $inviteRepository)
    {
        $this->passwordEncoder = $passwordEncoder;
        $this->userRepository = $userRepository;
        $this->inviteRepository = $inviteRepository;
        parent::__construct($security);
    }

    /**
     * User registration action
     *
     * @Route("/api/registration", name="registration", methods={"POST"})
     *
     * Response header: { ['X-Location'=> '/auth/login'] }
     *
     * @param Request $request
     *
     * @return Response
     * @throws \Exception
     */
    public function create(Request $request){
        $this->validateCreateData($request->request->all());
        $inviteCode = $request->get('invite_code');
        $invite = $this->updateInvite(Invite::STATUS_USED, $inviteCode);

        try{
            $user = new User();
            $email = $request->get('email');
            $user->setEmail($email);
            $password = $this->passwordEncoder->encodePassword($user, $request->get('password'));
            $user->setPassword($password);
            $user->setFromUserId($invite->getFromUserId());

            if($this->userRepository->count(['email' => $email]) > 0){
                throw new ValidationApiException("This email used. Please try login with this email.");
            }

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();

            $this->updateInvite('deleted', $inviteCode);

            $response = new Response();
            $response->setStatusCode(201);
            $response->headers->add(
                ['X-Location'=> '/auth/login']
            );

            return $response;
        }
        catch (\Exception $exception){
            $this->updateInvite(Invite::STATUS_NEW, $inviteCode);
            throw $exception;
        }
    }

    /**
     * Update invite found by invite code.
     *
     * @param string $status
     * @param string $inviteCode
     *
     * @throws NotFoundHttpException
     * @return Invite
     */
    protected function updateInvite(string $status, string $inviteCode){
        $invite = $this->inviteRepository->findBy(['code' => $inviteCode]);
        if(count($invite) < 1 || $invite[0]->getStatus() === $status){
            throw new NotFoundHttpException('Invite not found');
        }

        $invite = $invite[0];

        $manager = $this->getDoctrine()->getManager();

        if($status === 'deleted'){
            $manager->remove($invite);
            $manager->flush();
        }
        elseif($status === Invite::STATUS_USED || $status === Invite::STATUS_NEW){
            $invite->setStatus($status);
            $manager->persist($invite);
            $manager->flush();
        }

        return $invite;
    }

    /**
     * Validates a value against a list of constraints.
     *
     * @param array      $data        Data was sent to controller
     *
     * @throws ValidationApiException
     */
    protected function validateCreateData($data)
    {
        $constraints = new Collection([
            'email' => [new Email()]
            ,
            'password' => [
                new NotBlank([
                    'message' => 'Please enter a password',
                ]),
                new Length([
                    'min' => 6,
                    'minMessage' => 'Your password should be at least {{ limit }} characters',
                    'max' => 4096,
                ])],
            'invite_code' => [
                new Length(32)
            ]
        ]);

        $this->validate($data, $constraints);
    }
}
