<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::orderBy('id', 'desc')->paginate(10); // Adjust pagination as needed
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $data =$request->validate([
            'name' => 'required|string|max:255',
        ]);
        $data['slug'] = Str::slug($request->name);

        $category= Category::create($data);
        return response()->json($category, 201);
    }

    public function show($id)
    {
        $category = Category::findOrFail($id);
        return response()->json($category);
    }

    public function update(Request $request, $id)
    {
//        dd($request->all());
        $category = Category::findOrFail($id);
        $data = $request->validate([
            'name' => 'string|max:255',
        ]);
        $data['slug'] = Str::slug($request->name);

        $category->update($data);
        return response()->json($category);
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json(null, 204);
    }
}
