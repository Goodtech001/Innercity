import React from 'react'

export async function generateStaticParams() {
  return 24
}

interface PageProps {
  params: {
    id: string
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params // ✅ await it
  return <div>Page {id}</div>
}
