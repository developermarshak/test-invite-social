<?php

namespace App\Controller;

use App\Entity\User;
use App\Exceptions\ValidationApiException;
use App\Repository\UserRepository;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Encoder\EncoderFactoryInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Validator\Constraints\Collection;
use Symfony\Component\Validator\Constraints\GreaterThan;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Security\Core\Validator\Constraints\UserPasswordValidator;
use Symfony\Component\Security\Core\Validator\Constraints as SecurityAssert;

use Symfony\Component\Validator\Constraints\Required;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserController extends BaseController
{
    /**
     * @var UserRepository $userRepository
     */
    protected $userRepository;

    /**
     * @var ValidatorInterface
     */
    protected $validator;

    /**
     * @var UserPasswordEncoderInterface $passwordEncoder
     */
    protected $passwordEncoder;

    /**
     * @var TokenStorageInterface $tokenStorage
     */
    protected $tokenStorage;

    /**
     * @var TokenStorageInterface $encoderFactory
     */
    protected $encoderFactory;

    function __construct(
        Security $security,
        UserRepository $userRepository,
        ValidatorInterface $validator,
        UserPasswordEncoderInterface $passwordEncoder,
        TokenStorageInterface $tokenStorage,
        EncoderFactoryInterface $encoderFactory
    )
    {
        $this->userRepository = $userRepository;
        $this->validator = $validator;
        $this->passwordEncoder = $passwordEncoder;
        $this->tokenStorage = $tokenStorage;
        $this->encoderFactory = $encoderFactory;
        parent::__construct($security);
    }

    /**
     * Get list of users by page
     *
     * @Route("/api/user", name="users", methods={"GET"})
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function getAll(Request $request){
        $page = $request->get('page', 1);
        $this->validateGetAllData($page);
        list($users, $page, $total, $pages) = $this->userRepository->getAll($page);

        $usersRes = [];

        foreach ($users as $user){
            $usersRes[] = $this->formatUser($user);
        }

        return new JsonResponse([
            "users" => $usersRes,
            "page"  => $page,
            "total" => $total,
            "pages" => $pages
        ]);
    }

    /**
     * Get current user profile data
     *
     * @Route("/api/user/me", name="user_me", methods={"GET"})
     *
     * @return JsonResponse
     */
    public function getMe(){
        $user = $this->getCurrentUser();
        return new JsonResponse(
            $this->formatUser($user)
        );
    }

    /**
     * Format from user to key value object for response
     *
     * @param User $user
     *
     * @return array
     */
    protected function formatUser(User $user){
        return [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'photo'    => $user->getPhoto(),
            'description' => $user->getDescription()
        ];
    }

    /**
     * Action for change password of current user
     *
     * @Route("/api/user/me/password", name="user_edit_password", methods={"PUT"})
     *
     * @param Request $request
     *
     * @return Response
     */
    public function editPassword(Request $request)
    {
        $user = $this->getCurrentUser();

        $this->validateEditPasswordData($request->request->all());

        if($password = $request->get('password')){
            $password = $this->passwordEncoder->encodePassword($user, $password);
            $user->setPassword($password);
        }

        $manager = $this->getDoctrine()->getManager();

        $manager->persist($user);
        $manager->flush();

        $response = (new Response())->setStatusCode('204');
        $response->headers->add([
            'X-Location' => '/api/user/me'
        ]);

        return $response;
    }

    /**
     * Action for edit description of current user
     *
     * @Route("/api/user/me", name="user_edit", methods={"PUT"})
     *
     * @param Request $request
     *
     * @return Response
     */
    public function edit(Request $request)
    {
        $user = $this->getCurrentUser();
        $this->validateEditData($request->request->all());

        $user->setDescription($request->get('description'));
        if($password = $request->get('password')){
            $password = $this->passwordEncoder->encodePassword($user, $password);
            $user->setPassword($password);
        }


        $manager = $this->getDoctrine()->getManager();

        $manager->persist($user);
        $manager->flush();

        $response = (new Response())->setStatusCode('204');
        $response->headers->add([
            'X-Location' => '/api/user/me'
        ]);

        return $response;
    }

    /**
     * Validate edit profile data
     *
     * @param $data
     */
    protected function validateEditData($data){
        $constraints = new Collection([
            'description' => [new Length([
                'maxMessage' => 'Your description should be at least {{ limit }} characters',
                'max' => 4096,
            ])]]
        );

        $this->validate($data, $constraints);
    }

    /**
     * Validate data from edit password
     *
     * @param $data
     */
    protected function validateEditPasswordData($data){
        $oldPassword = $data['old_password'];

        $user = $this->getCurrentUser();
        $encoder = $this->encoderFactory->getEncoder($user);
        $valid = $encoder->isPasswordValid($user->getPassword(), $oldPassword, $user->getSalt());
        if(!$valid){
            throw new ValidationApiException("Old password not correct.");
        }

        $constraints = new Collection([
                'old_password' => [new Required()],
                'password' => [new Length([
                    'maxMessage' => 'Your password should be at least {{ limit }} characters',
                    'max' => 4096,
                ])]]
        );

        $this->validate($data, $constraints);
    }

    /**
     * Validate page from request for get list of users
     *
     * @throws ValidationApiException
     * @param string $page
     */
    protected function validateGetAllData(string $page){
        $constraint = new GreaterThan(0);

        $errors = $this->validator->validate(
            $page,
            $constraint
        );

        if (0 !== count($errors)) {
            $exception = new ValidationApiException();
            throw $exception->setData($errors);
        }

    }
}
