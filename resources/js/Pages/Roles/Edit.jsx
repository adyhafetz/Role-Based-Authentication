import DropdownMulti from "@/Components/DropdownMulti";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

export default function Edit({ role, permissions }) {
    const { data, setData, put, processing, errors } = useForm({
        name: role.name,
        permissions: role.permissions.map((p) => p.name),
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handlePermissionsChange = (selectedPermissions) => {
        setData("permissions", selectedPermissions);
    };

    const submit = (e) => {
        e.preventDefault();

        put(route("roles.update", role.id));
    };

    const permissionOptions = permissions.map((permission) => ({
        value: permission.name,
        label: permission.name,
    }));

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800">
                        Edit Role: {role.name}
                    </h2>
                    <SecondaryButton className="inline-flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="size-4 mr-1"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <Link href={route("roles.index")}>
                            Back To Role List
                        </Link>
                    </SecondaryButton>
                </div>
            }
        >
            <Head title={`Edit Role: ${role.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Role Information
                                </h2>

                                <p className="mt-1 text-sm text-gray-600">
                                    Update role information and permissions.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Role Name"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={handleChange}
                                        isFocused={true}
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel value="Permissions" />
                                    <DropdownMulti
                                        options={permissionOptions}
                                        value={data.permissions}
                                        onChange={handlePermissionsChange}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError
                                        message={errors.permissions}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>
                                        Update Role
                                    </PrimaryButton>

                                    <SecondaryButton>
                                        <Link href={route("roles.index")}>
                                            Cancel
                                        </Link>
                                    </SecondaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
