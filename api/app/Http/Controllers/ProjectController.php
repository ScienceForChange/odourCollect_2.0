<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        return "all projects";
    }

    public function show($id)
    {
        return Project::find($id)
                    ->zones()->get();
    }

    public function store(StoreProjectRequest $request)
    {
        $project = Project::create([
            $request->only([
                'odour_sub_type_id',
                'user_id',
                'title',
                'description',
                'hours',
                'space',
                'start_date',
                'end_date'
            ])
        ]);

        $project->zones()->createMany($request->zones);

        return $project;
    }

    public function destroy($id)
    {
        return "destroy project $id";
    }
}
