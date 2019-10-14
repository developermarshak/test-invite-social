<?php
/*
 * This file is part of the OpCart software.
 *
 * (c) 2019, Ecentria, Inc
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace App\Command;

use App\Entity\User;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class CreateAdmin extends Command
{
    /**
     * @var ObjectManager $entityManager
     */
    protected $entityManager;

    /**
     * @var UserPasswordEncoderInterface $passwordEncoder
     */
    protected $passwordEncoder;

    public function __construct(?string $name = null, ObjectManager $entityManager, UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->entityManager = $entityManager;
        $this->passwordEncoder = $passwordEncoder;
        parent::__construct("make:admin");
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $user = new User();
        $user->setEmail('admin@local.com');
        $user->setPassword(
                $this->passwordEncoder->encodePassword($user, 'admin')
            );

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $output->writeln("admin@local.com user with password: 'admin' created");
    }
}