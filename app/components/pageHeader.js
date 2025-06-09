'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import LinkButton from "@/app/components/linkButton";

export default function PageHeader() {
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect for changing header transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-900/10 backdrop-blur-sm shadow-md py-2' 
          : 'backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 relative">
              <Image 
                src="/recycle.svg" 
                alt="Recycle Logo"
                fill
                sizes="40px"
                className="object-contain transition-transform group-hover:scale-110"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold text-primary-dark transition-colors group-hover:text-primary">Recycle</h1>
          </Link>

          <nav className="flex gap-2 md:gap-3">
            <LinkButton title="Search" linkUrl="/" />
            <LinkButton title="Post" linkUrl="/post" />
            <LinkButton title="Mine" linkUrl="/mine" />
            <LinkButton title="Wiped" linkUrl="/wiped" />
          </nav>
        </div>
      </div>
    </header>
  );
}