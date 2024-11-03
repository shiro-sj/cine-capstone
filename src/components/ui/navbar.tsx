import React from 'react'
import Link from 'next/link'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"

  
export default function NavBar() {
  return (
    <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                <Link href='/protected' legacyBehavior passHref>
                <NavigationMenuLink className=''>
                    home
                </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href='/protected/stats' legacyBehavior passHref>
                <NavigationMenuLink className=''>
                    stats
                </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href='/protected/profile' legacyBehavior passHref>
                <NavigationMenuLink className=''>
                    profile
                </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href='/protected/extras' legacyBehavior passHref>
                <NavigationMenuLink className=''>
                    extras
                </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>

        </NavigationMenuList>
    </NavigationMenu>
  )
}
