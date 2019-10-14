<?php
namespace App\Controller;

use App\Entity\Invite;
use App\Entity\User;
use App\Exceptions\ApiException;
use App\Repository\InviteRepository;
use App\Entity\Builder\InviteBuilder;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Validator\Constraints\Collection;
use Symfony\Component\Validator\Constraints\Email;

class InviteController extends BaseController
{
    /**
     * @var InviteRepository
     */
    protected $inviteRepository;

    function __construct(Security $security, InviteRepository $inviteRepository)
    {
        parent::__construct($security);
        $this->inviteRepository = $inviteRepository;
    }

    /**
     * Create invite by current user
     *
     * Response Headers: {
     *    'X-Location': 'invite_location'
     * }
     *
     * @Route("/api/invite", name="invite_create", methods={"POST"})
     */
    public function create(Request $request, InviteBuilder $inviteBuilder)
    {
        $user = $this->getCurrentUser();
        $invites = $this->inviteRepository->countByCreatorId($user->getId());

        if($invites >= 5){
            throw new ApiException(
                "Too many not activated invite please use it",
                400
            );
        }

        $this->validateCreateData($request->request->all());

        $invite = $inviteBuilder->buildByCurrentUser($this->getCurrentUser(), $request->get('to'));
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($invite);
        $entityManager->flush();

        $response = new Response();
        $response->setStatusCode(201);
        $response->headers->add(
            ['X-Location'=> '/invite/'.$invite->getId()]
        );

        return $response;
    }

    /**
     * Method for get invite data
     *
     * @Route("/api/invite/{inviteId}", name="invite_get", methods={"GET"})
     *
     * Response : {
     *   code:"code",
     *   for_email:"some_email@gmail.com"
     * }
     *
     * @param string $inviteId
     *
     * @return object|void
     */
    public function get(string $inviteId){
        $user = $this->getCurrentUser();
        $invite = $this->inviteRepository->findByCreatorIdAndInviteId($user->getId(), $inviteId);

        if(count($invite) < 1 || !$invite[0] instanceof Invite){
            throw new NotFoundHttpException(
                'Your invite not found'
            );
        }

        $invite = $invite[0];
        /** @var Invite $invite */

        return new JsonResponse([
            "code" => $invite->getCode(),
            "for_email" => $invite->getForEmail()
        ]);
    }

    /**
     * Return short registration data
     *
     * @Route("/api/registration_invite/{code}", name="registration_invite_by_code", methods={"GET"})
     *
     * Response : {
     *   code:"code",
     *   for_email:"some_email@gmail.com"
     * }
     *
     * @param string $code
     *
     * @return object|void
     */
    public function getByCode(string $code){
        $invite = $this->inviteRepository->findBy([
            "code" => $code
        ]);

        if(count($invite) < 1 || !$invite[0] instanceof Invite){
            throw new NotFoundHttpException(
                'Your invite not found'
            );
        }

        $invite = $invite[0];
        /** @var Invite $invite */

        return new JsonResponse([
            "code" => $invite->getCode(),
            "for_email" => $invite->getForEmail()
        ]);
    }

    /**
     * Get all invites of this user
     *
     * @Route("/api/invite", name="invite_get", methods={"GET"})
     * Response : {
     *   code:"code",
     *   for_email:"some_email@gmail.com"
     * }[]
     * @return object|void
     */
    public function getAll(){
        $user = $this->getCurrentUser();
        $invites = $this->inviteRepository->findByCreatorId($user->getId());

        $response = [];

        foreach ($invites as $invite){
            /** @var Invite $invite */
            $response[] = [
                "code" => $invite->getCode(),
                "for_email" => $invite->getForEmail()
            ];
        }


        return new JsonResponse($response);
    }

    /**
     * Validate email from request.
     *
     * @param array $data
     */
    protected function validateCreateData($data){
        $constraints = new Collection([
            'to' => [new Email()]
        ]);

        $this->validate($data, $constraints);
    }
}