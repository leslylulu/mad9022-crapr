'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation'

export default function LinkButton(props) {
	const { title, linkUrl } = props
	const pathname = usePathname()
	return <Link href={linkUrl} className={`text-md ${pathname == linkUrl ? 'bg-primary' : 'bg-primary-dark'} text-white p-3 rounded-md flex items-center`}>
		{title}
		<span className="material-symbols-outlined ml-2">
		</span>
	</Link>
}
