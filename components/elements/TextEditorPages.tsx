
'use client'

import { useCallback, useEffect, useState } from 'react'
import { EditorProvider, useCurrentEditor, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import CharacterCount from '@tiptap/extension-character-count'

import { 
  Bold, 
  Italic,
  Strikethrough,
  Undo2,
  Redo2,
  Ruler,
  List,
  Link2Off,
  Link2,
  Underline as UnderlineIcon
} from 'lucide-react'


const TextEditorPages = ({ content, setContent, ...props }: { content: any, setContent: any }) => {
  
  const MenuBar = () => {
    const { editor } = useCurrentEditor()
    
    if (!editor) return null

    editor.on('update', ({ editor }) => {
      setContent(editor.getHTML())
    })

    const setLink = useCallback(() => {
      const previousUrl = editor.getAttributes('link').href
      const url = window.prompt('Холбоос оруулах:', previousUrl)
    
      if(url === null) return
      if(url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run()
        return
      }
    
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }, [editor])
    
    return (
      <>
        {editor && <div><BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            <Bold size={16} strokeWidth={3}/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            <Italic size={16} strokeWidth={3}/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            <Strikethrough size={16} strokeWidth={3}/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'is-active' : ''}
          >
            <UnderlineIcon size={16} strokeWidth={3} />
          </button>
        </BubbleMenu></div>}
  
  
        <div className='editor-menu'>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
              !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
            }
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            <Bold size={16} strokeWidth={2.5}  />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={
              !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
            }
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            <Italic size={16} strokeWidth={2.5}  />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'is-active' : ''}
          >
            <UnderlineIcon size={16} strokeWidth={2.5}  />
          </button>
          <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''} >
            <Link2 size={16} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
          >
            <Link2Off size={16} strokeWidth={2.5}  />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            <List size={16} strokeWidth={2.5}  />
          </button>
          <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <Ruler size={16} strokeWidth={2.5}  />
          </button>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={
              !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
            }
          >
            <Undo2 size={16} strokeWidth={2.5}  />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={
              !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
            }
          >
            <Redo2 size={16} strokeWidth={2.5}  />
          </button>
        </div>
      </>
    )
  }

  return (
    <div key='editor' {...props}>
      <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content} immediatelyRender={false}></EditorProvider> 
    </div>
  )
}

const extensions = [
  Placeholder.configure({
    placeholder: 'Энд хуудас дээрх контентоо бичнэ үү...',
  }),
  Underline,
  Image.configure({
    HTMLAttributes: {
      class: 'editor-image',
    },
  }),
  Dropcursor,
  TextStyle,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Link,
  CharacterCount,
  Highlight,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
]

export default TextEditorPages
