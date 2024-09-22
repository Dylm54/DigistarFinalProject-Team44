import React, { useState } from 'react';
import {
    Bell,
    CircleUser,
    Home,
    Menu,
    Search,
    Plus,
    Pencil,
    Trash2,
    Users,
    MessageSquareWarning,
    SquareCheckBig,
    LogOut,
    ChevronRight, ChevronLeft,
    Ticket,
    LayoutDashboard,
    Settings,
    ArrowUpDown, ChevronDown, MoreHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

const dataProduct = [
    {
        id: "m5gr84i9",
        name: "Technical Support",
    },
    {
        id: "3u1reuv4",
        name: "Account Management"
    },
    {
        id: "derv1ws0",
        name: "Data Integration Issues"
    },
    {
        id: "5kma53ae",
        name: "Performance & Scalability Issues"
    },
    {
        id: "bhqecj4p",
        name: "Analytics & Insights Assistance"
    },
    {
        id: "jghecj4p",
        name: "Training & Documentation Request"
    },
]



function AdminTicketTypeTable() {
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [columnVisibility, setColumnVisibility] = useState({})
    const [rowSelection, setRowSelection] = useState({})

    const [modalType, setModalType] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleOpenModal = (type, productName) => {
        setModalType(type);
        setSelectedProduct(productName);
    };

    const handleCloseModal = () => {
        setModalType(null);
        setSelectedProduct(null);
    };

    const table = useReactTable({
        data: dataProduct,
        columns: [
            {
                accessorKey: "id",
                header: "Id",
                cell: ({ row }) => (
                    <div className="capitalize">{row.getValue("id")}</div>
                ),
            },
            {
                accessorKey: "name",
                header: "Type",
                cell: ({ row }) => (
                    <div className="capitalize">{row.getValue("name")}</div>
                ),
            },
            {
                accessorKey: "action",
                header: "Action",
                cell: ({ row }) => {
                    const handleEditClick = () => {
                        const name = row.getValue("name");
                        handleOpenModal("edit", name);
                    };
        
                    const handleDeleteClick = () => {
                        const name = row.getValue("name");
                        handleOpenModal("delete", name);
                    };
        
                    return (
                        <div className='flex gap-1'>
                            <Button className="bg-yellow-400 hover:bg-yellow-400/80" onClick={handleEditClick}>
                                <Pencil size={16} />
                            </Button>
                            <Button className="bg-red-500 hover:bg-red-400/80" onClick={handleDeleteClick}>
                                <Trash2 size={16} />
                            </Button>
                        </div>
                    );
                },
            },
        ],
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className='flex w-full gap-5 flex-col pt-5'>
            <div className='flex w-full justify-between items-center'>
                <div className="flex w-full md:w-80 relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search Ticket Type"
                        value={table.getColumn("name")?.getFilterValue() || ""}
                        onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
                        className="pl-8"
                    />
                </div>
                <Button className="bg-[#0449D0] gap-1" onClick={() => handleOpenModal("add")}>
                    <Plus size={18} />
                    Add Type
                </Button>
            </div>
            <div className="w-full">
                <div className="rounded-md border">
                    <Table>
                        <TableHeader className="bg-muted">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-start space-x-2 py-4">
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>

            {/* Add Product Modal */}
            <Dialog open={modalType === "add"} onOpenChange={handleCloseModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl">Add New Type</DialogTitle>
                        <DialogDescription>Please enter the ticket type below to add it to the dropdown menu.</DialogDescription>
                    </DialogHeader>
                    <Input placeholder="Product Name" />
                    <DialogFooter>
                        <Button onClick={handleCloseModal} className="bg-[#0449D0]">Add Type</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Product Modal */}
            <Dialog open={modalType === "edit"} onOpenChange={handleCloseModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl">Edit Ticket Type</DialogTitle>
                        <DialogDescription>Please enter the new ticket type below to add it to the dropdown menu.</DialogDescription>
                    </DialogHeader>
                    <Input placeholder="Product Name" value={selectedProduct} />
                    <DialogFooter>
                        <Button onClick={handleCloseModal} className="bg-[#0449D0]">Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Product Modal */}
            <Dialog open={modalType === "delete"} onOpenChange={handleCloseModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl">Delete Product</DialogTitle>
                        
                    </DialogHeader>
                    <p>Are you sure you want to delete {selectedProduct} from the dropdown menu?</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={handleCloseModal}>Cancel</Button>
                        <Button className="bg-red-600" onClick={handleCloseModal}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AdminTicketTypeTable;
