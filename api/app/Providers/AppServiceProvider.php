<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Relations\Relation;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Relation::enforceMorphMap([
            'like' => 'App\Notifications\LikeReceived',
            'comment'  => 'App\Models\Comment',
            'citizen' => 'App\Models\ProfileCitizen',
            'client' => 'App\Models\ProfileClient',
            'user' => 'App\Models\User',
            'odour' => 'App\Models\OdourObservation',
        ]);
    }
}
