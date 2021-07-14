<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Template extends PrimaryModel
{
    use HasFactory;
    protected $guarded = [''];

    public function sections()
    {
        return $this->hasMany(Section::class);
    }
}
