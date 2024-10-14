'use client'

import { MDXEditorMethods, MDXEditorProps } from '@mdxeditor/editor'
import dynamic from 'next/dynamic'
import { forwardRef, useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'

// ForwardRefEditor.tsx

// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(() => import('./initialized-mdx-editor'), {
  // Make sure we turn SSR off
  ssr: false,
  loading: () => (
    <div className="flex flex-col">
      <Skeleton className="h-14 w-full" />
      <div className="h-6" />
      <Skeleton className="ml-3 h-5 w-24" />
      <Skeleton className="ml-3 h-5 my-3 w-56" />
    </div>
  )
})

// to accept other props, including a ref.
export const LazyMdxEditor = forwardRef<MDXEditorMethods, MDXEditorProps>(
  (props, ref) => {
    return <Editor {...props} editorRef={ref} />
  }
)

// TS complains without the following line
LazyMdxEditor.displayName = 'LazyMdxEditor'
