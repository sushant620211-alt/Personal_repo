'use client'

import { useEffect } from 'react'

/**
 * Mounted once in the root layout. Adds a few *casual* deterrents against
 * copying the photo/content:
 *  - blocks the right-click context menu site-wide
 *  - blocks dragging images out of the page
 *  - blocks the Ctrl+S / Cmd+S (save page), Ctrl+P / Cmd+P (print) and
 *    Ctrl+U / Cmd+U (view source) keyboard shortcuts
 *  - hides everything when the page is sent to a printer (see @media print
 *    in globals.css)
 *
 * Honest note: none of this can stop a screenshot (every OS can capture the
 * screen below the browser/page level) and a sufficiently technical visitor
 * can always get around client-side tricks. This only stops the easy,
 * casual ways of saving the photo — right-click → Save Image, drag-and-drop,
 * Ctrl+S, etc. — which is what most matrimonial-site "photo protection"
 * actually means in practice.
 */
export default function PhotoProtection() {
  useEffect(() => {
    const blockContextMenu = (e: MouseEvent) => e.preventDefault()
    const blockDragStart = (e: DragEvent) => e.preventDefault()

    const blockKeys = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      const ctrlOrCmd = e.ctrlKey || e.metaKey
      if (ctrlOrCmd && (k === 's' || k === 'p' || k === 'u')) {
        e.preventDefault()
      }
    }

    document.addEventListener('contextmenu', blockContextMenu)
    document.addEventListener('dragstart', blockDragStart)
    document.addEventListener('keydown', blockKeys)

    return () => {
      document.removeEventListener('contextmenu', blockContextMenu)
      document.removeEventListener('dragstart', blockDragStart)
      document.removeEventListener('keydown', blockKeys)
    }
  }, [])

  return null
}