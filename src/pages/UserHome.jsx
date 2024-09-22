import { useState } from 'react';
import { CircleUser, Menu, Package2, Search, FilePlus, Ticket } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import BigBoxLogo from '../assets/BigBoxLogo.svg'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Footer from '../components/Footer';

const faqData = [
    {
        question: "Is it accessible?",
        answer: "Yes. It adheres to the WAI-ARIA design pattern."
    },
    {
        question: "Is it styled?",
        answer: "Yes. It comes with default styles that matches the other components&apos; aesthetic."
    },
    {
        question: "Is it animated?",
        answer: "Yes. It&apos;s animated by default, but you can disable it if you prefer."
    },
    {
        question: "Is it responsive?",
        answer: "Yes. It adjusts beautifully to different screen sizes."
    },
];

export function UserHome() {
    // State for search query
    const [searchQuery, setSearchQuery] = useState('');

    // Filtered FAQ based on search query
    const filteredFaqData = faqData.filter((item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
                {/* Navigation and Logo */}
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <img src={BigBoxLogo} className="w-40 h-40" alt="Logo" />
                </nav>
                {/* Mobile Navigation */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <img src={BigBoxLogo} width="100" height="100" alt="Logo" className="mb-4" />
                            <a href="/user" className="text-[#0449D0] font-semibold transition-colors hover:text-[#0449D0]">Home</a>
                            <a href="/user/create-ticket" className="text-muted-foreground transition-colors hover:text-[#0449D0]">Create Ticket</a>
                            <a href="/user/ticket-information" className="text-muted-foreground transition-colors hover:text-[#0449D0]">Ticket Information</a>
                        </nav>
                    </SheetContent>
                </Sheet>
                {/* Centered Links */}
                <div className="w-full md:flex text-lg md:text-sm justify-center gap-6 hidden">
                    <a href="/user" className="text-[#0449D0] font-semibold transition-colors hover:text-[#0449D0]">Home</a>
                    <a href="/user/create-ticket" className="text-muted-foreground transition-colors hover:text-[#0449D0]">Create Ticket</a>
                    <a href="/user/ticket-information" className="text-muted-foreground transition-colors hover:text-[#0449D0]">Ticket Information</a>
                </div>
                {/* User Menu */}
                <div className="flex md:w-auto w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <div className="ml-auto flex-1 sm:flex-initial"></div>
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
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 md:gap-8 md:p-10 p-5 ">
                <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-center gap-10">
                    {/* Search Input */}
                    <Card className="bg-[url('/src/assets/BigBoxHomeImg2.png')] flex-col w-full bg-cover bg-no-repeat items-center justify-center flex p-4">
                        <CardHeader>
                            <CardTitle className="text-white tracking-normal text-center text-3xl">
                                How can we assist you today?
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="w-full max-w-2xl">
                            <div className="relative w-full">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search for help..."
                                    value={searchQuery} // Bind the search query to the input
                                    onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
                                    className="w-full appearance-none bg-background pl-8 shadow-none"
                                />
                            </div>
                        </CardContent>
                    </Card>
                    {/* FAQ Accordion */}
                    <div className="w-full flex items-center flex-col">
                        <div className='flex max-w-3xl items-center flex-col-reverse gap-12'>
                            <div className="w-full flex flex-col gap-6 justify-center items-center">
                                <h1 className="text-2xl font-medium">Frequently Asked Questions</h1>
                                <Accordion type="single" collapsible className="w-full gap-3 flex flex-col">
                                    {filteredFaqData.length > 0 ? (
                                        filteredFaqData.map((item, i) => (
                                            <AccordionItem value={item.question} key={i} className="border px-3 rounded-lg">
                                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                                <AccordionContent>{item.answer}</AccordionContent>
                                            </AccordionItem>
                                        ))
                                    ) : (
                                        <p>No FAQs found for your query.</p>
                                    )}
                                </Accordion>
                            </div>
                            <div className="flex flex-col gap-6 justify-center items-center">
                                {/* Services Section */}
                                <h1 className="text-2xl font-medium">Services</h1>
                                <div className='flex flex-row gap-6'>
                                    <Card className="cursor-pointer hover:bg-[#F1F5F9]" onClick={() => { window.location.href = '/user/create-ticket' }}>
                                        <CardHeader className="p-4 flex gap-4 flex-col items-start">
                                            <Button disabled size="sm" className="disabled:bg-[#F0F5FF] disabled:opacity-100">
                                                <FilePlus color="#0449D0" />
                                            </Button>
                                            <div>
                                                <div className="text-sm font-semibold tracking-normal">Create a New Ticket</div>
                                                <CardDescription className="text-xs">Start a new request and let us know how we can assist you.</CardDescription>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                    <Card className="cursor-pointer hover:bg-[#F1F5F9]" onClick={() => { window.location.href = '/user/ticket-information' }}>
                                        <CardHeader className="p-4 flex gap-4 flex-col items-start">
                                            <Button disabled size="sm" className="disabled:bg-[#F0F5FF] disabled:opacity-100">
                                                <Ticket color="#0449D0" />
                                            </Button>
                                            <div>
                                                <CardTitle className="text-sm font-semibold tracking-normal">Check Your Ticket</CardTitle>
                                                <CardDescription className="text-xs">Track the status and updates of your current requests anytime.</CardDescription>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
