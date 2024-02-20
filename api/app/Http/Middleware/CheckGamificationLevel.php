<?php

namespace App\Http\Middleware;

use App\Notifications\LevelUp;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckGamificationLevel
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $observationCount = auth()->user()->odourObservations()->count();
        $likesCount = auth()->user()->likes()->count();
        $commentsCount = auth()->user()->comments()->count();
        $currentLevel = auth()->user()->userable->level;

        if ($observationCount >= 60 && $likesCount >= 24 && $commentsCount >= 12){
            if($currentLevel >= 5) {
                return $response;
            } else {
                auth()->user()->userable()->update([
                    'level' => 5
                ]);
                auth()->user()->notify(new LevelUp(5));
            }
        }elseif ($observationCount >= 40 && $likesCount >= 16 && $commentsCount >= 8){
            if($currentLevel >= 4) {
                return $response;
            } else {
                auth()->user()->userable()->update([
                    'level' => 4
                ]);
                auth()->user()->notify(new LevelUp(4));
            }
        }elseif ($observationCount >= 30 && $likesCount >= 12 && $commentsCount >= 3){
            if($currentLevel >= 3) {
                return $response;
            } else {
                auth()->user()->userable()->update([
                    'level' => 3
                ]);
                auth()->user()->notify(new LevelUp(3));
            }
        }elseif ($observationCount >= 10 && $likesCount >= 4){
            if($currentLevel >= 2) {
                return $response;
            } else {
                auth()->user()->userable()->update([
                    'level' => 2
                ]);
                auth()->user()->notify(new LevelUp(2));
            }
        } elseif ($observationCount >= 5 && $likesCount >= 2) {
            if($currentLevel >= 1) {
                return $response;
            } else {
                auth()->user()->userable()->update([
                    'level' => 1
                ]);
                auth()->user()->notify(new LevelUp(1));
            }
        } else {
            return $response;
        }

        return $response;
    }
}
