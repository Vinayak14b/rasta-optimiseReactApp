import React from 'react'
import "../../CSS/preloader.css"
import { PreloaderImage } from "../../assets/IconArray"

const Preloader = () => {
  return (
    <div className="loaderr">
      <div className="logo-animation">
        <img data-aos="zoom-in" src={PreloaderImage.PreloaderImage} alt="1" />
      </div>
      <div className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Preloader
