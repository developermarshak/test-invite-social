<?php

namespace App\Controller;

use App\Entity\User;
use App\Exceptions\ValidationApiException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Validator\Constraints\Collection;
use Symfony\Component\Validator\Validation;

class BaseController extends AbstractController
{
    /***
     * @var Security
     */
    protected $security;

    function __construct(Security $security)
    {
        $this->security = $security;
    }

    /**
     * Validates a value against a list of constraints.
     *
     * @param array      $value       Value to validate
     * @param Collection $constraints Optional list of constraints
     *
     * @throws ValidationApiException
     */
    protected function validate($value, $constraints){
        $validator = Validation::createValidator();


        $violations = $validator->validate($value, $constraints);

        if (count($violations) > 0) {
            throw (new ValidationApiException())->setData($violations);
        }
    }

    /**
     * Return current user.
     *
     * if user not instance user will throw exception.
     *
     * @return User
     */
    protected function getCurrentUser(): User{
        $user = $this->security->getUser();
        if(!$user instanceof User){
            throw new \InvalidArgumentException(
                "Current user should implemented ".User::class
            );
        }
        return $user;
    }
}