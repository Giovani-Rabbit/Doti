"use client"

import clsx from "clsx";
import { ChartNoAxesColumn, HomeIcon, LayoutGrid, MessageSquareMore } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { name: 'Home', href: '/home', icon: HomeIcon },
    { name: 'Projetos', href: '/projects', icon: LayoutGrid },
    { name: 'Chat', href: '/chat', icon: MessageSquareMore },
];

const NavLinks = () => {
    const path = usePathname();

    return (
        <>
            <span className="text-xs text-zinc-400 font-medium">MAIN</span>
            {links.map(link => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            "flex h-[38px] grow items-center justify-center rounded-md gap-4 text-zinc-400 hover:text-violet-500 font-semibold md:flex-none md:justify-start",
                            {
                                'text-violet-500': path === link.href,
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