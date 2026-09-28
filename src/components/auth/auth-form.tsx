"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1500)
  }

  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-2xl bg-[#1e1e1e]/90">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-[#1a1a1a] rounded-t-lg p-1">
          <TabsTrigger value="login" className="data-[state=active]:bg-[#8b5cf6] data-[state=active]:text-white text-[#a0a0a0]">Login</TabsTrigger>
          <TabsTrigger value="register" className="data-[state=active]:bg-[#8b5cf6] data-[state=active]:text-white text-[#a0a0a0]">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <form onSubmit={onSubmit}>
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-[#f5f0e8]">Welcome Back</CardTitle>
              <CardDescription>Enter your credentials to access your styling profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#f5f0e8]">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[#f5f0e8]">Password</Label>
                  <a href="#" className="text-xs text-[#8b5cf6] hover:underline">Forgot password?</a>
                </div>
                <Input id="password" type="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full text-md font-medium" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Sign In
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
        
        <TabsContent value="register">
          <form onSubmit={onSubmit}>
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-[#f5f0e8]">Join VESTRA</CardTitle>
              <CardDescription>Create an account for personalized AI styling.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-[#f5f0e8]">First name</Label>
                  <Input id="first-name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-[#f5f0e8]">Last name</Label>
                  <Input id="last-name" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email" className="text-[#f5f0e8]">Email</Label>
                <Input id="reg-email" type="email" placeholder="name@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password" className="text-[#f5f0e8]">Password</Label>
                <Input id="reg-password" type="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full text-md font-medium" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Create Account
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
