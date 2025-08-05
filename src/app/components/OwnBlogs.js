"use client"

import Link from "next/link"

export default function OwnBlogs() {
    return (
        <>
            <h1>Your Blogs:</h1>
            {/* <Link href="firstBlog"><button>{blogTitle}</button></Link> */}
            <Link href="create_blog"><button>Create Blog</button></Link>
        </>
    )
}