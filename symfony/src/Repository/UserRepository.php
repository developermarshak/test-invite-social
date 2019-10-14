<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\Pagination\Paginator;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    const PAGE_SIZE = 100;

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    /**
     *
     *
     * Return users, page, total, pagesCount
     *
     * @param int $page
     * @param int $pageSize
     * @return array
     */
    public function getAll($page = 1, $pageSize = 5)
    {
        if(!$page){
            $page = 1;
        }
        $query = $this->createQueryBuilder('u')
            ->orderBy('u.id', 'ASC')
            ->getQuery();

        $paginator = new Paginator($query, $fetchJoinCollection = true);

        $total = count($paginator);
        $pagesCount = ceil($total / $pageSize);


        $query = $paginator
            ->getQuery()
            ->setFirstResult($pagesCount * ($page-1))
            ->setMaxResults($pageSize);

        return [$query->getResult(), $page, $total, $pagesCount];
    }

    public function countByUserFromId(int $userId){
        return $this->count(['fromUserId' => $userId]);
    }
}