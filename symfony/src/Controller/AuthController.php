<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class AuthController extends BaseController
{
    /**
     * @Route("/api/auth/login", name="login", methods={"POST"})
     *
     * Login method for show auth errors
     */
    public function login(Request $request, AuthenticationUtils $authenticationUtils)
    {

        $errors = $authenticationUtils->getLastAuthenticationError();
        if(empty($errors)){
            $this->getCurrentUser();
            $response = (new Response())->setStatusCode(200);
            $response->headers->add([
                'X-Location' => '/user/me'
            ]);
            return $response;
        }
        else{
            return new JsonResponse($errors, 401);
        }


    }
}
