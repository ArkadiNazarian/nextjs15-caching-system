interface Props {
    params: Promise<{ id: string }>
}

// this page is dynamic

// this generateStaticParams will make the static pages for /dynamic/1 /dynamic/2 /dynamic/3 ... /dynamic/10
// and for rest of the pages it will be server side rendered first time when visiting and from next time it will use the first cache

// If you return an empty array ([]) from generateStaticParams, Next.js will not pre-generate any static pages at build time. This means:
// No Static Pages → No pages will be generated at build time.
// Server-Side Rendering (SSR) on First Request → When a user visits any dynamic route (e.g., /dynamic/1), Next.js will render the page on the server on demand.
// Caching Behavior → After the first request, Next.js will cache the page and serve it statically for subsequent requests (if caching is enabled).
// This effectively means all dynamic routes will be rendered on-demand, behaving similarly to server-side rendering with caching instead of static generation.

// All posts besides the top 10 will be a 404 if we add line below
// export const dynamicParams = false

export async function generateStaticParams() {
    const arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

    return arr.map(id => ({ id }))
}


export default async function Home(props: Props) {

    const { id } = await props.params

    const time = new Date()

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div>Dynamic</div>
            <div>id: {id}</div>
            {time.toString()}
        </div>
    );
}