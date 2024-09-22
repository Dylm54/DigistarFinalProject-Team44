import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BigBoxImage from "../assets/BigBoxLoginImage3.png";
import BigBoxLogo from "../assets/BigBoxLogo.svg";

export const description =
    "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.";

export function LoginPage() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [emptyFields, setEmptyFields] = useState(false);

    const handleLogin = () => {
        // Check if either field is empty
        if (!userId || !password) {
            setEmptyFields(true);
            setError(false); // Reset general error
            return;
        }

        // Reset empty fields error
        setEmptyFields(false);

        // Check for correct credentials
        if (userId === "user123" && password === "user123") {
            window.location.href = "/user"; // Redirect to user page
        } else if (userId === "admin123" && password === "admin123") {
            window.location.href = "/"; // Redirect to admin page
        } else {
            setError(true); // Show error message if credentials are wrong
        }
    };

    return (
        <div className="w-full lg:grid h-screen lg:grid-cols-2 ">
            <div className="hidden lg:block w-full h-screen relative z-[0.1] overflow-hidden">
                <img src={BigBoxImage} alt="Image" className="w-full h-full object-contain absolute top-0 left-0" />
            </div>
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-4 text-left">
                        <img src={BigBoxLogo} />
                        <h1 className="text-4xl font-semibold">Welcome back 👋</h1>
                        <p className="text-muted-foreground text-sm">
                            Please enter your credentials to access the Helpdesk system and resolve your inquiries efficiently.
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="userId">User Id</Label>
                            <Input
                                id="userId"
                                type="text"
                                placeholder="Enter your user id"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                className={(emptyFields && !userId) || error ? "border-red-500" : ""}
                                required
                            />
                            {emptyFields && (
                                <p className="text-red-500 text-sm">
                                    Please fill out all fields.
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={(emptyFields && !password) || error ? "border-red-500" : ""}
                                required
                            />
                            {emptyFields && (
                                <p className="text-red-500 text-sm">
                                    Please fill out all fields.
                                </p>
                            )}
                            <a href="/forgot-password" className="ml-auto inline-block text-sm text-[#0449D0]">
                                Forgot your password?
                            </a>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm">
                                Invalid user ID or password. Please try again.
                            </p>
                        )}
                        <Button type="submit" className="w-full bg-[#0449D0]" onClick={handleLogin}>
                            Sign In
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
