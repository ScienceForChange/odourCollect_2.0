<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class JSONStructureOfUserTest extends TestCase
{
    use RefreshDatabase;

    public function test_route_returns_logged_citizen_with_200_response(): void
    {
        $user = User::factory()->userCitizenProfile()->create();

        $response = $this->actingAs($user)->get('/api/user');

        $response->assertStatus(200);

        $response->assertJsonStructure(["*" =>
            [
                "id",
                "email",
                "userable" => [
                    "type",
                    "name",
                    "surname",
                    "gender",
                    "birthYear",
                    "phone",
                ],
                "createdAt",
                "updatedAt",
            ]
        ]);
    }

    public function test_route_returns_logged_client_with_200_response(): void
    {
        $user = User::factory()->userClientProfile()->create();

        $response = $this->actingAs($user)->get('/api/user');

        $response->assertStatus(200);

        $response->assertJsonStructure(["*" =>
            [
                "id",
                "email",
                "userable" => [
                    "type",
                    "name",
                    "surname",
                    "company",
                    "phone",
                    "sfcAssociated",
                    "companyPerson"
                ],
                "createdAt",
                "updatedAt",
            ]
        ]);
    }
}
