<?php

namespace App\Support;

use App\Models\OdourObservation;
use Illuminate\Database\Eloquent\Collection;

class OdourObservationCollection extends Collection
{
  public function sumQuantity(): float
  {
    return $this->sum('quantity');
  }

  public function sumTotalPrice(): float
  {
    return $this->sum('total_price');
  }

  public function filterNotInsideInside($distance): self
  {
    return $this->filter(function (OdourObservation $value) use ($distance) {
        return $value->haversineGreatCircleDistance() < $distance;
    });
  }
}
