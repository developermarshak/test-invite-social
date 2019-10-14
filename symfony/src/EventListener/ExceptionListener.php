<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 02/02/2019
 * Time: 22:25
 */

namespace App\EventListener;

use App\Exceptions\ApiException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

/**
 * Class ExceptionListener
 *
 * Exception listener for show errors in Json format.
 *
 * @package App\EventListener
 */
class ExceptionListener
{
    public function onKernelException(ExceptionEvent $event)
    {
        $exception = $event->getException();

        if ($exception instanceof HttpExceptionInterface) {
            $responseData = [
                'status' => 'error',
                'error_message' => $exception->getMessage(),
                'error_code' => $exception->getCode()
            ];

            if($exception instanceof ApiException) {
                $responseData['error_description'] = $exception->getData();
            }

            $response = new JsonResponse($responseData);
            $response->setStatusCode($exception->getStatusCode());
            $response->headers->replace($exception->getHeaders());

        } else {
            $response = (new Response())->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $event->setResponse($response);
    }
}