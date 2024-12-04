<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{
    public function register(Request $request)
    {
     $formData=   $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'mobile' => 'required',
            'password' => 'required|string|min:6',
            'confirm_password' => 'required|same:password',
            'address' => 'nullable|string',
            'role_id' => 'required',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $formData['password'] = bcrypt($request->password);
        // avatar
        if ($request->hasFile('avatar')) {
            $formData['avatar'] = $request->file('avatar')->store('users', 'public');
        }

        $user = User::create($formData);

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('passportToken')->accessToken
        ], 200);

    }

    public function login(Request $request)
    {
        $credentials = [
            'email'    => $request->email,
            'password' => $request->password
        ];

        if (Auth::attempt($credentials))
        {
            $token = Auth::user()->createToken('passportToken')->accessToken;

            return response()->json([
                'user' => Auth::user(),
                'token' => $token
            ], 200);
        }

        return response()->json([
            'error' => 'Unauthorised'
        ], 401);

    }
    public function logout(){
        Auth::user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ], 200);

    }
}
