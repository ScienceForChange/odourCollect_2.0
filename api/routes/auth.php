<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [RegisteredUserController::class, 'store'])
                ->name('register');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
                ->name('login');

// Reestablecer contraseña
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
                ->name('password.email');

// endpoint para la llamada "resetar contraseña" del formulario de front para cambiar contraseña
Route::post('/reset-password', [NewPasswordController::class, 'store'])
                ->name('password.store');

// endpoint al que se llama cuando se hace click en el enlace de "verificar email" del correo de verificación y verifica el correo
Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
                ->middleware(['signed', 'throttle:6,1'])
                ->name('verification.verify');

// endpoint para reeviar la verificación de email
Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware(['auth', 'throttle:6,1'])
                ->name('verification.send');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
                ->middleware('auth')
                ->name('logout');

Route::post('/change-password', [UserController::class, 'changePassword'])
                ->middleware(['auth','verified','throttle:6,1'])
                ->name('password.change');

Route::patch('/change-avatar', [UserController::class, 'changeAvatar'])
                ->middleware(['auth','verified'])->whereNumber('user')->name('changePassword');
