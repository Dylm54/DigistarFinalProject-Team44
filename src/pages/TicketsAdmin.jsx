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
    Settings
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { useState } from "react"
import { data } from "../allTicketsDummyData"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import BigBoxPP from '../assets/BigBoxAdminPP.png'
import { addDays, format, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";


export function TicketsAdmin() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTicketType, setSelectedTicketType] = useState("all");
    const [selectedProduct, setSelectedProduct] = useState("all");
    const [selectedPriority, setSelectedPriority] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("all");
    const ticketsPerPage = 5; // Set the number of tickets per page
    const [date, setDate] = useState();



    // Filter data based on search and dropdown filters
    const filteredData = data.filter(item => {
        const matchesTicketNumber = item.ticketNumber.includes(searchTerm);
        const matchesTicketType = selectedTicketType === "all" || item.ticketType === selectedTicketType;
        const matchesProduct = selectedProduct === "all" || item.product === selectedProduct;
        const matchesStatus = statusFilter === "all" || item.status === statusFilter;
        const matchesPriority = selectedPriority === "all" || item.priority === selectedPriority;
        const itemDate = parse(item.date, "dd/MM/yyyy hh.mm a", new Date());

        if (date?.from && date?.to) {
            return (itemDate >= date.from && itemDate <= date.to) && matchesTicketNumber && matchesTicketType && matchesProduct && matchesStatus && matchesPriority;
        } else {
            return matchesTicketNumber && matchesTicketType && matchesProduct && matchesStatus && matchesPriority;
        }
    });

    // Pagination logic
    const indexOfLastTicket = currentPage * ticketsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
    const currentTickets = filteredData.slice(indexOfFirstTicket, indexOfLastTicket);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const ticketStatus = (item) => {
        if (item.status === "Ongoing") {
            return <Badge variant="yellow">Ongoing</Badge>;
        } if (item.status === "Complete") {
            return <Badge variant="green">Complete</Badge>;
        } if (item.status === "Waiting") {
            return <Badge variant="red">Waiting</Badge>;
        }
    };

    const ticketPriority = (item) => {
        if (item.priority === "no-priority") {
            return <div className="h-4 w-4 bg-[#6032BC] rounded-full"></div>
        } if (item.priority === "high") {
            return <div className="h-4 w-4 bg-[#F64946] rounded-full"></div>
        } if (item.priority === "medium") {
            return <div className="h-4 w-4 bg-[#FAB000] rounded-full"></div>
        } if (item.priority === "low") {
            return <div className="h-4 w-4 bg-[#00A18B] rounded-full"></div>
        }
    };

    const limitText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    const totalPages = Math.ceil(filteredData.length / ticketsPerPage);

    const handleDetail = (number) => {
        window.location.href = `/tickets/ticket-detail/${number}`
    }

    const handleLogout = () => {
        window.location.href = '/admin-login'
    }

    return (
        <div className="flex min-h-screen w-full">
            <div className="hidden border-r bg-muted/40 lg:block fixed h-full bg-white w-60 z-[100]">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
                        <a href="/" className="flex items-center gap-2 font-semibold fixed">
                            <img src={logo} alt="logo" className="fixed"/>
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
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-3 bg-muted text-[#0449D0] transition-all hover:text-[#0449D0]"
                            >
                                <Ticket className="h-4 w-4" />
                                Tickets

                            </a>
                            <a
                                href="/report"
                                className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-[#0449D0]"
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
                                    href="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-[#0449D0] hover:text-foreground"
                                >
                                    <Ticket className="h-5 w-5" />
                                    Tickets
                                </a>
                                <a
                                    href="/report"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl  px-3 py-2 text-muted-foreground hover:text-foreground"
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
                            <h1 className="text-2xl font-semibold">Tickets</h1>
                        </div>
                        <Card className="w-full">
                            <CardHeader>
                                <div className="flex gap-4 md:flex-row flex-col justify-between items-center">
                                    <div>
                                        <div className="flex border-b border-[#EFEFEF]">
                                            {/* All Tickets */}
                                            <div
                                                className={`cursor-pointer pb-2 px-4 text-sm transition ${statusFilter === "all"
                                                    ? "text-blue-600 font-normal border-b-2 border-blue-600"
                                                    : "text-gray-500 font-normal"
                                                    }`}
                                                onClick={() => setStatusFilter("all")}
                                            >
                                                All
                                            </div>

                                            {/* Waiting */}
                                            <div
                                                className={`cursor-pointer pb-2 px-4 text-sm transition ${statusFilter === "Waiting"
                                                    ? "text-blue-600 font-normal border-b-2 border-blue-600"
                                                    : "text-gray-500 font-normal"
                                                    }`}
                                                onClick={() => setStatusFilter("Waiting")}
                                            >
                                                Waiting
                                            </div>

                                            {/* Ongoing */}
                                            <div
                                                className={`cursor-pointer pb-2 px-4 text-sm transition ${statusFilter === "Ongoing"
                                                    ? "text-blue-600 font-normal border-b-2 border-blue-600"
                                                    : "text-gray-500 font-normal"
                                                    }`}
                                                onClick={() => setStatusFilter("Ongoing")}
                                            >
                                                Ongoing
                                            </div>

                                            {/* Completed */}
                                            <div
                                                className={`cursor-pointer pb-2 px-4 text-sm transition ${statusFilter === "Complete"
                                                    ? "text-blue-600 font-normal border-b-2 border-blue-600"
                                                    : "text-gray-500 font-normal"
                                                    }`}
                                                onClick={() => setStatusFilter("Complete")}
                                            >
                                                Completed
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex w-full md:w-80 relative">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search by Ticket Number"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-8"
                                        />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {/* Search and filters */}
                                <div className="flex flex-col md:flex-row gap-4 mb-5 justify-between">
                                    <div className="flex gap-4 w-full">
                                        <Select onValueChange={setSelectedPriority}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Priority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Priority</SelectItem>
                                                <SelectItem value="no-priority">No Priority</SelectItem>
                                                <SelectItem value="high">High</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="low">Low</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Select onValueChange={setSelectedTicketType}>
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
                                        <Select onValueChange={setSelectedProduct}>
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
                                <div className="flex flex-col gap-4">
                                    {currentTickets.map((item, i) => (
                                        <Card className="w-full" key={i}>
                                            <CardHeader className="p-4 pb-2">
                                                <div className="flex flex-col gap-4 md:flex-row w-full justify-between items-center">
                                                    <div className="flex flex-col gap-3 w-full">
                                                        <div className="flex gap-2 items-center flex-row w-full">
                                                            <div className="flex flex-row items-center gap-2 justify-center">
                                                                {ticketPriority(item)}
                                                                <CardTitle className="tracking-normal font-semibold text-sm">{item.ticketNumber}</CardTitle>
                                                            </div>

                                                            {ticketStatus(item)}
                                                        </div>
                                                    </div>
                                                    <CardDescription className="text-xs w-full md:text-right">
                                                        Created on {item.date}
                                                    </CardDescription>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="gap-2 flex flex-col p-4  pt-0 ">
                                                <h2 className=" font-medium text-xs">{item.issue}</h2>
                                                <CardDescription className="text-xs text-[#71717A] font-normal">
                                                    {limitText(item.issueDetail, 400)}
                                                </CardDescription>
                                                <div className="flex gap-2">
                                                    <Badge variant="blue">{item.product}</Badge>
                                                    <Badge variant="grey">{item.ticketType}</Badge>
                                                </div>
                                                <Separator className="" />
                                            </CardContent>
                                            <CardFooter className="flex-col p-4 pt-0">
                                                <div className="flex justify-between w-full items-center">
                                                    <div className="flex items-center gap-2">
                                                        <img src={BigBoxPP} className="rounded-full w-[32px] h-[32px] object-cover" alt="" />
                                                        <p className="text-sm font-medium">user123</p>
                                                    </div>
                                                    <Button className="bg-[#0449D0] text-xs hover:bg-[#0449D0]/80" size="sm" onClick={() => handleDetail(item.ticketNumber)}>
                                                        Open Ticket
                                                    </Button>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="flex w-full justify-between mt-5 items-center">
                                    <div className="flex flex-row gap-2">
                                        <Button
                                            onClick={() => paginate(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            size="icon"
                                            className=" bg-[#F6F6F6] text-[#B3B3B3]"
                                        >
                                            <ChevronLeft size={16} />
                                        </Button>

                                        {/* Current Page */}
                                        <Button disabled className="bg-[#0449D0] disabled:opacity-100 text-xs">{currentPage}</Button>

                                        {/* Next Button */}
                                        <Button
                                            onClick={() => paginate(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            size="icon"
                                            className="bg-[#F6F6F6] text-[#B3B3B3]"
                                        >
                                            <ChevronRight size={16} />
                                        </Button>
                                    </div>
                                    <p className="text-xs">
                                        Displaying {indexOfFirstTicket + 1}-{Math.min(indexOfLastTicket, filteredData.length)} of {filteredData.length} Tickets
                                    </p>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>


                </main>
            </div>
        </div>
    )
}