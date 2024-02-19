<?php

use App\Filters\OdourObservations\OdourObservationFilter;
use App\Http\Resources\OdourObservationResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Resources\UserResource;
use App\Models\OdourObservation;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// User CRUD endpoints
Route::middleware(['auth:sanctum'])
        ->controller(App\Http\Controllers\UserController::class)
        ->name('users.')
        ->group(function () {
            Route::GET('/users', 'index')->name('index');
            Route::GET('users/{user}', 'show')->whereNumber('user')->name('show');
            Route::POST('/users', 'store')->name('store');
            Route::PATCH('/users/{user}', 'update')->whereNumber('user')->name('update');
            // Delete method does not allow a body in he http request, so if he send the deleted_because im f.
            Route::POST('/users/{user}', 'destroy')->whereNumber('user')->name('delete');
            Route::POST('/users/{trashed_user}', 'restore')->whereNumber('trashed_user')->name('restore');
        });

// Odour Observations CRUD PUBLIC endpoints
Route::controller(App\Http\Controllers\OdourObservationController::class)
        ->name('odourObservations.')
        ->group(function () {
            Route::GET('/observations', 'index')->name('index');
            Route::GET('/observations/{odourObservation}', 'show')->whereNumber('odourObservation')->name('show');
            Route::GET('/observations/related-data', 'showRelatedData')->name('relatedData');
        });

        // Odour Observations CRUD endpoints
        Route::middleware(['auth:sanctum', 'verified'])
        ->controller(App\Http\Controllers\OdourObservationController::class)
        ->name('odourObservations.')
        ->group(function () {
            Route::POST('/observations', 'store')->name('store');
            Route::PATCH('/observations/{odourObservation}', 'update')->whereNumber('odourObservation')->name('update');
            Route::DELETE('/observations/{odourObservation}', 'destroy')->whereNumber('odourObservation')->name('delete');
            Route::POST('/observations/{trashed_observation}', 'restore')->whereNumber('trashed_observation')->name('restore');
            Route::GET('/observations/export', 'export')->name('export');
        });

// User Logged check
Route::middleware(['auth:sanctum'])->get('/user-logged', function (Request $request) {
    return new JsonResponse([
        'status' => 'success',
        'data' => new UserResource(request()->user()->load([
            'userable',
            'odourObservations' => [
                'odourHedonicTone',
                'odourIntensity',
                'odourSubType' => [
                    'odourType'
                ]
            ]
        ])),
    ], 200);

});

// User logged Data
Route::middleware(['auth:sanctum', 'verified'])->get('/user-data', function (Request $request) {
    //TODO WIP TEMPORAL SOLUTION FOR TESTING
    $loads = [];
    if ($request->has('userable')) {
        $loads[] = 'userable';
    }

    if($request->has('odourObservations')) {
        $loads[] = 'odourObservations';
    }
    return response()->json([
        new UserResource($request->user()->load($loads))
    ],200);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('like', [App\Http\Controllers\LikeController::class, 'like'])->name('like');
    Route::delete('like', [App\Http\Controllers\LikeController::class, 'unlike'])->name('unlike');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('notifications', [App\Http\Controllers\NotificationController::class, 'index'])->name('notifications.index');
    Route::get('notifications/{notification}', [App\Http\Controllers\NotificationController::class, 'show'])->name('notifications.show');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/observation/{odourObservation}/comments/', [App\Http\Controllers\OdourObservationCommentController::class, 'store'])->name('comments.store');
    Route::delete('/observation/{odourObservation}/comments/{comment}', [App\Http\Controllers\OdourObservationCommentController::class, 'destroy'])->name('comments.destroy');
});

Route::get('/map', [App\Http\Controllers\MapController::class, 'index'])->name('map.index');

Route::post('/contact', [App\Http\Controllers\ContactController::class, 'sendRequestToEmail'])
            ->middleware(['auth:sanctum'])->name('contact.sendRequestToEmail');

