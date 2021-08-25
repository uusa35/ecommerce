<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CountryExtraLightResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'name_ar' => $this->name_ar,
            'name_en' => $this->name_en,
            'image' => $this->image,
            'is_local' => $this->is_local,
            'fixed_shipment_charge' => (float) $this->fixed_shipment_charge
        ];
    }
}
