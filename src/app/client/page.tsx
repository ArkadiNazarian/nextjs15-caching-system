'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

    const [title, setTitle] = useState('')

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/1').then((result) => {
            return result.json()
        }).then((data) => {
            setTitle(data.title)
        })
    }, [])

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div>Client</div>
            <p>{title}</p>
            <Link href="/">Link to home page</Link>
        </div>
    );
}