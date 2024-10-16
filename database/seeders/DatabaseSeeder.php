<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create permissions
        $permissions = [
            'role access',
            'role show',
            'role create',
            'role edit',
            'role delete',
            'user access',
            'user show',
            'user create',
            'user edit',
            'user delete',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions
        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all());

        $userRole = Role::create(['name' => 'user']);
        $userRole->givePermissionTo(['role access', 'user access']);

        // Create admin user
        $admin = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('12345678'),
        ]);
        $admin->assignRole($adminRole);

        // Create regular user
        $user = User::factory()->create([
            'name' => 'Sarah Wilson',
            'email' => 'user@gmail.com',
            'password' => bcrypt('12345678'),
        ]);
        $user->assignRole($userRole);
    }
}
