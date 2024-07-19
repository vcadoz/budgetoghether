"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import Nav from "@/components/SettingsNav"
import { getCurrentUser, getUserData, updateUserProfile } from "../../../firestore"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import SideNavbar from "@/components/SideNavbar"


export default function Component() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getCurrentUser();
        const userData = await getUserData();
        userData.uid = userId.uid
        setUser(userData)
        setEmail(userData.email)
        setName(userData.name)
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'utilisateur:', error);
      } finally{
        setLoading(false)
      }
    };
    fetchData();
  }, []);
  function setUserName(name : string) {
    setName(name);
    user.name = name
  }
  async function updateProfile(){
    await updateUserProfile(user)
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
            <h1 className="text-2xl font-bold">Account</h1>
            <p className="text-muted-foreground">Manage your account, notifications, privacy, and appearance.</p>
          </div>
          
          <div className="grid gap-8">
            {loading ? (<div>
              <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Update your personal information and account settings.</CardDescription>
              </CardHeader>
              
              <CardContent className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={updateProfile}>Save Changes</Button>
              </CardFooter>
            </Card>
              
        </div>) : (user && (
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Update your personal information and account settings.</CardDescription>
              </CardHeader>
              
              <CardContent className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={name} onChange={(e) => setUserName(e.target.value)}/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={updateProfile}>Save Changes</Button>
              </CardFooter>
            </Card>
            ))}
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage your notification preferences.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive email notifications for important updates.</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Desktop Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive desktop notifications for real-time updates.
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Privacy</CardTitle>
                <CardDescription>Manage your privacy settings and data.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Public Profile</p>
                    <p className="text-sm text-muted-foreground">Allow others to view your public profile.</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Data Sharing</p>
                    <p className="text-sm text-muted-foreground">Share your data with third-party services.</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of the application.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">Switch to a dark color scheme.</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Font Size</p>
                    <p className="text-sm text-muted-foreground">Adjust the font size for better readability.</p>
                  </div>
                  <Slider defaultValue={[16]} min={12} max={20} step={2} aria-label="Font Size" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div></div></div>
  )
}