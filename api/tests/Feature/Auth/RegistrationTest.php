<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Facades\Notification;
use Illuminate\Auth\Notifications\VerifyEmail;
use App\Models\User;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_new_users_can_register(): void
    {
        Notification::fake();

        $response = $this->post('/register', [
            'name' => 'Test User',
            'surname' => 'Test Surname',
            'gender' => 'male',
            'birth_year' => "1993",
            'phone' => "638949611",
            'email' => 'carlos.millan@scienceforchange.eu',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        Notification::assertSentTo(
            [User::where('email', 'carlos.millan@scienceforchange.eu')->first()],
            VerifyEmail::class
        );

        $this->assertAuthenticated();
        $response->assertNoContent();
    }
}
