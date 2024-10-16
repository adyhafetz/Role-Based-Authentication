import React from "react";

const Table = ({ children, className = "" }) => {
    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className={`w-full whitespace-no-wrap ${className}`}>
                    {children}
                </table>
            </div>
        </div>
    );
};

const Th = ({ children, className = "" }) => {
    return (
        <th
            className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
            scope="col"
        >
            {children}
        </th>
    );
};

const Td = ({ children, className = "" }) => {
    return (
        <td
            className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ${className}`}
        >
            {children}
        </td>
    );
};

const Tr = ({ children, className = "" }) => {
    return <tr className={`${className}`}>{children}</tr>;
};

const THead = ({ children, className = "" }) => {
    return <thead className={`bg-gray-50 ${className}`}>{children}</thead>;
};

const TBody = ({ children, className = "" }) => {
    return (
        <tbody className={`bg-white divide-y divide-gray-200 ${className}`}>
            {children}
        </tbody>
    );
};

Table.Th = Th;
Table.Td = Td;
Table.Tr = Tr;
Table.THead = THead;
Table.TBody = TBody;

export default Table;
