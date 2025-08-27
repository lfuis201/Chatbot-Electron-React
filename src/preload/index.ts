import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ipcRenderer } from 'electron/renderer'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

// API personalizada para la galería
const galleryAPI = {
  get: (): Promise<string[]> => ipcRenderer.invoke('gallery:get'),
  add: (image: string): Promise<string[]> => ipcRenderer.invoke('gallery:add', image),
  clear: (): Promise<string[]> => ipcRenderer.invoke('gallery:clear')
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('galleryAPI', galleryAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)

  window.galleryAPI = galleryAPI

  // @ts-ignore (define in dts)
  window.api = api
}
