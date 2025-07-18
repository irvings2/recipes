<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RecipesController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('recipes', [RecipesController::class, 'index'])->name('recipes.index');
    Route::get('recipes/create', [RecipesController::class, 'create'])->name('recipes.create');
    Route::post('recipes', [RecipesController::class, 'store'])->name('recipes.store');
    Route::get('recipes/{id}/edit', [RecipesController::class, 'edit'])->name('recipes.edit');
    Route::put('recipes/{id}', [RecipesController::class, 'update'])->name('recipes.update');
    Route::delete('recipes/{id}', [RecipesController::class, 'destroy'])->name('recipes.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';