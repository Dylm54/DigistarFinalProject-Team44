import { CircleUser, Menu, Package2, Search, CircleCheckBig } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import BigBoxLogo from '../assets/BigBoxLogo.svg'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { useState } from "react"
import Footer from "../components/Footer"

export function UserCreateTicket() {
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // State for confirmation modal
    const [isSuccessOpen, setIsSuccessOpen] = useState(false); // State for success modal
    const [loading, setLoading] = useState(false); // Loading state for the delay
    const [ticketID, setTicketID] = useState("");
    const [formData, setFormData] = useState({
        ticketType: "",
        product: "",
        summary: "",
        description: "",
    });
    const [errors, setErrors] = useState({
        ticketType: false,
        product: false,
        summary: false,
        description: false,
    });

    const generateTicketID = () => {
        return "Ticket#" + Math.random().toString(36).substring(2, 10).toUpperCase();
    };

    // Function to copy ticket ID to clipboard
    const handleCopy = () => {
        navigator.clipboard.writeText(ticketID);
        alert("Ticket ID copied to clipboard!");
    };

    const handleCreateTicket = () => {
        const newErrors = {
            ticketType: formData.ticketType === "",
            product: formData.product === "",
            summary: formData.summary === "",
            description: formData.description === "",
        };
        setErrors(newErrors);

        // If any field has an error, prevent submission
        if (Object.values(newErrors).some((error) => error)) {
            return;
        } else {
            setIsConfirmationOpen(true)
        }
    }

    const handleConfirmClick = () => {
        setLoading(true); // Start loading

        setTimeout(() => {
            const newTicketID = generateTicketID(); // Generate a new ticket ID
            setTicketID(newTicketID); // Set the new ticket ID
            setIsSuccessOpen(true); // Open success modal after 2 seconds
            setIsConfirmationOpen(false); // Close confirmation modal
            setLoading(false); // Stop loading
        }, 2000); // 2-second delay
    };

    const handleInputChange = (id, value) => {
        setFormData((prev) => ({ ...prev, [id]: value }));
    };


    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
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
                                href="#"
                                className="text-[#0449D0] font-semibold transition-colors hover:text-[#0449D0]"
                            >
                                CreateTicket
                            </a>
                            <a
                                href="/user/ticket-information"
                                className="text-muted-foreground transition-colors hover:text-[#0449D0]"
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
                        href="#"
                        className="text-[#0449D0] font-semibold transition-colors hover:text-[#0449D0]"
                    >
                        Create Ticket
                    </a>
                    <a
                        href="/user/ticket-information"
                        className="text-muted-foreground transition-colors hover:text-[#0449D0]"
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
                <div className="mx-auto flex w-full max-w-6xl items-start justify-center">
                    <Card x-chunk="dashboard-04-chunk-1" className="lg:min-w-[800px]">
                        <CardHeader className="mb-5">
                            <CardTitle className="tracking-normal mt-2 text-xl">Create a New Ticket</CardTitle>
                            <CardDescription className="text-xs">
                                Please fill in the form below to open a new ticket.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="flex flex-row gap-4">
                                    <div className="grid gap-6 w-full">
                                        <div className="grid gap-3">
                                            <Label htmlFor="ticketType" className="font-normal">Ticket Type</Label>
                                            <Select
                                                id="ticketType"
                                                value={formData.ticketType} // Bind the value to formData
                                                onValueChange={(value) => handleInputChange("ticketType", value)}
                                                className={errors.ticketType ? "border-red-500" : ""}
                                            >
                                                <SelectTrigger aria-label="Select status">
                                                    <SelectValue placeholder="Choose Ticket Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Technical Support">Technical Support</SelectItem>
                                                    <SelectItem value="Account Management">Account Management</SelectItem>
                                                    <SelectItem value="Data Integration Issues">Data Integration Issues</SelectItem>
                                                    <SelectItem value="Performance & Scalability Issues">Performance & Scalability Issues</SelectItem>
                                                    <SelectItem value="Analytics & Insights Assistance">Analytics & Insights Assistance</SelectItem>
                                                    <SelectItem value="Training & Documentation Request">Training & Documentation Request</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.ticketType && <p className="text-red-500 text-sm">Ticket Type is required</p>}
                                        </div>
                                    </div>
                                    <div className="grid gap-6 w-full">
                                        <div className="grid gap-3">
                                            <Label htmlFor="product" className="font-normal">Product BigBox</Label>
                                            <Select
                                                id="product"
                                                value={formData.product} // Bind the value to formData
                                                onValueChange={(value) => handleInputChange("product", value)}
                                                className={errors.product ? "border-red-500" : ""}
                                            >
                                                <SelectTrigger aria-label="Select product">
                                                    <SelectValue placeholder="Choose Product" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="BigSocial">BigSocial</SelectItem>
                                                    <SelectItem value="BigLegal">BigLegal</SelectItem>
                                                    <SelectItem value="BigBuilder">BigBuilder</SelectItem>
                                                    <SelectItem value="BigVision">BigVision</SelectItem>
                                                    <SelectItem value="BigAssistant">BigAssistant</SelectItem>
                                                    <SelectItem value="BigOne">BigOne</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.product && <p className="text-red-500 text-sm">Product is required</p>}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="summary" className="font-normal">Issue Summary</Label>
                                    <Input
                                        id="summary"
                                        type="text"
                                        className={`w-full ${errors.summary ? 'border-red-500' : ''}`}
                                        placeholder="Enter your issue summary"
                                        value={formData.summary}
                                        onChange={(e) => handleInputChange(e.target.id, e.target.value)}
                                        required
                                    />
                                    {errors.summary && <p className="text-red-500 text-sm">Summary is required</p>}
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="description" className="font-normal">Issue Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Describe your issue"
                                        className={`min-h-32 ${errors.description ? 'border-red-500' : ''}`}
                                        value={formData.description}
                                        onChange={(e) => handleInputChange(e.target.id, e.target.value)}
                                        required
                                    />
                                    {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="picture" className="font-normal">Insert File (Optional)</Label>
                                    <Input id="picture" type="file" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex border-t px-6 py-4 justify-between">
                            <Button variant="ghost" className="text-[#F64946] hover:text-[#F64946]">Cancel</Button>
                            <Button onClick={handleCreateTicket} className="bg-[#0449D0] hover:bg-[#0449D0]/80">
                                Create Ticket
                            </Button>

                            {/* Confirmation Modal */}
                            <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
                                <DialogTrigger asChild>
                                    <Button className="hidden">Open Confirmation</Button>
                                </DialogTrigger>
                                <DialogContent className="flex flex-col justify-center items-center">
                                    <DialogTitle className="tracking-normal text-2xl text-center">Are you sure you want to create a new ticket?</DialogTitle>
                                    <DialogDescription className="text-center">
                                        Please review all the details before proceeding. Once created, you will be able to track its progress and updates.
                                    </DialogDescription>
                                    <div className="flex w-full space-x-2">
                                        {/* Cancel button */}
                                        <DialogClose asChild className="w-full">
                                            <Button variant="outline">Cancel</Button>
                                        </DialogClose>
                                        {/* Confirm button */}
                                        <Button onClick={handleConfirmClick} disabled={loading} className="bg-[#0449D0] w-full hover:bg-[#0449D0]/80">
                                            {loading ? "Processing..." : "Confirm"}
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            {/* Success Modal */}
                            {isSuccessOpen && (
                                <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="hidden">Open Success Modal</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <div className="flex w-full justify-center">
                                            <Button disabled size="sm" className="disabled:bg-[#F0F5FF] w-16 h-16 disabled:opacity-100">
                                                <CircleCheckBig color="#0449D0" />
                                            </Button>
                                        </div>
                                        <DialogTitle className="tracking-normal text-2xl text-center">Ticket Created!</DialogTitle>
                                        <DialogDescription>
                                            <p className="mb-3 text-center">Your ticket has been created successfully. Our Support team will review it and get back to you shortly.</p>
                                        </DialogDescription>
                                        <div className="flex w-full space-x-2">
                                            <DialogClose asChild className="w-full">
                                                <Button variant="outline">Back to Home</Button>
                                            </DialogClose>
                                            <Button className="w-full bg-[#0449D0] hover:bg-[#0449D0]/80" onClick={() => window.location.href = "/user/ticket-information"}>See Ticket</Button>
                                        </div>

                                    </DialogContent>
                                </Dialog>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    )
}
