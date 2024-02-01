<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfProduction
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ('local' !== app()->environment()) {
            return abort(403, 'You are not authorized to access this');
        }

        if ('127.0.0.1' !== $request->ip()) {
            return abort(403, 'You are not authorized to access this');
        }

        return $next($request);
    }
}
