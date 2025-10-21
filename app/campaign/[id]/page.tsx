import React from 'react'

export async function generateStaticParams() {
  return 24
}

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default function Page({}: PageProps) {
  return <div>Page {}</div>
}
