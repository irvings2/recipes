<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
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
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'ingredients' => 'required|string',
            'instructions' => 'required|string',
            'image' => 'required|image|max:2048', // Ensure image is a valid file
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('images', 'public');
        }

        RecipesModel::create($data);

        return redirect()->route('recipes.index')->with('success', 'Recipe created successfully!');
    }

    public function edit($id)
    {
        $recipe = RecipesModel::findOrFail($id);
        return inertia('recipes/edit', ['recipe' => $recipe]);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'ingredients' => 'required|string',
            'instructions' => 'required|string',
            'image' => 'required|image|max:2048', // Ensure image is a valid file
        ]);

        $recipe = RecipesModel::findOrFail($id);

        if ($request->hasFile('image')) {
            // Delete the old image if it exists and the property exists on the model
            if (isset($recipe->image) && !empty($recipe->image)) {
                Storage::disk('public')->delete($recipe->image);
            }
            $data['image'] = $request->file('image')->store('images', 'public');
        }

        $recipe->update($data);

        return redirect()->route('recipes.index')->with('success', 'Recipe updated successfully!');
    }

    public function destroy($id)
    {
        $recipe = RecipesModel::findOrFail($id);
        $recipe->delete();

        return redirect()->route('recipes.index')->with('success', 'Recipe deleted successfully!');
    }
}