'use client'

import { useEffect, useState, type ForwardedRef } from 'react'
import '@mdxeditor/editor/style.css'
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  ListsToggle,
  listsPlugin,
  MDXEditorMethods,
  MDXEditorProps
} from '@mdxeditor/editor'
import { Icons } from './icons'
import { cn } from '@/lib/utils'

export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      {...props}
      ref={editorRef}
      className={cn(
        'break-words prose-xl prose-p:text-base prose-p:leading-5 prose-p:font-inter prose-p:font-medium prose-li:text-muted-foreground prose-strong:text-lg prose-p:my-2 prose-ul:pl-5 prose-ul:my-3 prose-ol:pl-5 prose-ol:my-3 prose-li:text-base prose-ul:list-disc prose-ol:list-decimal w-full ',
        props.className
      )}
      plugins={[
        listsPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <div
              className={cn(
                'flex pt-1.5',
                props.readOnly &&
                  'bg-gray-200/70 rounded-md w-full cursor-not-allowed -ml-2 p-1.5'
              )}
            >
              <UndoRedo />
              <Icons.verticalBar className="hidden sm:flex mt-1 h-6 w-auto opacity-15" />
              <BoldItalicUnderlineToggles />
              <Icons.verticalBar className="hidden sm:flex mt-1 h-6 w-auto opacity-15" />
              <ListsToggle options={['bullet', 'number']} />
            </div>
          )
        })
      ]}
    />
  )
}
