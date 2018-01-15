<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Commentable;
use Kalnoy\Nestedset\NodeTrait;

/**
 * @property bool approved
 */
class Comment extends Model
{
    use Commentable;
    use NodeTrait;

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
        return $this->belongsTo(User::class, 'commented_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'commentable_id');
    }
}
