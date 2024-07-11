import {useContext} from "react";
import songContext from "../../contexts/songContext";

const SingleSongCard = ({info, playSound}) => {
    const {currentSong, setCurrentSong} = useContext(songContext);

    return (
        <div
            className="d-flex hover:bg-secondary hover:bg-opacity-20 p-2 rounded"
            onClick={() => {
                playSound(info.track);
                setCurrentSong(info)
            }}
        >
            <div
                className="m-2 d-flex align-items-center"
                style={{
                    width : "60px", height:"60px",
                    backgroundImage: `url(${info.thumbnail})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", borderRadius: "10px" 
                }}
            ></div>
            <div className="flex w-100 text-white p-1">
                <div className=" flex justify-content-center  flex-col pl-4 ">
                    <div className="">
                        {info.name}
                    </div>
                    <div className="ts-4 text-white ">
                        {info.artist.firstName + " " + info.artist.lastName}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleSongCard;