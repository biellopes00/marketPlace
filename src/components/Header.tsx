'use client';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, signOut } from "next-auth/react"
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Session } from "next-auth";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header({ session }: { session: Session | null }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const router = useRouter()
    return (
        <header className="border-b p-4 flex justify-between items-center h-16">
            <Link href="/"
                className="text-zinc-900 font-bold text-2xl"
            >
                MarketPlace
            </Link>
            <nav className="flex gap-4 *:rounded items-center">
                <Link href="/new" className="border border-blue-600 text-blue-600 inline-flex items-center gap-1 py-1 px-4 mr-3">
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
                            className="bg-blue-600 text-white border-0 px-6 py-1"
                        >
                            Login
                        </button>
                    </>
                )}
                {session?.user && (
                    <>
                        <div className="relative flex items-center">
                            <button onClick={() => setShowDropdown(prev => !prev)}>
                                <Image
                                    className={"rounded-md relative" + (showDropdown ? 'z-50' : '')}
                                    src={session.user.image as string} alt="Avatar" width={36} height={36} />
                            </button>
                            {showDropdown && (
                                <>
                                <div
                                    onClick={()=> setShowDropdown(false)}
                                    className="bg-black/90 fixed inset-0 z-40"></div>
                                    <div className="absolute right-0 top-9 bg-white rounded-md w-24 border z-50">
                                        <button
                                            onClick={() => {
                                                setShowDropdown(false);
                                                router.push('/my-ads')

                                            }}
                                            className="p-2 block text-center w-full">
                                                My ads
                                        </button>
                                        <button className="p-2 block w-full" onClick={() => signOut()}>Logout</button>
                                    </div>
                                </>
                            )}

                        </div>
                    </>
                )}
            </nav>
        </header>
    )
}