<?php

declare(strict_types=1);

use Orchid\Platform\Http\Controllers\Auth\LoginController;
use Orchid\Platform\Http\Controllers\Auth\ResetPasswordController;
use Orchid\Platform\Http\Controllers\Auth\ForgotPasswordController;

/*
|--------------------------------------------------------------------------
| Auth Web Routes
|--------------------------------------------------------------------------
|
| Base route
|
*/

if (config('auth', true)) {
    // Authentication Routes...
    $this->router->get('login', [LoginController::class, 'showLoginForm'])->name('login');
    $this->router->post('login', [LoginController::class, 'login'])->name('login.auth');

    // Password Reset Routes...
    $this->router->get('password/reset', [ForgotPasswordController::class, 'showLinkRequestForm'])->name('password.request');
    $this->router->post('password/email', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
    $this->router->get('password/reset/{token}', [ResetPasswordController::class, 'showResetForm'])->name('password.reset');
    $this->router->post('password/reset', [ResetPasswordController::class, 'reset']);
}

$this->router->post('logout', [LoginController::class, 'logout'])->name('logout');
