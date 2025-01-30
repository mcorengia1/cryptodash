import Link from "next/link";

export default function Header() {
    return (
        <header>
            <Link href={'/'}
                className='text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 transition-all duration-500'>CryptoDash</Link>
        </header>
    )
}