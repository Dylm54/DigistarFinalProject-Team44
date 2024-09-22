import {
    Bell,
    CircleUser,
    Home,
    Menu,
    Search,
    Users,
    MessageSquareWarning,
    SquareCheckBig,
    LogOut,
    ChevronRight, ChevronLeft,
    Ticket,
    LayoutDashboard,
    Settings,
    Printer,
    ArrowUpDown, ChevronDown, MoreHorizontal
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import logo from '../assets/BigBoxLogo.svg'
import { Separator } from "@/components/ui/separator"
import { useState, useCallback, useMemo } from "react"
import { data } from "../allTicketsDummyData"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import BigBoxPP from '../assets/BigBoxAdminPP.png'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { addDays, format, parse, isWithinInterval } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import * as XLSX from "xlsx";

const columns = [
    {
        accessorKey: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllRowsSelected()}
                onCheckedChange={(checked) => table.toggleAllRowsSelected(checked)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(checked) => row.toggleSelected(checked)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableColumnFilter: false,
    },
    {
        accessorKey: "ticketNumber",
        header: "Ticket Number",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("ticketNumber")}</div>
        ),
    },
    {
        accessorKey: "ticketType",
        header: "Type",
        cell: ({ row }) => (
            <Badge variant="grey">{row.getValue("ticketType")}</Badge>
        ),
    },
    {
        accessorKey: "product",
        header: "Product",
        cell: ({ row }) => (
            <Badge variant="blue">{row.getValue("product")}</Badge>
        ),
    },
    {
        accessorKey: "issue",
        header: "Issue",
        cell: ({ row }) => (
            <div className="capitalize font-semibold">{row.getValue("issue")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <Badge variant="green" className="capitalize">{row.getValue("status")}</Badge>
        ),
    },
    {
        accessorKey: "date",
        header: "Date Created",
        cell: ({ row }) => (
            <CardDescription className="capitalize">{row.getValue("date")}</CardDescription>
        ),
    },
]

export function AdminReport() {
    const [searchTerm, setSearchTerm] = useState("");
    const [date, setDate] = useState();
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [selectedRows, setSelectedRows] = useState([]);

    const completedTickets = useMemo(() => {
        return data.filter(item => item.status === "Complete")
    }, []);

    const filteredTickets = useMemo(() => {
        return completedTickets
            .filter(item => item.ticketNumber.includes(searchTerm))
            .filter(item => {
                if (!date?.from || !date?.to) return true;
                const ticketDate = parse(item.date, "dd/MM/yyyy hh.mm a", new Date());
                return isWithinInterval(ticketDate, { start: date.from, end: date.to });
            });
    }, [completedTickets, searchTerm, date]);

    const table = useReactTable({
        data: filteredTickets,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setSelectedRows,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection: selectedRows,
        },
    });

    const handleExport = () => {
        const selectedData = table.getSelectedRowModel().flatRows.map(row => row.original);
        const worksheet = XLSX.utils.json_to_sheet(selectedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Tickets");

        // Export to file
        XLSX.writeFile(workbook, "selected_tickets.xlsx");
    };

    const handleLogout = () => {
        window.location.href = '/admin-login'
    }

    return (
        <div className="flex min-h-screen w-full">
            <div className="hidden border-r bg-muted/40 lg:block fixed h-full bg-white w-60 z-[100]">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
                        <a href="/" className="flex items-center gap-2 font-semibold fixed">
                            <img src={logo} alt="logo" className="fixed" />
                        </a>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <a
                                href="/"
                                className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-[#0449D0]"
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </a>
                            <a
                                href="/tickets"
                                className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-[#0449D0]"
                            >
                                <Ticket className="h-4 w-4" />
                                Tickets
                            </a>
                            <a
                                href="/report"
                                className="flex items-center gap-3 rounded-lg px-3 py-3 bg-muted text-[#0449D0] transition-all hover:text-[#0449D0]"
                            >
                                <MessageSquareWarning className="h-4 w-4" />
                                Reports
                            </a>
                            <a
                                href="/settings"
                                className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-[#0449D0]"
                            >
                                <Settings className="h-4 w-4" />
                                Settings
                            </a>
                        </nav>
                    </div>
                    <div className="grid items-start px-2 py-2 text-sm font-medium lg:px-4">
                        <a
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-[#0449D0]"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </a>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 fixed w-full bg-white z-50">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 lg:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium">
                                <a
                                    href="#"
                                    className="flex items-center gap-2 text-lg font-semibold"
                                >
                                    <img src={logo} className="h-28 w-28"></img>
                                    <span className="sr-only">Acme Inc</span>
                                </a>
                                <a
                                    href="/"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <LayoutDashboard className="h-5 w-5" />
                                    Dashboard
                                </a>
                                <a
                                    href="/tickets"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <Ticket className="h-5 w-5" />
                                    Tickets
                                </a>
                                <a
                                    href="/report"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-[#0449D0] hover:text-foreground"
                                >
                                    <MessageSquareWarning className="h-5 w-5" />
                                    Reports
                                </a>
                                <a
                                    href="/settings"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <Settings className="h-5 w-5" />
                                    Settings
                                </a>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1">
                    </div>
                    <div className="flex items-center gap-2 fixed right-52">
                        <Button variant="outline" size="icon" className="ml-auto h-8 w-8 fixed right-56">
                            <Bell className="h-4 w-4" />
                            <span className="sr-only">Toggle notifications</span>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="fixed">
                                <div className="flex flex-row gap-4">
                                    <Button variant="secondary" size="icon" className="rounded-full">
                                        <CircleUser className="h-5 w-5" />
                                        <span className="sr-only">Toggle user menu</span>
                                    </Button>
                                    <div className="flex flex-col">
                                        <p className="text-sm">admin123</p>
                                        <p className="text-muted-foreground text-xs">admin123@gmail.com</p>
                                    </div>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-[#F0F5FF] md:gap-8 md:p-8 !pt-20 lg:pl-[271px] p-5 ">
                    <div className="mx-auto flex w-full max-w-6xl items-start justify-center flex-col gap-6">
                        <div className="flex w-full ">
                            <h1 className="text-2xl font-semibold">Report</h1>
                        </div>
                        <Card className="w-full">
                            <CardHeader>
                                <div className="flex gap-4 md:flex-row flex-col justify-between items-center">
                                    <div className="flex w-full md:w-80 relative">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search by Ticket Number"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-8"
                                        />
                                    </div>
                                    <Button className="bg-[#0449D0] gap-2" onClick={handleExport} disabled={!table.getSelectedRowModel().flatRows.length}>
                                        <Printer size={20}/>
                                        Export XLS
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {/* Search and filters */}
                                <div className="flex flex-col md:flex-row gap-4 mb-5 justify-between">
                                    <div className="flex gap-4 w-full">
                                        <Select onValueChange={(event) => table.getColumn("ticketType")?.setFilterValue(event)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Types</SelectItem>
                                                <SelectItem value="Technical Support">Technical Support</SelectItem>
                                                <SelectItem value="Account Management">Account Management</SelectItem>
                                                <SelectItem value="Data Integration Issues">Data Integration Issues</SelectItem>
                                                <SelectItem value="Performance & Scalability Issues">Performance & Scalability Issues</SelectItem>
                                                <SelectItem value="Analytics & Insights Assistance">Analytics & Insights Assistance</SelectItem>
                                                <SelectItem value="Training & Documentation Request">Training & Documentation Request</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Select onValueChange={(event) => table.getColumn("product")?.setFilterValue(event)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Product" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Products</SelectItem>
                                                <SelectItem value="BigSocia">BigSocia</SelectItem>
                                                <SelectItem value="BigLegal">BigLegal</SelectItem>
                                                <SelectItem value="BigBuilder">BigBuilder</SelectItem>
                                                <SelectItem value="BigVision">BigVision</SelectItem>
                                                <SelectItem value="BigAssistant">BigAssistant</SelectItem>
                                                <SelectItem value="BigOne">BigOne</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <div className="w-full">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        id="date"
                                                        variant={"outline"}
                                                        className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"
                                                            }`}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {date ? (
                                                            date?.from ? (
                                                                date.to ? (
                                                                    <>
                                                                        {format(date.from, "LLL dd, y")} -{" "}
                                                                        {format(date.to, "LLL dd, y")}
                                                                    </>
                                                                ) : (
                                                                    format(date.from, "LLL dd, y")
                                                                )
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )
                                                        }
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        initialFocus
                                                        mode="range"
                                                        defaultMonth={date?.from}
                                                        selected={date}
                                                        onSelect={setDate}
                                                        numberOfMonths={2}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                </div>
                                {/* Ticket cards */}
                                <div className="w-full">
                                    <div className="rounded-md border">
                                        <Table>
                                            <TableHeader className="bg-muted">
                                                {table.getHeaderGroups().map(headerGroup => (
                                                    <TableRow key={headerGroup.id}>
                                                        {headerGroup.headers.map(header => (
                                                            <TableHead key={header.id}>
                                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                                            </TableHead>
                                                        ))}
                                                    </TableRow>
                                                ))}
                                            </TableHeader>
                                            <TableBody>
                                                {table.getRowModel().rows.map(row => (
                                                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                                        {row.getVisibleCells().map(cell => (
                                                            <TableCell key={cell.id}>
                                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                ))}
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
                            </CardContent>
                            <CardFooter>
                            </CardFooter>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}