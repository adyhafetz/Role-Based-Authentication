import Pill from "@/Components/Pill";
import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";

export default function Index({ auth, users }) {
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this user?")) {
            router.delete(route("users.destroy", id));
        }
    };

    const userPermissions = auth.user.permissions;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 ">
                        User List
                    </h2>
                    {userPermissions.includes("user create") && (
                        <PrimaryButton>
                            <Link href={route("users.create")}>Add User</Link>
                        </PrimaryButton>
                    )}
                </div>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <Table>
                    <Table.THead>
                        <Table.Tr>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th>Role</Table.Th>
                            <Table.Th>Actions</Table.Th>
                        </Table.Tr>
                    </Table.THead>
                    <Table.TBody>
                        {users.map((user) => (
                            <Table.Tr key={user.id}>
                                <Table.Td>{user.name}</Table.Td>
                                <Table.Td>{user.email}</Table.Td>
                                <Table.Td className="flex flex-wrap gap-2">
                                    {user.roles &&
                                        user.roles.length > 0 &&
                                        user.roles.map((role) => (
                                            <Pill
                                                key={role.id}
                                                text={role.name}
                                                bgColorClass={
                                                    role.name === "user"
                                                        ? "bg-blue-200"
                                                        : role.name === "admin"
                                                        ? "bg-red-200"
                                                        : "bg-gray-200"
                                                }
                                                textColorClass={
                                                    role.name === "user"
                                                        ? "text-blue-800"
                                                        : role.name === "admin"
                                                        ? "text-red-800"
                                                        : "text-gray-800"
                                                }
                                                widthClass="w-16"
                                                heightClass="h-6"
                                            />
                                        ))}
                                </Table.Td>
                                <Table.Td>
                                    {userPermissions.includes("user edit") && (
                                        <Link
                                            href={route("users.edit", user.id)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                        >
                                            Edit
                                        </Link>
                                    )}
                                    {userPermissions.includes(
                                        "user delete"
                                    ) && (
                                        <button
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.TBody>
                </Table>
            </div>
        </AuthenticatedLayout>
    );
}
