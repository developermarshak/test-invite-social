<?php

namespace App\Repository;

use App\Entity\Invite;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Invite|null find($id, $lockMode = null, $lockVersion = null)
 * @method Invite|null findOneBy(array $criteria, array $orderBy = null)
 * @method Invite[]    findAll()
 * @method Invite[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InviteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Invite::class);
    }

    /**
     * Get invites with by creator id and invite id
     *
     * @param int $creatorId
     * @param int $inviteId
     * @return mixed
     */
    public function findByCreatorIdAndInviteId(int $creatorId, int $inviteId){
        return $this->createQueryBuilder('i')
            ->andWhere('i.from_user_id = :from_user_id')
            ->setParameter('from_user_id', $creatorId)
            ->andWhere('i.id = :id')
            ->setParameter('id', $inviteId)
            ->setMaxResults(1)
            ->getQuery()
            ->getResult();
    }

    /**
     * Get invites with by creator id
     *
     * @param int $creatorId
     * @return Invite[]
     */
    public function findByCreatorId(int $creatorId){
        return $this->findBy(
            ['from_user_id' => $creatorId]
        );
    }

    /**
     * Get count invites with this creator id
     *
     * @param int $creatorId
     * @return int
     */
    public function countByCreatorId(int $creatorId){
        return $this->count(
            ['from_user_id' => $creatorId]
        );
    }

    // /**
    //  * @return Invite[] Returns an array of Invite objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('i.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Invite
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
