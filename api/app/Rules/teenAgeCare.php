<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\Rule;

class teenAgeCare implements Rule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    private $min;
    private $errorKey;


    public function __construct($min)
    {
        $this->min = $min;
    }
    public function passes($attribute, $value)
    {

        $this->attribute = $attribute;
        if (date('Y') - $value < $this->min) {
            $this->errorKey = 'min_age';
            return false;
        }

        return true;
    }

    public function message()
    {
        return [$this->attribute => trans('validation.'.$this->errorKey, ['min' => $this->min])];
    }
}
