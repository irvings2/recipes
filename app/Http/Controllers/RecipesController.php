<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RecipesModel;

class RecipesController extends Controller
{
    public function index()
    {
        return inertia('recipes/index', [
            'recipes' => RecipesModel::all(),
        ]);
    }

    public function create()
    {
        return inertia('recipes/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'ingredients' => 'required|string',
            'instructions' => 'required|string',
            'image' => 'nullable|string',
        ]);

        RecipesModel::create($request->all());

        return redirect()->route('recipes.index')->with('success', 'Recipe created successfully!');
    }

    public function edit($id)
    {
        $recipe = RecipesModel::findOrFail($id);
        return inertia('recipes/edit', ['recipe' => $recipe]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'ingredients' => 'required|string',
            'instructions' => 'required|string',
            'image' => 'nullable|string',
        ]);

        $recipe = RecipesModel::findOrFail($id);
        $recipe->update($request->all());

        return redirect()->route('recipes.index')->with('success', 'Recipe updated successfully!');
    }

    public function destroy($id)
    {
        $recipe = RecipesModel::findOrFail($id);
        $recipe->delete();

        return redirect()->route('recipes.index')->with('success', 'Recipe deleted successfully!');
    }
}