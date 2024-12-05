<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index()
    {
        try {
            $posts = Post::with('category', 'author')->orderBy('id', 'desc')->paginate(12);//->onEachSide(1);
//            return response()->json($posts);

            return response()->json([
                'data' => PostResource::collection($posts), // Collection of posts
                'pagination' => [
                    'current_page' => $posts->currentPage(),
                    'total_pages' => $posts->lastPage(),
                    'per_page' => $posts->perPage(),
                    'total' => $posts->total(),
                    'next_page_url' => $posts->nextPageUrl(),
                    'prev_page_url' => $posts->previousPageUrl(),
                ],
                'success' => 200,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'An error occurred while fetching the posts.',
                'message' => $e->getMessage(),
                'success' => 500,
            ]);
        }
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
