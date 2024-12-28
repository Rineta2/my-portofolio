"use client";

import React from 'react'

import { usePathname } from "next/navigation";

import Header from '@/components/layout/header/Header';

import Footer from '@/components/layout/footer/Footer';

const Pathname = ({ children }) => {
    const pathname = usePathname();

    const isDashboard = pathname.includes('dashboard');

    if (isDashboard) {
        return children;
    }

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default Pathname;