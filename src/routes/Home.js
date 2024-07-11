import IconText from "../components/shared/IconText";
import { Icon } from "@iconify/react";

const focusCardsData = [{          title : "peaceful piano",
    description:"Relax and indulge with beautiful piano",
    imgUrl : "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    {
        title:"Instrumental",
        description:"Best of Instrumental music",
        imgUrl :"https://images.unsplash.com/photo-1451226428352-cf66bf8a0317?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },{title:"Focus flow",
    description:"Best music to focus and study",
    imgUrl :"https://images.unsplash.com/photo-1581447109200-bf2769116351?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    {
        title:"beats to think to",
        description:"Focus with deep techno and techno house ",
        imgUrl : "https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  
    },{
        title:"Deep focus",
        description:"keep calm and focus with the music",
        imgUrl :"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }]
const recomendedPlaylistCardData = [{          title : "This is the one",
    description:"Relax and indulge with beautiful piano",
    imgUrl : "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    {
        title:"Instrumental",
        description:"Best of Instrumental music",
        imgUrl :"https://images.unsplash.com/photo-1451226428352-cf66bf8a0317?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },{title:"Focus flow",
    description:"Best music to focus and study",
    imgUrl :"https://images.unsplash.com/photo-1581447109200-bf2769116351?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    {
        title:"beats to think to",
        description:"Focus with deep techno and techno house ",
        imgUrl : "https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  
    },{
        title:"Deep focus",
        description:"keep calm and focus with the music",
        imgUrl :"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }]

const Home = () => {
  return (
    <div className="vh-100 vw-100 bg-black d-flex">
            {/* Left panel */}
        <div className="vh-100  bg-black" style={{width:"24%"}}>
          <div className="fw-bold m-3 p-3 fs-1 bg-white rounded-pill d-flex justify-content-center font-sans-serif">
            RythymiQ
          </div>
          <div >
            <IconText
              iconName={"teenyicons:home-solid"}
              displayText={"Home"}
              targetLink={"/home"}
              
            />
            <IconText
              iconName={"bi:search"}
              displayText={"Search"}
              targetLink={"/search"}
            />

            <div>
              <IconText
                iconName={"solar:library-line-duotone"}
                displayText={"Create Playlist"}
              />
              <IconText
                iconName={"material-symbols:library-music-sharp"}
                displayText={"My Music"}
                targetLink="/myMusic"
              />
              <IconText
                iconName={"material-symbols:library-music-sharp"}
                displayText={"Upload Song"}
                targetLink={"/uploadSong"}
                className="text-decoration-none"
              />
              <IconText
                iconName={"ph:heart-fill"}
                displayText={"Liked Songs"}
              />
            </div>
          </div>
        </div>


      {/* this will bw my right div */}
      <div className="vh-100 vw-75 bg-dark overflow-x-auto pt-0 m-3 ">
        <div className="content p-5 ">
          <PlaylistView titleText= "Focus" cardsData = {focusCardsData} />
          <PlaylistView titleText="Sound of India"cardsData = {recomendedPlaylistCardData} />
          <PlaylistView titleText="Recomended Playlist" cardsData = {focusCardsData}  />
        </div>
      </div>
    </div>
  );
};

const PlaylistView = ({titleText, cardsData}) => {
  return (
    <div className="text-white mt-3">
      <div className="fs-3 fw-bold mb-4">{titleText}</div>
      <div className="w-100 d-flex justify-content-between">
        {

            cardsData.map((item) =>{
                return <Card title={item.title} description={item.description}imgUrl={item.imgUrl}/>
            })

        }
      </div>
    </div>
  );
};

const Card = ({ title, description, imgUrl}) => {
  return (
    <div className="bg-black bg-opacity-10  col-2 px-2 py-1 rounded">
    <div className="py-4">
    <img
         className="w-100 rounded"
          src={imgUrl}
          alt="relaxing music image"
        />
    </div>
      <div className="text-white">{title}</div>
      <div className="text-secondary">{description}</div>
    </div>
  );
};


export default Home;
