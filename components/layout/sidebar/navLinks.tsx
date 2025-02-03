"use client"

import clsx from "clsx";
import { HomeIcon, LayoutGrid, MessageSquareMore, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { name: 'Home', href: '/projeto', icon: HomeIcon },
    { name: 'Projetos', href: '/projects', icon: LayoutGrid },
    { name: 'Chat', href: '/chat', icon: MessageSquareMore },
    { name: 'People', href: '/people', icon: Users }
];

const NavLinks = () => {
    const path = usePathname();

    return (
        <>
            {links.map(link => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={
                            clsx(
                                "flex p-2 rounded-lg grow items-center text-zinc-400 hover:text-zinc-300 hover:bg-zinc-50 md:flex-none",
                                { 'bg-zinc-100': path === link.href }
                            )
                        }>
                        <LinkIcon
                            className={
                                clsx({ 'text-zinc-700': path === link.href })}
                        />
                    </Link>
                )
            })}
        </>
    );
}

export default NavLinks;