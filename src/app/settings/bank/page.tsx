"use client"
import Nav from "@/components/SettingsNav";
import SideNavbar from "@/components/SideNavbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "../../../../bridge";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

export default function BankAccount() {
    const [linkSession, setLinkSession] = useState('')
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            const res = await getSession()
            setLinkSession(res.redirect_url)
        }
        fetchData()
    },[])
    const handleClick = () => {
        router.push(linkSession)
    }
    return (
        <div className="min-h-screen flex">
    <SideNavbar />
    <div className="p-8 w-full">
    <div className="flex min-h-screen w-full bg-muted/40">
        <Nav/>
        <div className="flex-1 p-6 md:p-10">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8 border-b pb-4">
                    <h1 className="text-2xl font-bold">Banks</h1>
                    <p className="text-muted-foreground">Manage your different bank accounts.</p>
                </div>
            </div>
            <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Connected Bank</CardTitle>
                    <CardDescription>View and manage your connected bank account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold">Chase Bank</h3>
                            <p className="text-muted-foreground">Account ending in 1234</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline">Disconnect</Button>
                            <Button onClick={handleClick}>Change Bank</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        </div>
    </div></div></div>
)};