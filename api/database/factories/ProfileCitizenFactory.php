<?php

namespace Database\Factories;

use App\Enums\Citizen\Gender;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProfileCitizen>
 */
class ProfileCitizenFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'gender' => fake()->randomElement(Gender::cases())->value,
            'birth_year' => fake()->numberBetween(1956, 2015),
            'status_sentence' => fake()->sentence(),
            'deleted_because' => fake()->sentence(),
        ];
    }
}
