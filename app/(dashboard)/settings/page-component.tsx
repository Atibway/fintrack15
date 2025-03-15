"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, User,LogOut, User2Icon } from 'lucide-react';
import { LogoutButton } from '@/components/auth/logout-button';
import { ModeToggle } from '@/components/modeToggler';
import { settings } from "@/actions/settings"

import { useSession } from "next-auth/react"
import {  useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {  SettingsSchema } from "@/schemas"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { useCurrentUser } from "@/hooks/use-current-user"


import { Switch } from "@/components/ui/switch"
import {  useRouter } from "next/navigation"
import { Button } from '@/components/ui/button';

import { EditingLoading } from './loadings';

interface SettingsProps{
user: { 
    name: string | null | undefined;
    birth: string | null | undefined;
    number: string | null | undefined;
}
}
const SettingsComponent = ({
    user
}: SettingsProps) => {
      const {update}= useSession()
      const [isPending] = useTransition()
      const [error, setError] = useState<string | undefined>()
      const [success, setSuccess] = useState<string | undefined>()
      const [loading, setLoading] = useState(false)
      const router = useRouter()

    
    
      const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues:{
          name: user?.name || undefined,
          number: user?.number || undefined,
          birth: user?.birth || undefined
        }
          })
    const onSubmit = (values: z.infer<typeof SettingsSchema>)=> {
    
    setLoading(true)
      settings(values)
      .then((data)=> {
        if(data.error){
          setError(data.error)
          setLoading(false)
        }
    
        if(data.success){
          update()
          setSuccess(data.success)
          router.refresh()
            setLoading(false)
        }
      })
      .catch(()=> setError("Something went wrong"))
    }
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const loggedInUser = useCurrentUser()

  return (
    <div className=''>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account preferences and settings.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="glass rounded-xl overflow-hidden animate-scale">
            <div className="p-5 border-b border-border">
              <h2 className="font-semibold">Profile</h2>
            </div>
            
            <div className="p-5 flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4 border-4 border-primary/10">
                <AvatarImage src={loggedInUser?.image || ""} alt="User" />
                <AvatarFallback>
                  <User2Icon className='size-icon'/>
                </AvatarFallback>
              </Avatar>
              
              <h3 className="font-semibold text-lg">{loggedInUser?.name}</h3>
              <p className="text-sm text-muted-foreground">{loggedInUser?.email}</p>
              
              <div className="w-full mt-6 space-y-4">
                <Button variant="outline" className="w-full">Edit Profile</Button>
                 <LogoutButton>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2 text-danger-600 hover:text-danger-600">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
                 </LogoutButton>
              </div>
            </div>
          </div>
        </div>
      

        <div className="md:col-span-2">
          {loading ? (
            <EditingLoading />
        ): (
          
          <div className="glass rounded-xl overflow-hidden mb-6 animate-slide-up">
            <div className="p-5 border-b border-border flex items-center space-x-3">
              <User className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Account Information</h2>
            </div>
            <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input 
                            disabled={isPending}
                            placeholder="john Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
                
                <div>
                <FormField
                      control={form.control}
                      name="number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                            disabled={isPending}
                            placeholder="...+25676234567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
                <div>
                <FormField
                      control={form.control}
                      name="birth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input 
                            type='date'
                            disabled={isPending}
                            {...field}
                            value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
            
                </div>
              </div>
              <Button className="bg-primary mt-2">Save Changes</Button>
            </div>
                  
                
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                  </form>
                </Form>
           
          </div>
        )}
            
          
          <div className="glass rounded-xl overflow-hidden mb-6 animate-slide-up animation-delay-1">
            <div className="p-5 border-b border-border flex items-center space-x-3">
              <Bell className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Notification Settings</h2>
            </div>
            
            <div className="p-5 divide-y divide-border">
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive transaction and budget alerts via email</div>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-medium">Push Notifications</div>
                  <div className="text-sm text-muted-foreground">Get alerts on your device</div>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-medium">Dark Mode</div>
                  <div className="text-sm text-muted-foreground">Switch between light and dark theme</div>
                </div>
                <ModeToggle/>
              </div>
            </div>
          </div>
          
        </div>
       
      </div>
    </div>
  );
};

export default SettingsComponent;
