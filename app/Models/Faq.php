<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;

class Faq extends PrimaryModel
{
    use HasFactory;
    protected $guarded = [''];
    public $localeStrings = ['title','content'];
}
