<?php

namespace App\Policies;

use App\Models\Book;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class BookPolicy
{
    use HandlesAuthorization;
    const MODAL = 'book';


    /**
     * Determine whether the user can view the category.
     *
     * @param \App\Models\User $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->index : false;
    }

    /**
     * Determine whether the user can view the product.
     *
     * @param  \App\Models\User $user
     * @param  \App\Book $book
     * @return mixed
     */
    public function view(User $user, Book $book)
    {
        return $user->isAdminOrAbove ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : $user->id === $book->user_id;
    }

    /**
     * Determine whether the user can create products.
     *
     * @param  \App\Models\User $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can update the product.
     *
     * @param  \App\Models\User $user
     * @param  \App\Book $book
     * @return mixed
     */
    public function update(User $user, Book $book)
    {
        return $user->isAdminOrAbove ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : $user->id === $book->user_id;
    }

    /**
     * Determine whether the user can delete the product.
     *
     * @param  \App\Models\User $user
     * @param  \App\Book $book
     * @return mixed
     */
    public function delete(User $user, Book $book)
    {
        return $user->isAdminOrAbove ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : $user->id === $book->user_id;
    }

    /**
     * Determine whether the user can restore the product.
     *
     * @param  \App\Models\User $user
     * @param  \App\Book $book
     * @return mixed
     */
    public function restore(User $user, Book $book)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the product.
     *
     * @param  \App\Models\User $user
     * @param  \App\Book $book
     * @return mixed
     */
    public function forceDelete(User $user, Book $book)
    {
        //
    }
}
