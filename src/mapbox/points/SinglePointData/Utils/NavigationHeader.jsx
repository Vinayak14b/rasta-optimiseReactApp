import { pointDetailIcons } from '../../../../assets/IconArray'

const NavigationHeader = () => {
  return (
    <div className='flex justify-between px-6 py-2 mt-3' >
      <div className='flex gap-2 '>
        <div> <img src={pointDetailIcons.pointprev} alt=""
        className="w-6 h-6 cursor-pointer" /> </div>
        <div> <img src={pointDetailIcons.pointnext} alt=""
        className="w-6 h-6 cursor-pointer" /> </div>
        <div> <img src={pointDetailIcons.pointplay} alt="" className="w-6 h-6 cursor-pointer" /> </div>
         
      </div>
      <div className='flex gap-2'>
        <div> <img src={pointDetailIcons.pointcomment} alt=""  className="w-6 h-6 cursor-pointer"/> </div>
        <div> <img src={pointDetailIcons.pointgooglemap} alt="" className="w-6 h-6 cursor-pointer" /> </div>
        <div> <img src={pointDetailIcons.pointfullscreen} alt="" className="w-6 h-6 cursor-pointer" /> </div>
        <div> <img src={pointDetailIcons.pointmaximize} alt=""  className="w-6 h-6 cursor-pointer"/> </div>
         
      </div>
 
    </div>
  )
}

export default NavigationHeader
