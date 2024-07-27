
const LoadingScreen = () => {

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundImage: 'url(icons/signin-bg.png)',
       
        backgroundPosition: 'center',
        width: '100%', // Set width to 100%
        height: '100vh', // Set height to 100%
        
      }
    }
    >   
      <img
        src="icons/whitelogo-screen2.png" // replace with the actual path to your image
        alt=" "
        className="w-40 h-auto mb-[12%] object-cover rounded-t-md"
      />
       <img
        src="icons/loading GIF.gif" // replace with the actual path to your GIF
        alt=" "
        className="w-40 h-auto object-cover rounded-md"
        style={{ position: 'absolute', bottom: '21%',width:'40%'}}
      />
      <img
      src="icons/load bgwhite.png" // replace with the actual path to your GIF
      alt=" "
      className="w-40 h-auto object-cover rounded-md"
      style={{ position: 'absolute', bottom:' 27%',width:'50%'}}
    />
    </div>
  );
};

export default LoadingScreen;


