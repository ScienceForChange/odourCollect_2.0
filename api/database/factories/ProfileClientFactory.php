<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProfileClient>
 */
class ProfileClientFactory extends Factory
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
            'surname' => fake()->lastName(),
            'company' => fake()->company(),
            'phone' => fake()->phoneNumber(),
            'sfc_associated' => fake()->name(),
            'company_person' => fake()->name(),
        ];
    }
}
