<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Validation\Rules\Password;
use App\Contracts\Likeable;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url')."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });

        Password::defaults(function () {
            $rule = Password::min(8);
                        // ->letters()
                        // ->mixedCase()
                        // ->numbers()
                        // ->uncompromised();

            //TODO mirar para que devuelva una $rule dependiendo si es production o local el enviroment
            return $rule;
        });


        Gate::define('like', function (\App\Models\User $user, Likeable $likeable) {
            if($user->hasLiked($likeable)) {
                return Response::deny('You have already liked this');
            }

            return Response::allow();
        });

        Gate::define('unlike', function (\App\Models\User $user, Likeable $likeable) {
            if(!$user->hasLiked($likeable)) {
                return Response::deny('You have not liked this');
            }

            return Response::allow();
        });

    }
}
