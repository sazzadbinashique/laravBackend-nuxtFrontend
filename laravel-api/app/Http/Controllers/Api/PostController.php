<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index()
    {
        $posts= Post::with('category','author')->orderBy('id', 'desc')->paginate(10);
        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $data=   $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:4048',
            'category_id' => 'required|exists:categories,id',
        ]);
        $data['slug'] = Str::slug($request->title);

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('posts', 'public');
        }
        $data['published_at'] = now();
        $data['author_id'] = auth()->id();

        $post = Post::create($data);

        return response()->json($post->load('category'), 201);
    }

    public function show($id)
    {
        $post = Post::findOrFail($id);
        return response()->json($post->load('category','author'));
    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        $data =  $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
//            'photo' => 'nullable|image|max:2048',
            'category_id' => 'exists:categories,id',
        ]);

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('posts');
        }
        $slug = Str::slug($request->title);
        $data['slug'] = $slug.'-'.uniqid();
        $data['published_at'] = now();
        $data['author_id'] = auth()->id();

        $post->update($data);

        return response()->json($post->load('category','author'));
    }

    public function destroy(Post $post)
    {
        $post->delete();
        return response()->noContent();
    }
}
