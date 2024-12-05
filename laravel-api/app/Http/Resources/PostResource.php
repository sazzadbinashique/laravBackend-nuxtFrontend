<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $maxTitle = 30;
        $maxLength = 60;
        $photpPath = $this->photo ? asset('storage/' . $this->photo) : null;
        return [
            'id' => $this->id,
            'title' => strlen($this->title) > $maxTitle
                ? substr($this->title, 0, $maxTitle) . '...'
                : $this->title,
            'slug' => $this->slug,
            'photo' => $photpPath,
            'description' => strlen($this->description) > $maxLength
                ? substr($this->description, 0, $maxLength) . '...'
                : $this->description,
            'author' => [
                'id' => $this->author->id,
                'name' => $this->author->name,
            ],
            'category' => [
                'id' => $this->category->id,
                'name' => $this->category->name,
            ],
            'published_at' => $this->published_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
