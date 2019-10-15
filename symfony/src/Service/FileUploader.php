<?php
namespace App\Service;

use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileUploader
{
    /**
     * Directory for upload files
     *
     * @var string
     */
    private $targetDirectory;

    /**
     * FileUploader constructor.
     * @param string $targetDirectory
     */
    public function __construct(string $targetDirectory)
    {
        $this->targetDirectory = $targetDirectory;
    }

    /**
     * Upload file to target directory
     *
     * @param UploadedFile $file
     * @return string
     */
    public function upload(UploadedFile $file)
    {
        $fileName = uniqid().'.'.$file->guessExtension();
        $file->move($this->getTargetDirectory(), $fileName);
        return $fileName;
    }

    /**
     * Return target upload directory
     *
     * @return string
     */
    public function getTargetDirectory()
    {
        return $this->targetDirectory;
    }
}