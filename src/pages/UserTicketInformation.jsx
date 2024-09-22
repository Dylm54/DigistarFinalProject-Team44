import { useState } from "react";
import { CircleUser, Menu, ChevronRight, ChevronLeft, Search } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import BigBoxLogo from '../assets/BigBoxLogo.svg';
import { TicketInformationTable } from "../components/TicketInformationTable";
import { data } from "../allTicketsDummyData";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import BigBoxPP from '../assets/BigBoxAdminPP.png'
import Footer from "../components/Footer";

export function UserTicketInformation() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTicketType, setSelectedTicketType] = useState("all");
    const [selectedProduct, setSelectedProduct] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const ticketsPerPage = 3; // Set the number of tickets per page

    // Filter data based on search and dropdown filters
    const filteredData = data.filter(item => {
        const matchesTicketNumber = item.ticketNumber.includes(searchTerm);
        const matchesTicketType = selectedTicketType === "all" || item.ticketType === selectedTicketType;
        const matchesProduct = selectedProduct === "all" || item.product === selectedProduct;


        return matchesTicketNumber && matchesTicketType && matchesProduct;
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

    const limitText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    const totalPages = Math.ceil(filteredData.length / ticketsPerPage);

    const handleDetail = (number) => {
        window.location.href = `/user/ticket-information/ticket-detail/${number}`
    }

    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <img src={BigBoxLogo} className="w-40 h-40" alt="Logo" />

                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <img src={BigBoxLogo} width="100" height="100" alt="Logo" className="mb-4" />
                            <a
                                href="/user"
                                className="text-muted-foreground transition-colors hover:text-[#0449D0]"
                            >
                                Home
                            </a>
                            <a
                                href="/user/create-ticket"
                                className="text-muted-foreground transition-colors hover:text-[#0449D0]"
                            >
                                CreateTicket
                            </a>
                            <a
                                href="#"
                                className="text-[#0449D0] font-semibold transition-colors hover:text-[#0449D0]"
                            >
                                Ticket Information
                            </a>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="w-full md:flex text-lg md:text-sm justify-center gap-6 hidden">
                    <a
                        href="/user"
                        className="text-muted-foreground transition-colors hover:text-[#0449D0]"
                    >
                        Home
                    </a>
                    <a
                        href="/user/create-ticket"
                        className="text-muted-foreground transition-colors hover:text-[#0449D0]"
                    >
                        Create Ticket
                    </a>
                    <a
                        href="#"
                        className="text-[#0449D0] font-semibold transition-colors hover:text-[#0449D0]"
                    >
                        Ticket Information
                    </a>
                </div>
                <div className="flex md:w-auto w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <div className="ml-auto flex-1 sm:flex-initial">
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex flex-row gap-4">
                                <Button variant="secondary" size="icon" className="rounded-full">
                                    <CircleUser className="h-5 w-5" />
                                    <span className="sr-only">Toggle user menu</span>
                                </Button>
                                <div className="flex flex-col">
                                    <p className="text-sm">user123</p>
                                    <p className="text-muted-foreground text-xs">user123@gmail.com</p>
                                </div>
                            </div>

                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-[#F0F5FF] md:gap-8 md:p-8 p-5 ">
                <div className="mx-auto flex w-full max-w-4xl items-start justify-center">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="tracking-normal mt-2 text-xl">Your Ticket</CardTitle>
                            <CardDescription className="text-xs">
                                Please provide your email address and a ticket number.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* Search and filters */}
                            <div className="flex flex-col md:flex-row gap-4 mb-5 justify-between">
                                <div className="flex w-full md:w-80 relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search by Ticket Number"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-8"
                                    />
                                </div>

                                <div className="flex gap-4">
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
                                                        <CardTitle className="tracking-normal font-semibold text-sm">{item.ticketNumber}</CardTitle>
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
                                                    <p className="text-sm font-medium">You</p>
                                                </div>
                                                <Button className="bg-[#0449D0] text-xs" size="sm" onClick={() => handleDetail(item.ticketNumber)}>
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
                                        <ChevronLeft size={16}/>
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
                                        <ChevronRight size={16}/>
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
            <Footer />
        </div>
    );
}
