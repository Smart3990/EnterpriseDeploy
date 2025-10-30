import { useEffect, useRef, useState } from 'react'
import Layout from '@/components/Layout'
import { useTheme } from '@/contexts/ThemeContext'
import {
  Palette,
  Type,
  Square,
  Circle,
  Triangle,
  Star,
  Image as ImageIcon,
  Download,
  Trash2,
  Upload,
  Minus,
  Copy,
  ArrowUp,
  ArrowDown,
  PenTool,
  Grid3x3,
  FileText,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Smartphone,
  Monitor,
  Mail,
  Presentation,
  ShoppingBag,
  Calendar,
  Award,
  Briefcase,
  Heart,
  Sparkles
} from 'lucide-react'

export default function DesignStudio() {
  const { theme } = useTheme()
  const canvasRef = useRef<any>(null)
  const fabricRef = useRef<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [ready, setReady] = useState(false)
  const [fillColor, setFillColor] = useState('#8b5cf6')
  const [strokeColor, setStrokeColor] = useState('#6d28d9')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [activeTab, setActiveTab] = useState<'tools' | 'templates'>('tools')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const templates = [
    // Social Media Templates
    { id: 1, name: 'Instagram Post', category: 'social', icon: Instagram, width: 1080, height: 1080, color: 'from-pink-500 to-rose-500' },
    { id: 2, name: 'Instagram Story', category: 'social', icon: Instagram, width: 1080, height: 1920, color: 'from-purple-500 to-pink-500' },
    { id: 3, name: 'Facebook Post', category: 'social', icon: Facebook, width: 1200, height: 630, color: 'from-blue-600 to-blue-700' },
    { id: 4, name: 'Facebook Cover', category: 'social', icon: Facebook, width: 820, height: 312, color: 'from-blue-500 to-indigo-500' },
    { id: 5, name: 'Twitter Header', category: 'social', icon: Twitter, width: 1500, height: 500, color: 'from-sky-400 to-blue-500' },
    { id: 6, name: 'Twitter Post', category: 'social', icon: Twitter, width: 1200, height: 675, color: 'from-cyan-500 to-blue-600' },
    { id: 7, name: 'YouTube Thumbnail', category: 'social', icon: Youtube, width: 1280, height: 720, color: 'from-red-500 to-red-600' },
    { id: 8, name: 'YouTube Banner', category: 'social', icon: Youtube, width: 2560, height: 1440, color: 'from-red-600 to-pink-500' },
    { id: 9, name: 'LinkedIn Post', category: 'social', icon: Briefcase, width: 1200, height: 627, color: 'from-blue-700 to-indigo-600' },
    { id: 10, name: 'Pinterest Pin', category: 'social', icon: Heart, width: 1000, height: 1500, color: 'from-red-500 to-rose-500' },
    
    // Marketing Templates
    { id: 11, name: 'Email Header', category: 'marketing', icon: Mail, width: 600, height: 300, color: 'from-orange-500 to-amber-500' },
    { id: 12, name: 'Email Newsletter', category: 'marketing', icon: Mail, width: 600, height: 800, color: 'from-yellow-500 to-orange-500' },
    { id: 13, name: 'Banner Ad', category: 'marketing', icon: Presentation, width: 728, height: 90, color: 'from-purple-600 to-pink-600' },
    { id: 14, name: 'Square Ad', category: 'marketing', icon: Presentation, width: 250, height: 250, color: 'from-pink-500 to-purple-500' },
    { id: 15, name: 'Leaderboard Ad', category: 'marketing', icon: Presentation, width: 728, height: 90, color: 'from-indigo-500 to-purple-500' },
    { id: 16, name: 'Product Card', category: 'marketing', icon: ShoppingBag, width: 400, height: 500, color: 'from-green-500 to-emerald-500' },
    { id: 17, name: 'Promo Banner', category: 'marketing', icon: Award, width: 1200, height: 400, color: 'from-yellow-500 to-red-500' },
    { id: 18, name: 'Sale Banner', category: 'marketing', icon: ShoppingBag, width: 1000, height: 300, color: 'from-orange-500 to-red-500' },
    { id: 19, name: 'Discount Coupon', category: 'marketing', icon: Award, width: 800, height: 400, color: 'from-purple-500 to-pink-500' },
    { id: 20, name: 'Gift Voucher', category: 'marketing', icon: Award, width: 600, height: 400, color: 'from-amber-500 to-orange-500' },
    
    // Web Templates
    { id: 21, name: 'Blog Header', category: 'web', icon: FileText, width: 1200, height: 630, color: 'from-teal-500 to-cyan-500' },
    { id: 22, name: 'Hero Section', category: 'web', icon: Monitor, width: 1920, height: 1080, color: 'from-blue-600 to-purple-600' },
    { id: 23, name: 'Feature Card', category: 'web', icon: Grid3x3, width: 400, height: 300, color: 'from-green-500 to-teal-500' },
    { id: 24, name: 'Website Banner', category: 'web', icon: Monitor, width: 1920, height: 400, color: 'from-indigo-600 to-blue-500' },
    { id: 25, name: 'Landing Page', category: 'web', icon: Presentation, width: 1440, height: 900, color: 'from-purple-600 to-blue-500' },
    { id: 26, name: 'Mobile Banner', category: 'web', icon: Smartphone, width: 750, height: 1334, color: 'from-pink-500 to-purple-500' },
    { id: 27, name: 'Desktop Wallpaper', category: 'web', icon: Monitor, width: 1920, height: 1080, color: 'from-blue-500 to-indigo-600' },
    { id: 28, name: 'Mobile Wallpaper', category: 'web', icon: Smartphone, width: 1080, height: 1920, color: 'from-purple-500 to-pink-500' },
    { id: 29, name: 'Logo Design', category: 'web', icon: Sparkles, width: 500, height: 500, color: 'from-amber-500 to-orange-600' },
    { id: 30, name: 'Favicon', category: 'web', icon: Monitor, width: 512, height: 512, color: 'from-blue-500 to-cyan-500' },
    
    // Business Templates
    { id: 31, name: 'Business Card', category: 'business', icon: Briefcase, width: 1050, height: 600, color: 'from-gray-700 to-gray-900' },
    { id: 32, name: 'Letterhead', category: 'business', icon: FileText, width: 816, height: 1056, color: 'from-blue-800 to-indigo-800' },
    { id: 33, name: 'Invoice Template', category: 'business', icon: FileText, width: 816, height: 1056, color: 'from-green-700 to-teal-700' },
    { id: 34, name: 'Resume', category: 'business', icon: Briefcase, width: 816, height: 1056, color: 'from-purple-700 to-blue-700' },
    { id: 35, name: 'Certificate', category: 'business', icon: Award, width: 1122, height: 794, color: 'from-amber-600 to-orange-600' },
    { id: 36, name: 'Flyer', category: 'business', icon: FileText, width: 816, height: 1056, color: 'from-pink-600 to-rose-600' },
    { id: 37, name: 'Brochure', category: 'business', icon: FileText, width: 1122, height: 794, color: 'from-indigo-600 to-purple-600' },
    { id: 38, name: 'Poster', category: 'business', icon: Presentation, width: 1122, height: 1587, color: 'from-red-600 to-pink-600' },
    { id: 39, name: 'Presentation Slide', category: 'business', icon: Presentation, width: 1920, height: 1080, color: 'from-blue-600 to-cyan-600' },
    { id: 40, name: 'ID Card', category: 'business', icon: Briefcase, width: 1012, height: 638, color: 'from-teal-600 to-cyan-600' },
    
    // Event Templates
    { id: 41, name: 'Event Invitation', category: 'event', icon: Calendar, width: 800, height: 1200, color: 'from-purple-500 to-pink-500' },
    { id: 42, name: 'Event Poster', category: 'event', icon: Calendar, width: 1122, height: 1587, color: 'from-orange-500 to-red-500' },
    { id: 43, name: 'Event Banner', category: 'event', icon: Calendar, width: 1920, height: 400, color: 'from-blue-500 to-purple-500' },
    { id: 44, name: 'Ticket Design', category: 'event', icon: Calendar, width: 1000, height: 400, color: 'from-green-500 to-teal-500' },
    { id: 45, name: 'Party Invitation', category: 'event', icon: Heart, width: 800, height: 1200, color: 'from-pink-500 to-rose-500' },
    { id: 46, name: 'Wedding Card', category: 'event', icon: Heart, width: 1000, height: 1400, color: 'from-rose-400 to-pink-500' },
    { id: 47, name: 'Birthday Card', category: 'event', icon: Heart, width: 800, height: 1200, color: 'from-yellow-500 to-orange-500' },
    { id: 48, name: 'Thank You Card', category: 'event', icon: Heart, width: 600, height: 400, color: 'from-purple-400 to-pink-400' },
    { id: 49, name: 'Menu Card', category: 'event', icon: FileText, width: 600, height: 900, color: 'from-amber-600 to-orange-600' },
    { id: 50, name: 'Name Tag', category: 'event', icon: Award, width: 400, height: 300, color: 'from-blue-500 to-indigo-500' },
    
    // Additional Popular
    { id: 51, name: 'Thumbnail', category: 'social', icon: ImageIcon, width: 1280, height: 720, color: 'from-cyan-500 to-blue-500' },
    { id: 52, name: 'Cover Image', category: 'social', icon: ImageIcon, width: 1500, height: 500, color: 'from-indigo-500 to-purple-500' },
    { id: 53, name: 'Infographic', category: 'marketing', icon: Presentation, width: 800, height: 2000, color: 'from-green-600 to-emerald-600' },
    { id: 54, name: 'Story Highlight', category: 'social', icon: Instagram, width: 1080, height: 1920, color: 'from-pink-600 to-purple-600' },
    { id: 55, name: 'App Icon', category: 'web', icon: Smartphone, width: 1024, height: 1024, color: 'from-blue-500 to-purple-500' },
  ]

  const categories = [
    { id: 'all', name: 'All Templates', count: templates.length },
    { id: 'social', name: 'Social Media', count: templates.filter(t => t.category === 'social').length },
    { id: 'marketing', name: 'Marketing', count: templates.filter(t => t.category === 'marketing').length },
    { id: 'web', name: 'Web Design', count: templates.filter(t => t.category === 'web').length },
    { id: 'business', name: 'Business', count: templates.filter(t => t.category === 'business').length },
    { id: 'event', name: 'Events', count: templates.filter(t => t.category === 'event').length },
  ]

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const fabric = await import('fabric')
        if (!mounted) return

        const Canvas = (fabric as any).fabric?.Canvas || (fabric as any).Canvas
        const canvas = new Canvas('design-canvas', {
          backgroundColor: bgColor,
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
      fontSize: 32,
      fill: fillColor,
      fontFamily: 'Arial',
      fontWeight: 'bold'
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
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: 2,
      rx: 10,
      ry: 10
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
      radius: 60,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: 2
    })
    fabricRef.current.add(circle)
  }

  const addTriangle = () => {
    if (!fabricRef.current) return
    const fabric = (window as any).fabric
    if (!fabric) return

    const triangle = new fabric.Triangle({
      left: 250,
      top: 200,
      width: 100,
      height: 100,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: 2
    })
    fabricRef.current.add(triangle)
  }

  const addStar = () => {
    if (!fabricRef.current) return
    const fabric = (window as any).fabric
    if (!fabric) return

    const points = []
    const numPoints = 5
    const outerRadius = 60
    const innerRadius = 30
    for (let i = 0; i < numPoints * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius
      const angle = (Math.PI * i) / numPoints
      points.push({
        x: radius * Math.sin(angle),
        y: -radius * Math.cos(angle)
      })
    }

    const star = new fabric.Polygon(points, {
      left: 300,
      top: 250,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: 2
    })
    fabricRef.current.add(star)
  }

  const addLine = () => {
    if (!fabricRef.current) return
    const fabric = (window as any).fabric
    if (!fabric) return

    const line = new fabric.Line([50, 300, 250, 300], {
      stroke: strokeColor,
      strokeWidth: 3
    })
    fabricRef.current.add(line)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !fabricRef.current) return

    const fabric = (window as any).fabric
    if (!fabric) return

    const reader = new FileReader()
    reader.onload = async (event) => {
      const imgUrl = event.target?.result as string
      fabric.Image.fromURL(imgUrl, (img: any) => {
        img.scale(0.5)
        fabricRef.current.add(img)
        fabricRef.current.centerObject(img)
        fabricRef.current.setActiveObject(img)
        fabricRef.current.renderAll()
      })
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const clearCanvas = () => {
    if (!fabricRef.current) return
    fabricRef.current.clear()
    fabricRef.current.backgroundColor = bgColor
    fabricRef.current.renderAll()
  }

  const deleteSelected = () => {
    if (!fabricRef.current) return
    const activeObject = fabricRef.current.getActiveObject()
    if (activeObject) {
      fabricRef.current.remove(activeObject)
      fabricRef.current.renderAll()
    }
  }

  const duplicateSelected = () => {
    if (!fabricRef.current) return
    const activeObject = fabricRef.current.getActiveObject()
    if (activeObject) {
      activeObject.clone((cloned: any) => {
        cloned.set({
          left: cloned.left + 20,
          top: cloned.top + 20
        })
        fabricRef.current.add(cloned)
        fabricRef.current.setActiveObject(cloned)
        fabricRef.current.renderAll()
      })
    }
  }

  const bringForward = () => {
    if (!fabricRef.current) return
    const activeObject = fabricRef.current.getActiveObject()
    if (activeObject) {
      fabricRef.current.bringForward(activeObject)
      fabricRef.current.renderAll()
    }
  }

  const sendBackward = () => {
    if (!fabricRef.current) return
    const activeObject = fabricRef.current.getActiveObject()
    if (activeObject) {
      fabricRef.current.sendBackwards(activeObject)
      fabricRef.current.renderAll()
    }
  }

  const changeFillColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value
    setFillColor(color)
    const activeObject = fabricRef.current?.getActiveObject()
    if (activeObject) {
      activeObject.set('fill', color)
      fabricRef.current.renderAll()
    }
  }

  const changeStrokeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value
    setStrokeColor(color)
    const activeObject = fabricRef.current?.getActiveObject()
    if (activeObject) {
      activeObject.set('stroke', color)
      fabricRef.current.renderAll()
    }
  }

  const changeBgColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value
    setBgColor(color)
    if (fabricRef.current) {
      fabricRef.current.backgroundColor = color
      fabricRef.current.renderAll()
    }
  }

  const downloadPNG = () => {
    if (!fabricRef.current) return
    const dataURL = fabricRef.current.toDataURL({
      format: 'png',
      quality: 1.0
    })
    const link = document.createElement('a')
    link.download = 'devignite-design.png'
    link.href = dataURL
    link.click()
  }

  const downloadJPEG = () => {
    if (!fabricRef.current) return
    const dataURL = fabricRef.current.toDataURL({
      format: 'jpeg',
      quality: 0.9
    })
    const link = document.createElement('a')
    link.download = 'devignite-design.jpg'
    link.href = dataURL
    link.click()
  }

  const downloadPDF = async () => {
    if (!fabricRef.current) return
    try {
      const jsPDF = (await import('jspdf')).default
      const imgData = fabricRef.current.toDataURL({ format: 'png', quality: 1.0 })
      const pdf = new jsPDF({
        orientation: fabricRef.current.width > fabricRef.current.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [fabricRef.current.width, fabricRef.current.height]
      })
      pdf.addImage(imgData, 'PNG', 0, 0, fabricRef.current.width, fabricRef.current.height)
      pdf.save('devignite-design.pdf')
    } catch (error) {
      console.error('PDF export failed:', error)
      alert('Failed to export PDF. Please try again.')
    }
  }

  const loadTemplate = (template: typeof templates[0]) => {
    if (!fabricRef.current) return
    const fabric = (window as any).fabric
    if (!fabric) return

    fabricRef.current.setDimensions({ width: template.width, height: template.height })
    fabricRef.current.clear()
    
    const colors = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    
    fabricRef.current.backgroundColor = '#ffffff'
    
    const rect = new fabric.Rect({
      left: template.width * 0.1,
      top: template.height * 0.3,
      width: template.width * 0.8,
      height: template.height * 0.4,
      fill: randomColor,
      rx: 20,
      ry: 20,
      opacity: 0.2
    })
    fabricRef.current.add(rect)
    
    const title = new fabric.Text(template.name, {
      left: template.width / 2,
      top: template.height * 0.4,
      fontSize: Math.min(template.width, template.height) / 15,
      fill: '#1f2937',
      fontFamily: 'Arial',
      fontWeight: 'bold',
      originX: 'center',
      originY: 'center'
    })
    fabricRef.current.add(title)
    
    const subtitle = new fabric.Text(`${template.width} x ${template.height}px`, {
      left: template.width / 2,
      top: template.height * 0.55,
      fontSize: Math.min(template.width, template.height) / 30,
      fill: '#6b7280',
      fontFamily: 'Arial',
      originX: 'center',
      originY: 'center'
    })
    fabricRef.current.add(subtitle)
    
    fabricRef.current.renderAll()
  }

  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(t => t.category === selectedCategory)

  return (
    <Layout>
      <div className="max-w-full px-6 py-12 space-y-10">
        <div className="max-w-7xl mx-auto">
          <h1 className={`text-4xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Design Studio
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Professional design tools with 55+ templates • Export to PNG, PDF, or JPEG
          </p>
        </div>

        <div className="flex items-center justify-center space-x-4 max-w-7xl mx-auto">
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'tools'
                ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/50'
                : theme === 'dark'
                  ? 'bg-white/5 text-gray-400 hover:bg-white/10'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Canvas Tools
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'templates'
                ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/50'
                : theme === 'dark'
                  ? 'bg-white/5 text-gray-400 hover:bg-white/10'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Templates ({templates.length})
          </button>
        </div>

        {activeTab === 'tools' ? (
          <div className="grid lg:grid-cols-[300px_1fr_300px] gap-6 max-w-full mx-auto">
            <div className="space-y-4">
              <div className={`${theme === 'dark' ? 'bg-white/5 backdrop-blur-sm border-white/10' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                <h3 className={`text-base font-semibold mb-4 flex items-center space-x-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <Palette className="h-5 w-5 text-purple-400" />
                  <span>Add Elements</span>
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
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Text</span>
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
                    <Square className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Rectangle</span>
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
                    <Circle className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Circle</span>
                  </button>

                  <button
                    onClick={addTriangle}
                    disabled={!ready}
                    className={`w-full px-4 py-3 rounded-xl transition-all flex items-center space-x-3 disabled:opacity-50 ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 hover:bg-white/10'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    } border`}
                  >
                    <Triangle className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Triangle</span>
                  </button>

                  <button
                    onClick={addStar}
                    disabled={!ready}
                    className={`w-full px-4 py-3 rounded-xl transition-all flex items-center space-x-3 disabled:opacity-50 ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 hover:bg-white/10'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    } border`}
                  >
                    <Star className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Star</span>
                  </button>

                  <button
                    onClick={addLine}
                    disabled={!ready}
                    className={`w-full px-4 py-3 rounded-xl transition-all flex items-center space-x-3 disabled:opacity-50 ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 hover:bg-white/10'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    } border`}
                  >
                    <Minus className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Line</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={!ready}
                    className={`w-full px-4 py-3 rounded-xl transition-all flex items-center space-x-3 disabled:opacity-50 ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 hover:bg-white/10'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    } border`}
                  >
                    <Upload className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Upload Image</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div className={`${theme === 'dark' ? 'bg-white/5 backdrop-blur-sm border-white/10' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                <h3 className={`text-base font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Colors
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className={`text-sm font-medium mb-2 block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Fill Color
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={fillColor}
                        onChange={changeFillColor}
                        className="w-12 h-12 rounded-lg cursor-pointer border-2 border-white/10"
                      />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {fillColor}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className={`text-sm font-medium mb-2 block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Stroke Color
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={strokeColor}
                        onChange={changeStrokeColor}
                        className="w-12 h-12 rounded-lg cursor-pointer border-2 border-white/10"
                      />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {strokeColor}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className={`text-sm font-medium mb-2 block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Background
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={changeBgColor}
                        className="w-12 h-12 rounded-lg cursor-pointer border-2 border-white/10"
                      />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {bgColor}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${theme === 'dark' ? 'bg-white/5 backdrop-blur-sm border-white/10' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
              <div className="mb-4 flex items-center justify-between flex-wrap gap-4">
                <h2 className={`text-lg font-semibold flex items-center space-x-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <Palette className="h-5 w-5 text-purple-400" />
                  <span>Canvas</span>
                </h2>
              </div>

              <div className={`border-2 rounded-xl overflow-auto flex items-center justify-center ${
                theme === 'dark'
                  ? 'border-white/10 bg-white/5 backdrop-blur-sm'
                  : 'border-gray-200 bg-gray-50'
              }`} style={{ maxHeight: '600px' }}>
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
                  Object Controls
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={duplicateSelected}
                    disabled={!ready}
                    className={`w-full px-4 py-3 rounded-xl transition-all flex items-center space-x-3 disabled:opacity-50 ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 hover:bg-white/10'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    } border`}
                  >
                    <Copy className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Duplicate</span>
                  </button>

                  <button
                    onClick={bringForward}
                    disabled={!ready}
                    className={`w-full px-4 py-3 rounded-xl transition-all flex items-center space-x-3 disabled:opacity-50 ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 hover:bg-white/10'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    } border`}
                  >
                    <ArrowUp className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Bring Forward</span>
                  </button>

                  <button
                    onClick={sendBackward}
                    disabled={!ready}
                    className={`w-full px-4 py-3 rounded-xl transition-all flex items-center space-x-3 disabled:opacity-50 ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 hover:bg-white/10'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    } border`}
                  >
                    <ArrowDown className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Send Backward</span>
                  </button>

                  <button
                    onClick={deleteSelected}
                    disabled={!ready}
                    className={`w-full px-4 py-3 rounded-xl transition-all flex items-center space-x-3 disabled:opacity-50 ${
                      theme === 'dark'
                        ? 'bg-red-500/10 border-red-500/20 hover:bg-red-500/20'
                        : 'bg-red-50 border-red-200 hover:bg-red-100'
                    } border`}
                  >
                    <Trash2 className={`h-5 w-5 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>Delete</span>
                  </button>

                  <button
                    onClick={clearCanvas}
                    disabled={!ready}
                    className={`w-full px-4 py-3 rounded-xl transition-all flex items-center space-x-3 disabled:opacity-50 ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 hover:bg-white/10'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    } border`}
                  >
                    <Trash2 className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Clear All</span>
                  </button>
                </div>
              </div>

              <div className={`${theme === 'dark' ? 'bg-white/5 backdrop-blur-sm border-white/10' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                <h3 className={`text-base font-semibold mb-4 flex items-center space-x-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <Download className="h-5 w-5 text-purple-400" />
                  <span>Export</span>
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={downloadPNG}
                    disabled={!ready}
                    className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-pink-500/50 disabled:opacity-50 transition-all"
                  >
                    PNG
                  </button>
                  <button
                    onClick={downloadJPEG}
                    disabled={!ready}
                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 transition-all"
                  >
                    JPEG
                  </button>
                  <button
                    onClick={downloadPDF}
                    disabled={!ready}
                    className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/50 disabled:opacity-50 transition-all"
                  >
                    PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/50'
                      : theme === 'dark'
                        ? 'bg-white/5 text-gray-400 hover:bg-white/10'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredTemplates.map((template) => {
                const Icon = template.icon
                return (
                  <button
                    key={template.id}
                    onClick={() => loadTemplate(template)}
                    className={`group rounded-2xl border p-6 hover:scale-[1.02] transition-all cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10'
                        : 'bg-white border-gray-200 hover:shadow-lg'
                    }`}
                  >
                    <div className={`bg-gradient-to-br ${template.color} p-4 rounded-xl w-full aspect-square flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <Icon className="h-12 w-12 text-white" />
                    </div>
                    <h3 className={`text-sm font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {template.name}
                    </h3>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {template.width} × {template.height}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
