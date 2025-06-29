import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/AppComponents/NavBar";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Footer from '@/components/AppComponents/footer'

export default function Login() {
    return (
        <div className="w-full">
            <NavBar />
            <div className="flex justify-center py-18">
                <Card className="sm:w-98 gap-2">
                    <CardHeader>
                        <h2 className="text-2xl text-center font-bold">Login</h2>
                    </CardHeader>
                    <CardContent className="">
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                                <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                                <input type="password" id="password" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                            </div>
                            <Button type="submit" className="w-full">Login</Button>
                        </form>
                        <div className="flex items-center gap-4 mt-4 mb-2">
                            <div className="h-[1px] flex-1 bg-gray-200"></div>
                            <div className="text-sm text-gray-500 whitespace-nowrap">Or login with</div>
                            <div className="h-[1px] flex-1 bg-gray-200"></div>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="outline" className="flex-1 mb-2">
                                <FaGoogle className="mr-1 h-5 w-5" />
                                <span className="text-sm">Google</span>
                            </Button>
                            <Button variant="outline" className="flex-1" disabled>
                                <FaGithub className="mr-1 h-5 w-5" />
                                <span className="text-sm">GitHub</span>
                            </Button>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <p className="text-sm text-gray-500 text-center">Don&apos;t have an account? <a href="/auth/register" className="text-blue-500">Register</a></p>
                    </CardFooter>
                </Card>
            </div>
            <Footer />
        </div>
    )
}