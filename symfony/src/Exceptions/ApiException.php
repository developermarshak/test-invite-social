<?php
namespace App\Exceptions;

use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

/**
 * Class ApiException
 * Api Exception for show in json response
 *
 * @package App\Exceptions
 */
class ApiException extends \RuntimeException implements HttpExceptionInterface
{
    /**
     * @var int
     */
    protected $statusCode = 0;

    /**
     * @var array
     */
    protected $headers = [];

    /**
     * Data with explain error data for json
     */
    protected $data = [];

    function __construct(string $message, int $statusCode, \Throwable $previous = null)
    {
        parent::__construct($message, $statusCode, $previous);
        $this->statusCode = $statusCode;
    }

    /**
     * Setter data with description about error or errors
     *
     * @param mixed $data
     *
     * @return self
     */
    public function setData($data): self
    {
        $this->data = $data;
        return $this;
    }

    /**
     * Set response headers
     *
     * @param array $headers
     *
     * @return self
     */
    public function setHeaders(array $headers): self
    {
        $this->headers = $headers;
        return $this;
    }

    /**
     * Returns the status code.
     *
     * @return int An HTTP response status code
     */
    public function getStatusCode(){
        return $this->statusCode;
    }

    /**
     * Returns response headers.
     *
     * @return array Response headers
     */
    public function getHeaders(){
        return $this->headers;
    }

    /**
     * Data with description about error or errors
     *
     * @return mixed
     */
    public function getData(){
        return $this->data;
    }
}