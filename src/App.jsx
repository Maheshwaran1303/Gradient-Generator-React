import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  const [num, setNum] = useState(12)
  const [type, setType] = useState("linear")
  const [gradients, setGradients] = useState([])
  
  const getHexColorCode = () => {
    const rgb = 255 * 255 * 255
    const random = Math.random() * rgb
    const int = Math.floor(random)
    const hexCode = int.toString(16)
    const colorHex = hexCode.padEnd(6,"0")
    return `#${colorHex}`
  }

  const generateGradient = () => {
    const colors = []
    for(let i = 0; i < num; i++) {
      const degree = Math.floor(Math.random() * 360)
      const color1 = getHexColorCode()
      const color2 = getHexColorCode()
      const degreeString = `${degree}deg`

      if (type === 'linear') {
        colors.push({
          gradient: `linear-gradient(${degreeString}, ${color1}, ${color2})`,
          css: `background: linear-gradient(${degreeString}, ${color1}, ${color2});`,
        })
      } else {
        colors.push({
          gradient: `radial-gradient(circle, ${color1}, ${color2})`,
          css: `background: radial-gradient(circle, ${color1}, ${color2});`,
        })
      }
    }
    setGradients(colors)
  }

  const onCopy = (css) => {
    navigator.clipboard.writeText(css)
    toast.success("Gradient code copied", {position: 'top-center'})
  }

  useEffect(() => {
    generateGradient()
  }, [num, type])

  return (
    <div className="min-h-screen bg-white py-6 px-4 sm:py-12 sm:px-0">
      <div className="w-full max-w-6xl mx-auto space-y-6 md:space-y-8">
        {/* Header section with responsive layout */}
        <div 
          className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6 rounded-xl gap-4"
          style={{ background: getHexColorCode() }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center md:text-left">🎨 Gradient Generator</h1>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="flex gap-3">
              <input 
                className="border border-slate-300 rounded-lg p-2 w-20 flex-1"
                placeholder="12"
                type="number"
                min="1"
                max="50"
                value={num}
                onChange={(e) => {
                  const value = Math.min(50, Math.max(1, Number(e.target.value)));
                  setNum(value || 1)
                }}
              />
              <select 
                className="border border-slate-300 rounded-lg p-2 flex-1"
                value={type} 
                onChange={(e) => setType(e.target.value)}
              >
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
              </select>
            </div>
            
            <button
              className="bg-rose-500 px-4 py-2 rounded-lg text-white font-medium whitespace-nowrap"
              onClick={generateGradient}
            >
              Generate
            </button>
          </div>
        </div>

        {/* Gradient grid with responsive columns */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {gradients.map((item, index) => (
            <div
              key={index}
              className="h-40 sm:h-48 md:h-52 rounded-xl relative overflow-hidden group"
              style={{ background: item.gradient }}
            >
              <button
                className="bg-black/80 hover:bg-black text-white rounded absolute right-2 bottom-2 py-1 px-2 text-xs transition-opacity opacity-90 group-hover:opacity-100"
                onClick={() => onCopy(item.css)}
              >
                Copy CSS
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App