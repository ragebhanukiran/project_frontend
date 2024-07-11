import { useContext, useState, useLayoutEffect, useRef } from "react";
import { Howl } from "howler";
import { Icon } from "@iconify/react";
import IconText from "../components/shared/IconText";
import songContext from "../contexts/songContext";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import { Link } from "react-router-dom";

const LoggedInContainer = ({ children, curActiveScreen }) => {
  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);

  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(songContext);

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (!currentSong) {
      return;
    }
    changeSong(currentSong.track);
  }, [currentSong && currentSong.track]);

  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong?._id;

    const payload = { playlistId, songId };
    const response = await makeAuthenticatedPOSTRequest(
      "/playlist/add/song",
      payload
    );
    if (response._id) {
      setAddToPlaylistModalOpen(false);
    }
  };

  const playSound = () => {
    if (!soundPlayed) {
      return;
    }
    soundPlayed.play();
  };

  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  const pauseSound = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound();
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };

  return (
    <div className="vh-100 vw-100 bg-black">
      {createPlaylistModalOpen && (
        <CreatePlaylistModal
          closeModal={() => {
            setCreatePlaylistModalOpen(false);
          }}
        />
      )}
      {addToPlaylistModalOpen && (
        <AddToPlaylistModal
          closeModal={() => {
            setAddToPlaylistModalOpen(false);
          }}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}
      <div className="h-100 w-100 d-flex">
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
                active={curActiveScreen === "myMusic"}
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

        {/* Main content */}
        <div className="vw-75 h-100 bg-dark p-3 overflow-auto" style={{width: "75%"}}>
          <div className="content p-2 pt-3 overflow-auto">{children}</div>
        </div>
      </div>

      {/* Current playing song */}
      <div
        className="fixed-bottom w-100 bg-black d-flex align-items-center"
        style={{ height: "11.1%" }}
      >
{currentSong && (
  <div className="w-100 bg-black text-white d-flex align-items-center justify-content-between" style={{marginleft:"50px"}}>
    <div className="col-3 d-flex align-items-center text-white justify-content-start">
      <img
        src={currentSong.thumbnail}
        alt="currentSongThumbnail"
        className="img-fluid rounded"
        style={{ height: "56px", width: "56px" }}
      />
      <div className="px-3">
        <div className="text-white font-weight-bold cursor-pointer">
          {currentSong.name}
        </div>
        <div className="text-secondary cursor-pointer">
          {`${currentSong.artist.firstName} ${currentSong.artist.lastName}`}
        </div>
      </div>
    </div>
    <div className="col-4 d-flex justify-content-center align-items-center">
      <Icon
        icon="ph:shuffle-fill"
        fontSize={30}
        className="cursor-pointer text-gray mx-2"
      />
      <Icon
        icon="mdi:skip-previous-outline"
        fontSize={30}
        className="cursor-pointer text-gray mx-2"
      />
      <Icon
        icon={isPaused? "ic:baseline-play-circle" : "ic:baseline-pause-circle"}
        fontSize={50}
        className="cursor-pointer text-gray-500 hover:text-white mx-2"
        onClick={togglePlayPause}
      />
      <Icon
        icon="mdi:skip-next-outline"
        fontSize={30}
        className="cursor-pointer text-gray-500 hover:text-white mx-2"
      />
      <Icon
        icon="ic:twotone-repeat"
        fontSize={30}
        className="cursor-pointer text-white mx-2"
      />
    </div>
    <div className="w-25 d-flex justify-content-end align-items-center">
      <input type="range" className="form-control-range w-75 mx-3" />
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default LoggedInContainer;
