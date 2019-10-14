<?php
namespace App\Exceptions;

use \InvalidArgumentException;
use Symfony\Component\Validator\ConstraintViolationInterface;
use Symfony\Component\Validator\ConstraintViolationListInterface;

/**
 * Class ValidationApiException
 *
 * Http Api exception for validate errors
 *
 * @package App\Exceptions
 */
class ValidationApiException extends ApiException
{
    function __construct(string $message = "Validation error", int $statusCode = 400, \Throwable $previous = null)
    {
        parent::__construct($message, $statusCode, $previous);
    }

    /**
     * Set data for show in response
     *
     * @param mixed $data
     *
     * @return ApiException
     */
    public function setData($data): ApiException
    {
        if($data instanceof ConstraintViolationListInterface){
            $data = [
                'status' => 'error',
                'errors' => $this->constraintViolationListToArray($data)
            ];
        }
        parent::setData($data);

        return $this;
    }

    /**
     * Convert Constraint Violation List to array with key-value object
     *
     * @param ConstraintViolationListInterface $list
     * @throws InvalidArgumentException
     * @return array
     */
    protected function constraintViolationListToArray(ConstraintViolationListInterface $list): array {
        if($list->count() === 0){
            throw new InvalidArgumentException('Cannot convert empty constraint violation list to exception');
        }

        $res = [];
        foreach ($list as $item){
            /* @var ConstraintViolationInterface $item */

            $res[] = [
                "code"          => $item->getCode(),
                "message"       => $item->getMessage(),
                "property_path" => $item->getPropertyPath()
            ];
        }

        return $res;
    }
}