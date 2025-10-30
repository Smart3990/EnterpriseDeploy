import { useEffect, useRef, useState } from 'react'
import Layout from '@/components/Layout'
import { useTheme } from '@/contexts/ThemeContext'
import { Palette, Type, ImageIcon, Download, Trash2 } from 'lucide-react'

export default function DesignStudio() {
  const { theme } = useTheme()
  const canvasRef = useRef<any>(null)
  const fabricRef = useRef<any>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const fabric = await import('fabric')
        if (!mounted) return
        
        const Canvas = (fabric as any).fabric?.Canvas || (fabric as any).Canvas
        const canvas = new Canvas('design-canvas', {
          backgroundColor: '#ffffff',
          width: 1000,
          height: 600
        })
        
        fabricRef.current = canvas
        canvasRef.current = canvas
        setReady(true)
      } catch (e) {
        console.warn('Fabric.js not available:', e)
      }
    })()

    return () => {
      mounted = false
      try {
        canvasRef.current?.dispose?.()
      } catch (e) {
        console.warn('Canvas disposal error:', e)
      }
    }
  }, [])

  const addText = () => {
    if (!fabricRef.current) return
    const fabric = (window as any).fabric
    if (!fabric) return

    const text = new fabric.Text('Double click to edit', {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: '#000000',
      fontFamily: 'Arial'
    })
    fabricRef.current.add(text)
  }

  const addRect = () => {
    if (!fabricRef.current) return
    const fabric = (window as any).fabric
    if (!fabric) return

    const rect = new fabric.Rect({
      left: 150,
      top: 150,
      width: 200,
      height: 100,
      fill: '#a855f7',
      stroke: '#9333ea',
      strokeWidth: 2
    })
    fabricRef.current.add(rect)
  }

  const addCircle = () => {
    if (!fabricRef.current) return
    const fabric = (window as any).fabric
    if (!fabric) return

    const circle = new fabric.Circle({
      left: 200,
      top: 200,
      radius: 50,
      fill: '#c084fc',
      stroke: '#a855f7',
      strokeWidth: 2
    })
    fabricRef.current.add(circle)
  }

  const clearCanvas = () => {
    if (!fabricRef.current) return
    fabricRef.current.clear()
    fabricRef.current.backgroundColor = '#ffffff'
  }

  const downloadImage = () => {
    if (!fabricRef.current) return
    const dataURL = fabricRef.current.toDataURL({
      format: 'png',
      quality: 1
    })
    const link = document.createElement('a')
    link.download = 'devignite-design.png'
    link.href = dataURL
    link.click()
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
        <div>
          <h1 className={`text-4xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Design Studio
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Create stunning visuals with our canvas-based design tool
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          <div className={`${theme === 'dark' ? 'bg-white/5 backdrop-blur-sm border-white/10' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className={`text-lg font-semibold flex items-center space-x-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <Palette className="h-5 w-5 text-purple-400" />
                <span>Canvas</span>
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={downloadImage}
                  disabled={!ready}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-pink-500/50 disabled:opacity-50 transition-all flex items-center space-x-2 text-sm"
                >
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
                <button
                  onClick={clearCanvas}
                  disabled={!ready}
                  className={`px-4 py-2 rounded-lg hover:bg-white/10 disabled:opacity-50 transition-all flex items-center space-x-2 text-sm ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/10 text-gray-400'
                      : 'bg-gray-100 border-gray-300 text-gray-700'
                  } border`}
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            <div className={`border-2 rounded-xl overflow-hidden flex items-center justify-center ${
              theme === 'dark'
                ? 'border-white/10 bg-white/5 backdrop-blur-sm'
                : 'border-gray-200 bg-gray-50'
            }`}>
              <canvas id="design-canvas" className="max-w-full" />
            </div>

            {!ready && (
              <div className={`mt-4 text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Loading canvas editor...
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className={`${theme === 'dark' ? 'bg-white/5 backdrop-blur-sm border-white/10' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
              <h3 className={`text-base font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Add Elements
              </h3>
              <div className="space-y-2">
                <button
                  onClick={addText}
                  disabled={!ready}
                  className={`w-full px-4 py-3 rounded-xl transition-all flex items-center space-x-3 disabled:opacity-50 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/10 hover:bg-white/10'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  } border`}
                >
                  <Type className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Add Text
                  </span>
                </button>

                <button
                  onClick={addRect}
                  disabled={!ready}
                  className={`w-full px-4 py-3 rounded-xl transition-all flex items-center space-x-3 disabled:opacity-50 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/10 hover:bg-white/10'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  } border`}
                >
                  <div className={`w-5 h-5 border-2 rounded ${theme === 'dark' ? 'border-gray-400' : 'border-gray-600'}`} />
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Add Rectangle
                  </span>
                </button>

                <button
                  onClick={addCircle}
                  disabled={!ready}
                  className={`w-full px-4 py-3 rounded-xl transition-all flex items-center space-x-3 disabled:opacity-50 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/10 hover:bg-white/10'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  } border`}
                >
                  <div className={`w-5 h-5 border-2 rounded-full ${theme === 'dark' ? 'border-gray-400' : 'border-gray-600'}`} />
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Add Circle
                  </span>
                </button>
              </div>
            </div>

            <div className={`rounded-2xl p-6 shadow-lg ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white shadow-pink-500/30'
                : 'bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 text-white shadow-purple-300/50'
            }`}>
              <h3 className="text-lg font-semibold mb-2">Pro Tips</h3>
              <ul className="text-sm text-white/90 space-y-2">
                <li>• Click and drag to move elements</li>
                <li>• Double-click text to edit</li>
                <li>• Use corner handles to resize</li>
                <li>• Export as PNG for social media</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
