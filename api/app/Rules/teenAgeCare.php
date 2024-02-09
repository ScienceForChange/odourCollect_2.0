<?php

namespace App\Rules;

use Closure;
<<<<<<< HEAD
use Illuminate\Contracts\Validation\Rule;

class teenAgeCare implements Rule
=======
use Illuminate\Contracts\Validation\ValidationRule;

class teenAgeCare implements ValidationRule
>>>>>>> master
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
<<<<<<< HEAD
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
=======
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (date('Y') - $value < 15) {
            $fail('The minimum age requirement is 15.'); // TODO careful with translations
        }
>>>>>>> master
    }
}
