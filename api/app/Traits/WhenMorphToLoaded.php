<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Relations\Relation;

trait WhenMorphToLoaded
{
    public function whenMorphToLoaded($name, $map)
    {
        return $this->whenLoaded($name, function () use ($name, $map) { //'userable' + [                App\Models\ProfileClient::class => ProfileClientResource::class,
                                                                        //                              App\Models\ProfileCitizen::class => ProfileCitizenResource::class]
            $morphType = $name . '_type';                               //userable_type
            $morphClass = $this->$morphType;
            $morphResourceClass = $map[$morphClass];
            return new $morphResourceClass($this->userable);
        });
    }
}
