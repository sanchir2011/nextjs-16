
'use client'

import { useCallback, useEffect, useState } from 'react'
import { EditorProvider, useCurrentEditor, BubbleMenu, FloatingMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import CharacterCount from '@tiptap/extension-character-count'

import { uploadFiles } from '@/lib/request'
import { formatImageURL } from '@/utils/util'

import { toast } from 'sonner'

import { 
  Bold, 
  Italic,
  Strikethrough,
  Undo2,
  Redo2,
  Ruler,
  List,
  AlignJustify,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Highlighter,
  ImageDown,
  Heading1,
  Heading2,
  Type,
  Link2Off,
  Link2,
  Underline as UnderlineIcon
} from 'lucide-react'


const TextEditor = ({ content, setContent, ...props }: { content: any, setContent: any }) => {
  
  const MenuBar = () => {
    const { editor } = useCurrentEditor()
    
    if (!editor) return null

    editor.on('update', ({ editor }) => {
      setContent(editor.getHTML())
    })
  
    const handleImage = async (e: any) => {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append(`file`, file)
      const res = await uploadFiles({ formData })
      if(!res) return toast.error('Зураг хадгалахад алдаа гарлаа!')
      if(res.status != 200) return toast.error(res.error)
      const url = formatImageURL(res.data[0])
      if(url) editor.chain().focus().setImage({ src: url }).run() 
    }
  
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
  
        {editor && <div><FloatingMenu className="floating-menu" tippyOptions={{ duration: 100 }} editor={editor}>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          >
            <Heading1 size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          >
            <Heading2 size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            <List size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'is-active' : ''}
          >
            <Type size={16} />
          </button>
        </FloatingMenu></div>}
  
  
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
            <Bold size={16} />
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
            <Italic size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={
              !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
            }
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            <Strikethrough size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'is-active' : ''}
          >
            <UnderlineIcon size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'is-active' : ''}
          >
            <Type size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          >
            <Heading1 size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          >
            <Heading2 size={16} />
          </button>
          <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''} >
            <Link2 size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
          >
            <Link2Off size={16} />
          </button>
          <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={editor.isActive('highlight') ? 'is-active' : ''}>
            <Highlighter size={16} />
          </button>
          <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>
            <AlignLeft size={16} />
          </button>
          <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>
            <AlignCenter size={16} />
          </button>
          <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>
            <AlignRight size={16} />
          </button>
          <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}>
            <AlignJustify size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            <List size={16} />
          </button>
          <button>
            <label htmlFor='text-editor-upload' className='cursor-pointer'>
              <ImageDown size={16} /> 
            </label>
            <input id="text-editor-upload" name="text-editor-upload" type="file" className="sr-only" accept="image/*" onChange={handleImage} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
          >
            <Quote size={16} />
          </button>
          <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <Ruler size={16} />
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
            <Undo2 size={16} />
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
            <Redo2 size={16} />
          </button>
        </div>
        <div className="absolute -bottom-16 right-4 text-sm text-zinc-400 font-medium">
          {editor.storage.characterCount.words()} үг
        </div>
      </>
    )
  }

  return (
    <div key='editor' {...props}>
      <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content}></EditorProvider> 
    </div>
  )
}

const extensions = [
  Placeholder.configure({
    placeholder: 'Энд тусламжаа бичнэ үү...',
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

export default TextEditor
