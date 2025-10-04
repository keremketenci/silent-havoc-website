'use client'


import React from 'react';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from '@/components/shadcn/ui/navigation-menu';


type MenuItem = { label: string; section: string };


export default function NavigationMenuScroller({ menuItems }: { menuItems: MenuItem[] }) {
    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
    };


    return (
        <NavigationMenu>
            <NavigationMenuList className="grid grid-cols-2 lg:grid-cols-1 lg:mt-4 lg:flex text-center items-center gap-x-8 lg:gap-x-0 lg:space-x-8">
                {menuItems.map((item) => (
                    <NavigationMenuItem className="cursor-target md:cursor-none" key={item.section}>
                        <NavigationMenuLink className='text-xl' onClick={() => scrollToSection(item.section)}>
                            {item.label}
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}