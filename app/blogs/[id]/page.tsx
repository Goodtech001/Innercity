import React from 'react'
import { notFound } from 'next/navigation'
import blogsData from '@/json/blog-posts.json'
import Link from 'next/link'
import Image from 'next/image'
import { BlogContent } from '@/components/blog-details-content'
import { Icon } from '@iconify/react/dist/iconify.js'
import Footer from '@/layouts/footer'
import TopNavbar from '@/layouts/topnavbar'

export async function generateStaticParams() {
  return blogsData.map((post) => ({
    id: post.id,
  }))
}

interface BlogPostPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function BlogDetailsPage({ params }: BlogPostPageProps) {
  const { id } = await params // ✅ await it
  const post = blogsData.find((p) => p.id === id)

  if (!post) notFound()

  return (
    <>
    <TopNavbar/>
    <div className="bg-white">
      <div className="wrapper mx-auto px-2 py-12 md:px-4 lg:px-8">
        <Link
          href="/blogs"
          className="btn mb-6 flex w-fit items-center justify-center px-2 py-2 text-primary md:mb-8"
        >
          <Icon icon="mdi-light:arrow-right" width="24" height="24" className="rotate-180"/>
        </Link>

        <h1 className="mb-4 text-3xl font-bold text-dark md:text-4xl">{post.title}</h1>

        <Image
          width={200}
          height={200}
          src={post.image}
          alt={post.title}
          className="mb-8 h-96 w-full rounded-lg bg-primary/75 object-contain md:h-[400px]"
        />

        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center text-gray-600">
            <Icon icon="mdi:users" width="24" height="24" className="mr-1 h-4 w-4"/>
            <span>{post.author}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Icon icon="mdi:clock" width="24" height="24" className="mr-1 h-4 w-4"  />
            <span>{post.readTime}</span>
          </div>
          <div className="flex items-center text-primary">
            <Icon icon="mdi:tag-outline" width="24" height="24" className="mr-1 h-4 w-4" />
            <span>{post.category}</span>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <BlogContent content={post.content} />
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}
