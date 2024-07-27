import DataCard from "./DataCard";

const DataSubComponent = () => {
    const initialCards = [
        { id: 1, imagePath: "icons/datanotes.png", text: "Total Distance Surveyed" },
        { id: 2, imagePath: "icons/datapath.png", text: "Total Potholes Found" },
        { id: 3, imagePath: "icons/tags.png", text: "Total Tags Assigned" },
        // Add more data for additional cards
      ];
  
    return (
      <>
        <div className="h-screen bg-white">
          <h3 className="text-black text-2xl font-bold mb-2 font-inter text-15 leading-18 tracking-normal text-left mx-5 my-2">
            Overview
          </h3>
  
          {initialCards.map((card) => (
            <a
              href="#"
              key={card.id} // Make sure to set a unique key for each card
              className="m-2 mt-6 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex flex-row justify-between p-4 leading-normal transform translateZ-0">
                <img src={card.imagePath} className="h-10 mx-auto " alt="icon" />
  
                <p className="text-[14px] mb-3 ml-5 text-[#75767A] font-inter text-xs font-semibold leading-3 tracking-wide text-left">
                  {card.text}
                </p>
              </div>
            </a>
          ))}
  
          <h2>BREAK-UP</h2>
          <DataCard
        imagePath="icons/97.png"
        title="Very Poor"
        content="Total Distance Surveyed :"
        bgColor="#FF0000" // Use Tailwind CSS color classes here
      />   <DataCard
      imagePath="icons/13.png"
      title="Poor"
      content="Total Distance Surveyed :"
      bgColor="#FE6100" // Use Tailwind CSS color classes here
    />   <DataCard
    imagePath="icons/07.png"
    title="Average "
    content="Total Distance Surveyed :"
    bgColor="#FFD100" // Use Tailwind CSS color classes here
  />   <DataCard
  imagePath="icons/01green.png"
  title="Good"
  content="Total Distance Surveyed :"
  bgColor="#A2E359" // Use Tailwind CSS color classes here
/>   <DataCard
        imagePath="icons/01.png"
        title="Excellent"
        content="Total Distance Surveyed :"
        bgColor="#4D6344" // Use Tailwind CSS color classes here
      />
        </div>
      </>
    );
  };
  
  export default DataSubComponent;
  