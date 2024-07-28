"use client"

import clsx from "clsx";
import { ChartNoAxesColumn, HomeIcon, LayoutGrid, MessageSquareMore } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { name: 'Home', href: '/home', icon: HomeIcon },
    { name: 'Projetos', href: '/projects', icon: LayoutGrid },
    { name: 'Chat', href: '/chat', icon: MessageSquareMore },
    { name: 'Dashboard', href: '/dashboard', icon: ChartNoAxesColumn },
];

const NavLinks = () => {
    const path = usePathname();

    return (
        <>
            <span className="text-xs text-zinc-400">MAIN</span>
            {links.map(link => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            "flex h-[38px] grow items-center justify-center rounded-md gap-4 px-3 text-zinc-400 text-sm font-semibold hover:bg-zinc-100 md:flex-none md:justify-start md:p-2 md:px-3",
                            {
                                'bg-zinc-100 text-zinc-800': path === link.href,
                            },
                        )}>
                        <LinkIcon />
                        <p>{link.name}</p>
                    </Link>
                )
            })}
        </>
    );
}

export default NavLinks;