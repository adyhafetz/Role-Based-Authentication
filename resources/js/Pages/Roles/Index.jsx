import Pill from "@/Components/Pill";
import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, roles }) {
    const handleDelete = (id) => {
        router.delete(route("roles.destroy", id));
    };

    const userPermissions = auth.user.permissions;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 ">
                        Role List
                    </h2>
                    {userPermissions.includes("role create") && (
                        <PrimaryButton>
                            <Link href={route("roles.create")}>Add Role</Link>
                        </PrimaryButton>
                    )}
                </div>
            }
        >
            <Head title="Roles" />
            <div className="py-12">
                <Table>
                    <Table.THead>
                        <Table.Tr>
                            <Table.Th>Role</Table.Th>
                            <Table.Th>Permissions</Table.Th>
                            <Table.Th>Actions</Table.Th>
                        </Table.Tr>
                    </Table.THead>
                    <Table.TBody>
                        {roles.map((role) => (
                            <Table.Tr key={role.id}>
                                <Table.Td>{role.name}</Table.Td>
                                <Table.Td className="flex flex-wrap gap-2">
                                    {role.permissions.map((permission) => (
                                        <Pill
                                            key={permission.id}
                                            text={permission.name}
                                            bgColorClass="bg-gray-200"
                                            textColorClass="text-gray-800"
                                            widthClass="w-20"
                                            heightClass="h-6"
                                        />
                                    ))}
                                </Table.Td>
                                <Table.Td>
                                    {userPermissions.includes("role edit") && (
                                        <Link
                                            href={route("roles.edit", role.id)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                        >
                                            Edit
                                        </Link>
                                    )}
                                    {userPermissions.includes(
                                        "role delete"
                                    ) && (
                                        <button
                                            onClick={() =>
                                                handleDelete(role.id)
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
