import { CircleUser, Menu, Package2, Search, File, } from "lucide-react"
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
import { useParams } from "react-router-dom"
import { data } from "../allTicketsDummyData"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import BigBoxPP from '../assets/BigBoxAdminPP.png'
import Footer from "../components/Footer"

export function UserTicketDetail() {
    const { number } = useParams()

    const ticketNumberData = data.find(ticket => ticket.ticketNumber === number);

    let ticketStatus;

    if (ticketNumberData.status === "Ongoing") {
        ticketStatus = <Badge variant="yellow">Ongoing</Badge>
    } if (ticketNumberData.status === "Complete") {
        ticketStatus = <Badge variant="green">Complete</Badge>
    } if (ticketNumberData.status === "Waiting") {
        ticketStatus = <Badge variant="red">Waiting</Badge>
    }

    const replyComponent = (item, i) => {
        if (item.author === "admin") {
            return (
                <div key={i}>
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
                <div key={i}>
                    <Card className="w-full mt-9">
                        <CardHeader>
                            <div className="flex w-full flex-col md:flex-row justify-between items-start gap-2 md:items-center">
                                <div className="flex items-center gap-2">
                                    <img src={BigBoxPP} alt="bigboxpp" />
                                    <p className="text-sm">You</p>
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
                                href="/user/create-ticket"
                                className="text-muted-foreground transition-colors hover:text-[#0449D0]"
                            >
                                CreateTicket
                            </a>
                            <a
                                href="/user/ticket-information"
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
                        href="/user/ticket-information"
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
                <div className="mx-auto flex w-full max-w-6xl  items-start justify-center">
                    <Card x-chunk="dashboard-04-chunk-1" className="lg:max-w-[800px] lg:p-6 w-full">
                        <CardHeader className="">
                            <div className="flex flex-col gap-4 lg:flex-row w-full justify-between items-center">
                                <div className="flex flex-col gap-3">
                                    <div className="flex gap-4 items-center flex-row">
                                        <CardTitle className="tracking-normal text-2xl">{number}</CardTitle>
                                        {ticketStatus}
                                    </div>
                                    <div>
                                        <Badge variant="blue">{ticketNumberData.product}</Badge>
                                    </div>
                                    
                                </div>
                                <CardDescription className="w-full md:text-right text-left">
                                    Created on {ticketNumberData.date}
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Separator />
                            <h2 className="mt-6 mb-4 font-semibold text-md">{ticketNumberData.issue}</h2>
                            <CardDescription>
                                {ticketNumberData.issueDetail}
                            </CardDescription>
                            {ticketNumberData.status !== "Waiting" &&
                                (<div>
                                    {ticketNumberData.reply.map((item, i) => {
                                        return replyComponent(item, i)
                                    })}
                                    {ticketNumberData.status !== "Complete" &&
                                        <>
                                            <Separator className="my-6" />
                                            <h1 className="text-xl font-semibold mb-4">Post a Reply</h1>
                                            <Textarea placeholder="Describe your issue" />
                                            <div className="flex justify-end w-full mt-4">
                                                <Button className="bg-[#0449D0]">Post Reply</Button>
                                            </div>
                                        </>
                                    }
                                </div>)
                            }
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    )
}


