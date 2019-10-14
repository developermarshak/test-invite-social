<?php
/*
 * This file is part of the OpCart software.
 *
 * (c) 2019, Ecentria, Inc
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace App\Entity\Builder;


use App\Entity\Invite;
use App\Entity\User;

class InviteBuilder
{
    public function buildByCurrentUser(User $user, string $to, int $expiredAt = 720000){
        $invite = new Invite();
        $invite->setCode($this->generateCode())
            ->setFromUserId($user->getId())
            ->setStatus(Invite::STATUS_NEW)
            ->setExpiredAt($this->getExpiredAt($expiredAt))
            ->setForEmail($to);
        return $invite;
    }

    protected function getExpiredAt(int $expiredAt){
        return (new \DateTime())->add(
            new \DateInterval("PT".$expiredAt."S")
        );
    }

    protected function generateCode(){
        return md5(rand());
    }
}