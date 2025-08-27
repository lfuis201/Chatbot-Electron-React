import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    galleryAPI: {
      get: () => Promise<string[]>
      add: (image: string) => Promise<string[]>
      clear: () => Promise<string[]>
    }
  }
}
