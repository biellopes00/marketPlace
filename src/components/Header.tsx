'use client';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, signOut } from "next-auth/react"
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Session } from "next-auth";
import Image from "next/image";

export default function Header({ session }: { session: Session }) {
    return (
        <header className="border-b p-4 flex justify-between items-center">
            <Link href="/"
                className="text-zinc-900 font-bold text-2xl"
            >
                MarketPlace
            </Link>
            <nav className="flex gap-4 *:rounded">
                <Link href="/new" className="border border-blue-600 text-blue-600 inline-flex items-center gap-1 px-4 mr-3">
                    <FontAwesomeIcon icon={faPlus} className="h-4" />
                    <span>
                        Post a ad
                    </span>
                </Link>
                <span className="border-r"></span>
                {!session?.user && (
                    <>
                        <button className="border-0 text-gray-600">Sign Up</button>
                        <button
                            onClick={() => signIn('google')}
                            className="bg-blue-600 text-white border-0 px-6"
                        >
                            Login
                        </button>
                    </>
                )}
                {session?.user && (
                    <>
                        <Link href={'/account'}>

                            <Image
                                className="rounded-md"
                                src={session.user.image as string} alt="Avatar" width={36} height={36} />
                        </Link>
                    </>
                )}
            </nav>
        </header>
    )
}