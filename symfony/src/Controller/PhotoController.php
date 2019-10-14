<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Service\FileUploader;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints\Collection;

class PhotoController extends BaseController
{
    /**
     * @var FileUploader $fileUploader
     */
    protected $fileUploader;

    public function __construct(Security $security, FileUploader $fileUploader)
    {
        parent::__construct($security);
        $this->fileUploader = $fileUploader;
    }

    /**
     * Upload profile photo
     *
     * @Route("/api/photo", name="photo", methods={"POST"})
     */
    public function post(Request $request)
    {
        $this->validateCreatePhoto($request->files->all());

        $photoFileName = $this->fileUploader->upload(
            $request->files->get('photo')
        );

        $user = $this->getCurrentUser();
        $oldPhoto = $user->getPhoto();
        $user->setPhoto($photoFileName);

        $manager = $this->getDoctrine()->getManager();
        $manager->persist($user);
        $manager->flush();

        $path = $this->fileUploader->getTargetDirectory()."/".$oldPhoto;
        unlink($path);

        $response = (new Response())->setStatusCode(201 );
        $response->headers->add([
            'X-Location' => $photoFileName
        ]);

        return $response;
    }

    /**
     * Validate post data of create photo action
     *
     * @param $data
     */
    protected function validateCreatePhoto($data){
        $constraints = new Collection([
            'photo' => [
                new File([
                    'maxSize' => '10m',
                    'mimeTypes' => [
                        'image/jpg',
                        'image/jpeg',
                        'image/png',
                        'image/gif',
                    ],
                    'mimeTypesMessage' => 'Please upload a valid image',
                ])
            ]
        ]);

        $this->validate($data, $constraints);
    }
}
