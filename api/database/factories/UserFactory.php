<?php

namespace Database\Factories;

use App\Models\ProfileCitizen;
use App\Models\ProfileClient;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $profile = $this->userable();

        return [
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'userable_id' => $profile::factory(),
            'userable_type' => $profile,
        ];
    }

    public function userable()
    {
        return $this->faker->randomElement([
            ProfileCitizen::class,
            ProfileClient::class,
        ]);
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function userClientProfile(): static
    {
        $client = ProfileClient::factory();

        return $this->state(fn (array $attributes) => [
            'userable_type' => 'App\\Models\\ProfileClient',
            'userable_id' => $client
        ]);
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function userCitizenProfile(): static
    {
        $citizen = ProfileCitizen::factory();

        return $this->state(fn (array $attributes) => [
            'userable_type' => 'citizen',
            'userable_id' => $citizen
        ]);
    }
}
