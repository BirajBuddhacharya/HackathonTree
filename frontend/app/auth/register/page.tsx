'use client';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/AppComponents/NavBar";
import Footer from '@/components/AppComponents/footer'
import { useAuth } from "@/components/AuthContext";

export default function Register() {
    const { register } = useAuth();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;    
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const phone = formData.get("phone") as string;

        try {
            const response = await register({
                name,
                email,
                password,
                phone
            });
            console.log(response);
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col">
            <NavBar />
            <div className="flex flex-1 justify-center items-center py-12 bg-gray-50">
                <Card className="w-[30rem] shadow-lg">
                    <CardHeader>
                        <h2 className="text-2xl text-center font-bold">Register</h2>
                    </CardHeader>
                    <CardContent>
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" onSubmit={handleRegister}>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="name" className="text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    defaultValue="Jiban Pandey"
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    defaultValue="pandeyjiban2060@gmail.com"
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="password" className="text-sm font-medium">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    defaultValue="strongPassword123"
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    defaultValue="9812345678"
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <Button type="submit" className="w-full mt-2">Register</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </div>
    )
}