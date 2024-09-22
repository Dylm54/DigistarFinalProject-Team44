import {
    Bell,
    CircleUser,
    Menu,
    Users,
    MessageSquareWarning,
    LogOut,
    Ticket,
    File,
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
import { Label } from "@/components/ui/label"
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
import { useParams } from "react-router-dom"
import { data } from "../allTicketsDummyData"
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
import BigBoxPP from '../assets/BigBoxAdminPP.png'
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


export function AdminTicketDetail() {
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // State for confirmation modal
    const [isSuccessOpen, setIsSuccessOpen] = useState(false); // State for success modal
    const [loading, setLoading] = useState(false); // Loading state for the delay
    const { number } = useParams()
    const ticketNumberData = data.find(ticket => ticket.ticketNumber === number);

    const handleCreateTicket = () => {
        setIsConfirmationOpen(true)
    }

    const handleConfirmClick = () => {
        setLoading(true); // Start loading

        setTimeout(() => {
            setIsSuccessOpen(true); // Open success modal after 2 seconds
            setIsConfirmationOpen(false); // Close confirmation modal
            setLoading(false); // Stop loading
        }, 2000); // 2-second delay
    };

    const ticketStatus = () => {
        if (ticketNumberData.status === "Ongoing") {
            return <Badge variant="yellow">Ongoing</Badge>;
        } if (ticketNumberData.status === "Complete") {
            return <Badge variant="green">Complete</Badge>;
        } if (ticketNumberData.status === "Waiting") {
            return <Badge variant="red">Waiting</Badge>;
        }
    };

    const ticketPriority = () => {
        if (ticketNumberData.priority === "no-priority") {
            return <div className="h-5 w-5 bg-[#6032BC] rounded-full"></div>
        } if (ticketNumberData.priority === "high") {
            return <div className="h-5 w-5 bg-[#F64946] rounded-full"></div>
        } if (ticketNumberData.priority === "medium") {
            return <div className="h-5 w-5 bg-[#FAB000] rounded-full"></div>
        } if (ticketNumberData.priority === "low") {
            return <div className="h-5 w-5 bg-[#00A18B] rounded-full"></div>
        }
    };

    const replyComponent = (item) => {
        if (item.author === "admin") {
            return (
                <div>
                    <Card className="w-full mt-9">
                        <CardHeader>
                            <div className="flex w-full flex-col md:flex-row justify-between items-start gap-2 md:items-center">
                                <div className="flex items-center gap-2">
                                    <img src={BigBoxPP} alt="bigboxpp" />
                                    <p className="text-sm">BigBox Team</p>
                                </div>
                                <CardDescription>Posted on {item.date}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{item.content}</CardDescription>
                            {item.file.name &&
                                <Card className="mt-4">
                                    <CardHeader className="p-4">
                                        <div className="flex w-full flex-row justify-between items-center">
                                            <div className="flex gap-4 flex-row items-center">
                                                <Button disabled size="sm" className="disabled:bg-[#F0F5FF] disabled:opacity-100">
                                                    <File color="#0449D0" />
                                                </Button>
                                                <div className="flex flex-col gap-1">
                                                    <div className="text-sm font-semibold tracking-normal">{item.file.name}</div>
                                                    <CardDescription className="text-xs">{item.file.size}</CardDescription>
                                                </div>
                                            </div>
                                            <div className="text-sm text-[#0449D0] font-semibold">Show File</div>
                                        </div>
                                    </CardHeader>
                                </Card>
                            }
                        </CardContent>
                    </Card>
                </div>
            )
        } else {
            return (
                <div>
                    <Card className="w-full mt-9">
                        <CardHeader>
                            <div className="flex w-full flex-col md:flex-row justify-between items-start gap-2 md:items-center">
                                <div className="flex items-center gap-2">
                                    <img src={BigBoxPP} alt="bigboxpp" />
                                    <p className="text-sm">{item.author}</p>
                                </div>
                                <CardDescription>Posted on {item.date}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{item.content}</CardDescription>
                            {item.file.name &&
                                <Card className="mt-4">
                                    <CardHeader className="p-4">
                                        <div className="flex w-full flex-row justify-between items-center">
                                            <div className="flex gap-4 flex-row items-center">
                                                <Button disabled size="sm" className="disabled:bg-[#F0F5FF] disabled:opacity-100">
                                                    <File color="#0449D0" />
                                                </Button>
                                                <div className="flex flex-col gap-1">
                                                    <div className="text-sm font-semibold tracking-normal">{item.file.name}</div>
                                                    <CardDescription className="text-xs">{item.file.size}</CardDescription>
                                                </div>
                                            </div>
                                            <div className="text-sm text-[#0449D0] font-semibold">Show File</div>
                                        </div>
                                    </CardHeader>
                                </Card>
                            }
                        </CardContent>
                    </Card>
                </div>
            )
        }
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
                                    href="/tickets"
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
                <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 w-full flex-col gap-4 bg-[#F0F5FF] md:gap-8 md:p-8 !pt-20 lg:pl-[271px] p-5 ">
                    <div className="mx-auto flex w-full max-w-6xl items-start justify-center flex-col gap-6">
                        <div className="flex w-full justify-between">
                            <div className="flex items-center gap-3">
                                {ticketPriority()}
                                <h1 className="text-2xl font-semibold">{number}</h1>
                                {ticketStatus()}
                            </div>
                            {ticketNumberData.status !== "Complete" &&
                                <div>
                                    <Button className="w-full bg-[#0449D0] font-normal" onClick={handleCreateTicket}>
                                        Complete Ticket
                                    </Button>
                                    <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
                                        <DialogTrigger asChild>
                                            <Button className="hidden">Open Confirmation</Button>
                                        </DialogTrigger>
                                        <DialogContent className="flex flex-col justify-center items-center">
                                            <DialogTitle className="tracking-normal text-xl text-center">Are you sure you want to mark this ticket as resolved?</DialogTitle>
                                            <DialogDescription className="text-center">
                                                Please ensure that all necessary actions have been taken and the issue is fully resolved.
                                            </DialogDescription>
                                            <div className="flex space-x-2 w-full">
                                                {/* Cancel button */}
                                                <DialogClose asChild>
                                                    <Button variant="outline" className="w-full">Cancel</Button>
                                                </DialogClose>
                                                {/* Confirm button */}
                                                <Button onClick={handleConfirmClick} disabled={loading} className="bg-[#0449D0] w-full hover:bg-[#0449D0]/80">
                                                    {loading ? "Processing..." : "Complete"}
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
                                                <DialogTitle className="tracking-normal text-xl text-center">Ticket has been successfully resolved!</DialogTitle>
                                                <DialogDescription>
                                                    <p className="mb-3 text-center">The issue is now closed.</p>
                                                </DialogDescription>
                                                <DialogClose asChild>
                                                    <Button variant="outline" onClick={() => window.location.href = "/tickets"}>Close</Button>
                                                </DialogClose>
                                            </DialogContent>
                                        </Dialog>
                                    )}
                                </div>
                            }

                        </div>
                        <Card className="w-full">
                            <CardHeader>
                                <div className="flex w-full flex-row justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <img src={BigBoxPP} className="rounded-full w-[32px] h-[32px] object-cover" alt="" />
                                        <p className="text-sm font-medium">user123</p>
                                    </div>
                                    <CardDescription>Created on {ticketNumberData.date}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="w-full flex flex-col gap-4">
                                    <Separator />
                                    <div className="flex gap-2">
                                        <Badge variant="blue">{ticketNumberData.product}</Badge>
                                        <Badge variant="grey">{ticketNumberData.ticketType}</Badge>
                                    </div>
                                    <h2 className="font-semibold text-md">{ticketNumberData.issue}</h2>
                                    <CardDescription>
                                        {ticketNumberData.issueDetail}
                                    </CardDescription>
                                    {ticketNumberData.file.name &&
                                        <Card>
                                            <CardHeader className="p-4">
                                                <div className="flex w-full flex-row justify-between items-center">
                                                    <div className="flex gap-4 flex-row items-center">
                                                        <Button disabled size="sm" className="disabled:bg-[#F0F5FF] disabled:opacity-100">
                                                            <File color="#0449D0" />
                                                        </Button>
                                                        <div className="flex flex-col gap-1">
                                                            <div className="text-sm font-semibold tracking-normal">{ticketNumberData.file.name}</div>
                                                            <CardDescription className="text-xs">{ticketNumberData.file.size}</CardDescription>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm text-[#0449D0] font-semibold">Show File</div>
                                                </div>
                                            </CardHeader>
                                        </Card>
                                    }
                                    <Card className="w-full">
                                        <CardContent>
                                            <div>
                                                {ticketNumberData.reply[0].author &&
                                                    ticketNumberData.reply.map((item) => {
                                                        return (
                                                            <div>
                                                                {replyComponent(item)}
                                                                <Separator className="mt-6" />
                                                            </div>)
                                                    })
                                                }
                                                {ticketNumberData.status !== "Complete" &&
                                                    <>

                                                        <h1 className="text-xl font-semibold mb-5 mt-6">Post a Reply</h1>

                                                        <div className="my-5 flex flex-col gap-3">
                                                            <Label htmlFor="priority" className="font-normal">Priority</Label>
                                                            <RadioGroup id="priority" defaultValue={ticketNumberData.priority} className="flex ">
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="no-priority" id="r1" />
                                                                    <Label htmlFor="r1" className="font-normal">No Priority</Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="low" id="r2" />
                                                                    <Label htmlFor="r2" className="font-normal">Low</Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="medium" id="r3" />
                                                                    <Label htmlFor="r3" className="font-normal">Medium</Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="high" id="r4" />
                                                                    <Label htmlFor="r3" className="font-normal">High</Label>
                                                                </div>
                                                            </RadioGroup>
                                                        </div>

                                                        <div className="grid gap-3">
                                                            <Label htmlFor="description" className="font-normal">Reply Description</Label>
                                                            <Textarea
                                                                id="description"
                                                                placeholder="Describe your issue"
                                                                // className={`min-h-32 ${errors.description ? 'border-red-500' : ''}`}
                                                                // value={formData.description}
                                                                // onChange={(e) => handleInputChange(e.target.id, e.target.value)}
                                                                required
                                                            />
                                                            {/* {errors.description && <p className="text-red-500 text-sm">Description is required</p>} */}
                                                        </div>
                                                        <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                                                            <Label htmlFor="picture" className="font-normal">Insert File (Optional)</Label>
                                                            <Input id="picture" type="file" />
                                                        </div>
                                                        <div className="flex justify-end w-full mt-4">
                                                            <Button className="bg-[#0449D0]">Submit</Button>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}