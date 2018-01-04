<?php

namespace App\Traits;

use App\Comment;

trait CanComment
{

    /**
     * @param $commentable
     * @param string $commentText
     * @param null $parent_id
     * @param int $rate
     * @return $this
     */
    public function comment($commentable, $commentText = '', $parent_id = null, $rate = 0)
    {
        $comment = new Comment([
            'comment'        => $commentText,
            'rate'           => ($commentable->getCanBeRated()) ? $rate : null,
            'approved'       => ($commentable->mustBeApproved() && ! $this->isAdmin()) ? false : true,
            'commented_id'   => $this->id,
            'commented_type' => get_class(),
            'parent_id'      => $parent_id
        ]);

        $commentable->comments()->save($comment);

        return $this;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commented');
    }
}
