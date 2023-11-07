<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OdourObservation>
 */
class OdourObservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'longitude' => fake('latitude'),
            'latitude' => fake('longitude'),
            'odour_sub_type_id' => rand(1,50),
            'description' => 'TEST_CF',
            'odour_report_server_time' => now(),
            'user_id' => rand(1,1800)
        ];
    }

    /**
     * Indicate that the OdourObservation is outside The polygon.
     */
    public function out(): Factory
    {
        return $this->state(function (array $attributes) {
            return [
                'longitude' => 2.1715164,
                'latitude' => 41.3970353,
                'odour_report_server_time' => "2023-09-".str_pad(mt_rand(0,12), 2, "0", STR_PAD_LEFT). " " .mt_rand(8,22).":".str_pad(mt_rand(0,59), 2, "0", STR_PAD_LEFT).":".str_pad(mt_rand(0,59), 2, "0", STR_PAD_LEFT)
                //'odour_report_server_time' => fake()->dateTimeBetween('-10 days', now())
            ];
        });
    }

    /**
     * Indicate that the OdourObservation is inside The polygon.
     */
    public function in(): Factory
    {
        return $this->state(function (array $attributes) {
            return [
                'longitude' => 2.1983814,
                'latitude' => 41.4108084,
                'odour_report_server_time' => "2023-09-".str_pad(mt_rand(0,12), 2, "0", STR_PAD_LEFT). " " .mt_rand(0,23).":".str_pad(mt_rand(0,59), 2, "0", STR_PAD_LEFT).":".str_pad(mt_rand(0,59), 2, "0", STR_PAD_LEFT)
                //'odour_report_server_time' => fake()->dateTimeBetween('-10 days', now())
            ];
        });
    }
}
