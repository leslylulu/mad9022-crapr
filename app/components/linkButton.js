'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation'

export default function LinkButton(props) {
    const { title, linkUrl } = props
    const pathname = usePathname()
    const isActive = pathname === linkUrl
    return (
        <Link 
            href={linkUrl} 
            className={`text-md px-4 py-2 transition-all duration-300 flex items-center rounded-full ${isActive ? 'bg-primary text-white' : 'border border-primary-dark text-primary-dark'}`}
        >
            {title}
        </Link>
    )
}