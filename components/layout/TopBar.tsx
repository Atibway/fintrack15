"use client"
import { LogOut, Menu, User2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ModeToggle } from '../modeToggler';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import HeaderLogo from '../HeaderLogo';
import { LogoutButton } from '../auth/logout-button';

import { cn } from '@/lib/utils';
import { menuItems } from '@/data/constants';
import { usePathname } from 'next/navigation';
import { useCurrentUser } from '@/hooks/use-current-user';

const TopBar = () => {
  const pathName = usePathname();
  const user = useCurrentUser()
  return (
    <div className="h-16 border-b border-border px-4 md:px-6 flex items-center justify-between glass sticky top-0 z-10">
<div className='md:block'>
<Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[280px]">
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="p-4 flex items-center space-x-2 border-b">
              <HeaderLogo />
            </div>
            <div className="py-4 px-2">
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.path}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all",
                      "hover:bg-secondary group",
                      pathName === item.path ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <div className={cn(
                      "flex-shrink-0 transition-transform",
                      pathName=== item.path ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    )}>
                      {item.icon}
                    </div>
                    <span className="transition-opacity">
                      {item.name}
                    </span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <div className="p-4 border-t mb-6">
            <LogoutButton>
              <button className={cn(
                "flex items-center space-x-3 px-3 py-3 w-full rounded-lg text-sm font-medium hover:bg-secondary text-muted-foreground hover:text-foreground transition-all",
              )}>
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </LogoutButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>
</div>
      
      <div className="flex items-center space-x-4">
        <ModeToggle/>
        {/* <Button variant="outline" size="icon" className="rounded-full relative bg-secondary border-none">
          <Bell className="h-4 w-4" />
          <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-primary rounded-full border-2 border-background"></span>
        </Button> */}
        
        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9 border-2 border-primary/10">
            <AvatarImage src={user?.image || ""} alt="User" />
            <AvatarFallback>
              <User2/>
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-sm">
            <div className="font-medium">{user?.name}</div>
            <div className="text-xs text-muted-foreground">{user?.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
