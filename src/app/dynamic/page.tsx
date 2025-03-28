import Link from "next/link";

// this page is SSR and not be chaced because of cache:'no-store' , and SSR pages are dynamic pages

export default async function Home() {

    const data = await fetch('https://jsonplaceholder.typicode.com/todos/1',{cache:'no-store'})

    const response = await data.json()

    const time = new Date()

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div>Dynamic</div>
            <div>{response.title}</div>
            {time.toString()}
            <Link href="/">Link to home page</Link>
        </div>
    );
}