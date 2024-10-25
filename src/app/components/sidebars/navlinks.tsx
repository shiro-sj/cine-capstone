"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const links = [
    { href: "/protected", label: "home" },
    { href: "/protected/stats", label: "stats" },
    { href: "/protected/profile", label: "profile" },
    { href: "/protected/extras", label: "extras" },
];

export default function Navlinks() {
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`sidebar-element ${pathname === link.href ? "sidebar-element-active" : ""}`}
                >
                    <h2>{link.label}</h2>
                </Link>
            ))}
        </>
    );
}
