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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label";
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
        question: "Apa itu BigBox dan layanan apa saja yang ditawarkan?",
        answer: "Lorem ipsum odor amet, consectetuer adipiscing elit. Lacus egestas vestibulum congue elit interdum erat penatibus. Nam congue hendrerit euismod habitant eleifend. Taciti justo rhoncus ornare vulputate aenean sapien quam dapibus ligula. Sed odio enim fames mauris litora tortor sapien. Sodales platea faucibus turpis curabitur, sagittis scelerisque scelerisque taciti elit. Taciti tempor ac praesent; etiam fusce consequat varius. Donec ut varius litora varius sociosqu aliquet proin. Magna tellus magna pharetra tincidunt gravida tincidunt.Eget tempus non aliquam montes purus nascetur molestie. Cubilia sem congue auctor pretium habitant ornare nisl ligula. Cras maecenas class mattis porttitor gravida imperdiet varius. Metus nisl vestibulum maecenas varius hac iaculis. Quam ultrices nisl tristique porttitor ornare condimentum. Himenaeos vel fringilla feugiat dui sapien potenti condimentum ad scelerisque. Morbi aptent faucibus volutpat, cubilia libero sapien mollis. Volutpat sociosqu potenti ut eros consequat hac; ligula dapibus gravida. Nibh dapibus efficitur urna etiam tempus porttitor ligula.",
    },
    {
        question: "Bagaimana cara mengakses platform BigBox?",
        answer: "Lorem ipsum odor amet, consectetuer adipiscing elit. Lacus egestas vestibulum congue elit interdum erat penatibus. Nam congue hendrerit euismod habitant eleifend. Taciti justo rhoncus ornare vulputate aenean sapien quam dapibus ligula. Sed odio enim fames mauris litora tortor sapien. Sodales platea faucibus turpis curabitur, sagittis scelerisque scelerisque taciti elit. Taciti tempor ac praesent; etiam fusce consequat varius. Donec ut varius litora varius sociosqu aliquet proin. Magna tellus magna pharetra tincidunt gravida tincidunt.Eget tempus non aliquam montes purus nascetur molestie. Cubilia sem congue auctor pretium habitant ornare nisl ligula. Cras maecenas class mattis porttitor gravida imperdiet varius. Metus nisl vestibulum maecenas varius hac iaculis. Quam ultrices nisl tristique porttitor ornare condimentum. Himenaeos vel fringilla feugiat dui sapien potenti condimentum ad scelerisque. Morbi aptent faucibus volutpat, cubilia libero sapien mollis. Volutpat sociosqu potenti ut eros consequat hac; ligula dapibus gravida. Nibh dapibus efficitur urna etiam tempus porttitor ligula."
    },
    {
        question: "Apakah saya bisa mengintegrasi data dari berbagai sumber ke BigBox?",
        answer: "Lorem ipsum odor amet, consectetuer adipiscing elit. Lacus egestas vestibulum congue elit interdum erat penatibus. Nam congue hendrerit euismod habitant eleifend. Taciti justo rhoncus ornare vulputate aenean sapien quam dapibus ligula. Sed odio enim fames mauris litora tortor sapien. Sodales platea faucibus turpis curabitur, sagittis scelerisque scelerisque taciti elit. Taciti tempor ac praesent; etiam fusce consequat varius. Donec ut varius litora varius sociosqu aliquet proin. Magna tellus magna pharetra tincidunt gravida tincidunt.Eget tempus non aliquam montes purus nascetur molestie. Cubilia sem congue auctor pretium habitant ornare nisl ligula. Cras maecenas class mattis porttitor gravida imperdiet varius. Metus nisl vestibulum maecenas varius hac iaculis. Quam ultrices nisl tristique porttitor ornare condimentum. Himenaeos vel fringilla feugiat dui sapien potenti condimentum ad scelerisque. Morbi aptent faucibus volutpat, cubilia libero sapien mollis. Volutpat sociosqu potenti ut eros consequat hac; ligula dapibus gravida. Nibh dapibus efficitur urna etiam tempus porttitor ligula."
    },
    {
        question: "Bagaimana cara menggunakan fitur Machine learning di BigBox?",
        answer: "Lorem ipsum odor amet, consectetuer adipiscing elit. Lacus egestas vestibulum congue elit interdum erat penatibus. Nam congue hendrerit euismod habitant eleifend. Taciti justo rhoncus ornare vulputate aenean sapien quam dapibus ligula. Sed odio enim fames mauris litora tortor sapien. Sodales platea faucibus turpis curabitur, sagittis scelerisque scelerisque taciti elit. Taciti tempor ac praesent; etiam fusce consequat varius. Donec ut varius litora varius sociosqu aliquet proin. Magna tellus magna pharetra tincidunt gravida tincidunt.Eget tempus non aliquam montes purus nascetur molestie. Cubilia sem congue auctor pretium habitant ornare nisl ligula. Cras maecenas class mattis porttitor gravida imperdiet varius. Metus nisl vestibulum maecenas varius hac iaculis. Quam ultrices nisl tristique porttitor ornare condimentum. Himenaeos vel fringilla feugiat dui sapien potenti condimentum ad scelerisque. Morbi aptent faucibus volutpat, cubilia libero sapien mollis. Volutpat sociosqu potenti ut eros consequat hac; ligula dapibus gravida. Nibh dapibus efficitur urna etiam tempus porttitor ligula."
    },
    {
        question: "Apakah data yang saya unggah ke BigBox aman?",
        answer: "Lorem ipsum odor amet, consectetuer adipiscing elit. Lacus egestas vestibulum congue elit interdum erat penatibus. Nam congue hendrerit euismod habitant eleifend. Taciti justo rhoncus ornare vulputate aenean sapien quam dapibus ligula. Sed odio enim fames mauris litora tortor sapien. Sodales platea faucibus turpis curabitur, sagittis scelerisque scelerisque taciti elit. Taciti tempor ac praesent; etiam fusce consequat varius. Donec ut varius litora varius sociosqu aliquet proin. Magna tellus magna pharetra tincidunt gravida tincidunt.Eget tempus non aliquam montes purus nascetur molestie. Cubilia sem congue auctor pretium habitant ornare nisl ligula. Cras maecenas class mattis porttitor gravida imperdiet varius. Metus nisl vestibulum maecenas varius hac iaculis. Quam ultrices nisl tristique porttitor ornare condimentum. Himenaeos vel fringilla feugiat dui sapien potenti condimentum ad scelerisque. Morbi aptent faucibus volutpat, cubilia libero sapien mollis. Volutpat sociosqu potenti ut eros consequat hac; ligula dapibus gravida. Nibh dapibus efficitur urna etiam tempus porttitor ligula."
    },
]



function AdminFaqTable() {
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [columnVisibility, setColumnVisibility] = useState({})
    const [rowSelection, setRowSelection] = useState({})
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [modalType, setModalType] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleOpenModal = (type, productName, answer) => {
        setModalType(type);
        setSelectedProduct(productName);
        setSelectedAnswer(answer)
    };

    const handleCloseModal = () => {
        setModalType(null);
        setSelectedProduct(null);
    };

    const table = useReactTable({
        data: dataProduct,
        columns: [
            {
                accessorKey: "question",
                header: "Question",
                cell: ({ row }) => (
                    <div className="capitalize">{row.getValue("question")}</div>
                ),
            },
            {
                accessorKey: "answer",
                header: "Answer",
                cell: ({ row }) => (
                    <div className="capitalize text-sm text-muted-foreground">{row.getValue("answer")}</div>
                ),
            },
            {
                accessorKey: "action",
                header: "Action",
                cell: ({ row }) => {
                    const handleEditClick = () => {
                        const question = row.getValue("question");
                        const answer = row.getValue("answer")
                        handleOpenModal("edit", question, answer);
                    };
        
                    const handleDeleteClick = () => {
                        const name = row.getValue("question");
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
                        placeholder="Search Question"
                        value={table.getColumn("question")?.getFilterValue() || ""}
                        onChange={(event) => table.getColumn("question")?.setFilterValue(event.target.value)}
                        className="pl-8"
                    />
                </div>
                <Button className="bg-[#0449D0] gap-1" onClick={() => handleOpenModal("add")}>
                    <Plus size={18} />
                    Add FAQ
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
                        <DialogTitle className="text-xl">Add New FAQ</DialogTitle>
                        <DialogDescription>Please enter the question and answer below to add it to the FAQ list.</DialogDescription>
                    </DialogHeader>
                    <Label htmlFor="question">Question</Label>
                    <Input id="question" placeholder="Question"/>
                    <Label htmlFor="answer">Answer</Label>
                    <Textarea id="answer" placeholder="Answer" />
                    <DialogFooter>
                        <Button onClick={handleCloseModal} className="bg-[#0449D0]">Add FAQ</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Product Modal */}
            <Dialog open={modalType === "edit"} onOpenChange={handleCloseModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl">Edit FAQ</DialogTitle>
                        <DialogDescription>Please enter the new question and answer below to add it to the FAQ list.</DialogDescription>
                    </DialogHeader>
                    <Label htmlFor="question">Question</Label>
                    <Input id="question" placeholder="Question" value={selectedProduct} />
                    <Label htmlFor="answer">Answer</Label>
                    <Textarea id="answer" placeholder="Answer" value={selectedAnswer} />
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
                    <p>Are you sure you want to delete this from the FAQ list?</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={handleCloseModal}>Cancel</Button>
                        <Button className="bg-red-600" onClick={handleCloseModal}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AdminFaqTable;
