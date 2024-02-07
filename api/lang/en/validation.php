<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted'             => ['accepted' => true],
    'accepted_if'          => ['between' => 'value::value|other::other'],
    'active_url'           => ['active_url' => true],
    'after'                => ['after' => 'date::date'],
    'after_or_equal'       => ['after_or_equal' => 'date::date'],
    'alpha'                => ['alpha' => true],
    'alpha_dash'           => ['alpha_dash' => true],
    'alpha_num'            => ['alpha_num' => true],
    'array'                => ['array' => true],
    'ascii'                => ['ascii' => true],
    'before'               => ['before' => 'date::date'],
    'before_or_equal'      => ['before_or_equal' => 'date::date'],
    'between'              => [
        'array'   => ['between.array' => 'min::min|max::max'],
        'file'    => ['between.file' => 'min::min|max::max'],
        'numeric' => ['between.numeric' => 'min::min|max::max'],
        'string'  => ['between.string' => 'min::min|max::max'],
    ],
    'boolean'              => ['boolean' => true],
    'can'                  => ['can' => true],
    'confirmed'            => ['confirmed' => true],
    'current_password'     => ['current_password' => true],
    'date'                 => ['date' => true],
    'date_equals'          => ['date_equals' => 'date::date'],
    'date_format'          => ['date_format' => 'format::format'],
    'decimal'              => ['decimal' => 'decimal::decimal'],
    'declined'             => ['declined' => true],
    'declined_if'          => ['declined_if' => 'other::other|value::value'],
    'different'            => ['different' => 'other::other'],
    'digits'               => ['digits' => 'digits::digits'],
    'digits_between'       => ['digits_between' => 'min::min|max::max'],
    'dimensions'           => ['dimensions' => true],
    'distinct'             => ['distinct' => true],
    'doesnt_end_with'      => ['doesnt_end_with' => 'values::values'],
    'doesnt_start_with'    => ['doesnt_start_with' => 'values::values'],
    'email'                => ['email' => true],
    'ends_with'            => ['ends_with' => 'values::values'],
    'enum'                 => ['enum' => true],
    'exists'               => ['exists' => true],
    'extensions'           => ['extensions' => 'values::values'],
    'file'                 => ['file' => true],
    'filled'               => ['filled' => true],
    'gt'                   => [
        'array'   => ['gt.array' => 'value::value'],
        'file'    => ['gt.file' => 'value::value'],
        'numeric' => ['gt.numeric' => 'value::value'],
        'string'  => ['gt.string' => 'value::value'],
    ],
    'gte'                  => [
        'array'   => ['gte.array' => 'value::value'],
        'file'    => ['gte.file' => 'value::value'],
        'numeric' => ['gte.numeric' => 'value::value'],
        'string'  => ['gte.string' => 'value::value'],
    ],
    'hex_color'            => ['hex_color' => true],
    'image'                => ['image' => true],
    'in'                   => ['in' => true],
    'in_array'             => ['in_array' => 'other::other'],
    'integer'              => ['integer' => true],
    'ip'                   => ['ip' => true],
    'ipv4'                 => ['ipv4' => true],
    'ipv6'                 => ['ipv6' => true],
    'json'                 => ['json' => true],
    'lowercase'            => ['lowercase' => true],
    'lt'                   => [
        'array'   => ['lt.array' => 'value::value'],
        'file'    => ['lt.file' => 'value::value'],
        'numeric' => ['lt.numeric' => 'value::value'],
        'string'  => ['lt.string' => 'value::value'],
    ],
    'lte'                  => [
        'array'   => ['lte.array' => 'value::value'],
        'file'    => ['lte.file' => 'value::value'],
        'numeric' => ['lte.numeric' => 'value::value'],
        'string'  => ['lte.string' => 'value::value'],
    ],
    'mac_address'          => ['mac_address' => true],
    'max'                  => [
        'array'   => ['max.array' => 'max::max'],
        'file'    => ['max.file' => 'max::max'],
        'numeric' => ['max.numeric' => 'max::max'],
        'string'  => ['max.string' => 'max::max'],
    ],
    'max_digits'           => ['max_digits' => 'max::max'],
    'mimes'                => ['mimes' => 'values::values'],
    'mimetypes'            => ['mimetypes' => 'values::values'],
    'min'                  => [
        'array'   => ['min.array' => 'min::min'],
        'file'    => ['min.file' => 'min::min'],
        'numeric' => ['min.numeric' => 'min::min'],
        'string'  => ['min.string' => 'min::min'],
    ],
    'min_digits'           => ['min_digits' => 'min::min'],
    'missing'              => ['missing' => true],
    'missing_if'           => ['missing_if' => 'other::other|value::value'],
    'missing_unless'       => ['missing_unless' => 'other::other|value::value'],
    'missing_with'         => ['missing_with' => 'values::values'],
    'missing_with_all'     => ['missing_with_all' => 'values::values'],
    'multiple_of'          => ['multiple_of' => 'value::value'],
    'not_in'               => ['not_in' => true],
    'not_regex'            => ['not_regex' => true],
    'numeric'              => ['numeric' => true],
    'password'             => [
        'letters'       => ['letters' => true],
        'mixed'         => ['mixed' => true],
        'numbers'       => ['numbers' => true],
        'symbols'       => ['symbols' => true],
        'uncompromised' => ['uncompromised' => true],
    ],
    'present'              => ['present' => true],
    'present_if'           => ['present_if' => 'other::other|value::value'],
    'present_unless'       => ['present_unless' => 'other::other|value::value'],
    'present_with'         => ['present_with' => 'values::values'],
    'present_with_all'     => ['present_with_all' => 'values::values'],
    'prohibited'           => ['prohibited' => true],
    'prohibited_if'        => ['prohibited_if' => 'other::other|value::value'],
    'prohibited_unless'    => ['prohibited_unless' => 'other::other|values::values'],
    'prohibits'            => ['prohibits' => 'other::other'],
    'regex'                => ['regex' => true],
    'required'             => ['required' => true],
    'required_array_keys'  => ['required_array_keys' => 'values::values'],
    'required_if'          => ['required_if' => 'other::other|value::value'],
    'required_if_accepted' => ['required_if_accepted' => 'other::other'],
    'required_unless'      => ['required_unless' => 'other::other|values::values'],
    'required_with'        => ['required_with' => 'values::values'],
    'required_with_all'    => ['required_with_all' => 'values::values'],
    'required_without'     => ['required_without' => 'values::values'],
    'required_without_all' => ['required_without_all' => 'values::values'],
    'same'                 => ['same' => 'other::other'],
    'size'                 => [
        'array'   => ['size.array' => 'size::size'],
        'file'    => ['size.file' => 'size::size'],
        'numeric' => ['size.numeric' => 'size::size'],
        'string'  => ['size.string' => 'size::size'],
    ],
    'starts_with'          => ['starts_with' => 'values::values'],
    'string'               => ['string' => true],
    'timezone'             => ['timezone' => true],
    'unique'               => ['unique' => true],
    'uploaded'             => ['uploaded' => true],
    'uppercase'            => ['uppercase' => true],
    'url'                  => ['url' => true],
    'ulid'                 => ['ulid' => true],
    'uuid'                 => ['uuid' => true],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'min_age'              => ['min_age' => 'max::max'],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [],

];
