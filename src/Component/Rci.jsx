
const RCI = () => {
  return (
    <div className="w-466 h-full flex z-30"> {/* Use flex to display Sidebar and RCI side by side */}
    <div className="w-full h-100 bg-orange text-white text-center relative" style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, lineHeight: '19px', letterSpacing: '0em', textAlign: 'left' }}>
      <div className="mt-4 w-full h-177 relative">
        <img src="your-image-url" alt="Image" className="w-full h-full" />
        
        {/* Smaller Image */}
        <img src="your-smaller-image-url" alt="Smaller Image" className="absolute w-55.5 h-12 top-399 left-998" />

        {/* Buttons */}
        <div className="absolute flex flex-row">
          {/* First Button */}
          <button className="w-182 h-73 top-439 left-998 bg-orange text-white rounded-lg mr-4">
            861 M
          </button>

          {/* Second Button */}
          <button className="w-182 h-73 top-439 left-1197 bg-gray-300 rounded-lg">
            Length
          </button>
        </div>

        {/* Icons and Text */}
        <div className="absolute top-0 left-0 mt-4 flex flex-row">
          {/* First Column (Icons) */}
          <div className="flex flex-col items-center mr-4">
            {/* Add your small icons here */}
            <img src="icon1-url" alt="Icon 1" className="w-24 h-24 mb-2" />
            <img src="icon2-url" alt="Icon 2" className="w-24 h-24" />
          </div>

          {/* Divider Line */}
          <div className="border-b border-black mx-4 h-24"></div>

          {/* Second Column (Text) */}
          <div>
            <p style={{ fontSize: '12px', fontWeight: 600, lineHeight: '15px', letterSpacing: '0em', textAlign: 'left' }}>Text for the first row</p>
            <p style={{ fontSize: '12px', fontWeight: 600, lineHeight: '15px', letterSpacing: '0em', textAlign: 'left' }}>Text for the second row</p>
          </div>
        </div>
      </div>
    </div>
  </div>  )
}

export default RCI