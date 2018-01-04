<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Commentable;

/**
 * @property bool approved
 */
class Comment extends Model
{
    use Commentable;

    protected $mustBeApproved = false;

    protected $fillable = [
        'comment',
        'rate',
        'approved',
        'commented_id',
        'commented_type',
        'parent_id'
    ];

    protected $casts = [
        'approved' => 'boolean'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function commentable()
    {
        return $this->morphTo();
    }

    /**
     * @return $this
     */
    public function approve()
    {
        $this->approved = true;
        $this->save();

        return $this;
    }


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
