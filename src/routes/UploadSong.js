import IconText from "../components/shared/IconText";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import TextInput from "../components/shared/TextInput";
import React, { useState } from "react";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";

const UploadSong = () => {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState("");
  const navigate = useNavigate();

  const submitSong = async () => {
    const data = { name, thumbnail, track: playlistUrl };
    console.log("Request payload:", data);
    const response = await makeAuthenticatedPOSTRequest("/song/create", data);
    console.log("Response:", response);
    if (response.err) {
      alert("Could not create song");
      return;
    }
    alert("Success");
    navigate("/home");
  };

  return (
    <div className="h-100 w-100 d-flex">
      {/* This will be my left panel */}
      <div className="vh-100  bg-black" style={{width:"31.5%"}}>
        <div className="fw-bold m-3 p-3 fs-1 bg-white rounded-pill d-flex justify-content-center font-sans-serif">
          RythymiQ
        </div>
        <div>
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
              targetLink={"/uploadSOng"}
              className="text-decoration-none"
            />
            <IconText iconName={"ph:heart-fill"} displayText={"Liked Songs"} />
          </div>
        </div>
      </div>
      <div className="vw-100 bg-dark vh-100 overflow-auto">
        <div className="content p-8 pt-0 overflow-auto">
          <div className="fw-bold fs-1 text-white p-4">Upload Song</div>

          <div className="w-50 d-flex mx-3">
            <div className="w-50 m-2">
              <TextInput
                label="Name"
                labelClassName={"text-white"}
                placeholder="Name"
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-50 m-2">
              <TextInput
                label="Thumbnail"
                labelClassName={"text-white"}
                placeholder="Thumbnail"
                value={thumbnail}
                setValue={setThumbnail}
              />
            </div>
          </div>
          <div className="p-3">
            {uploadedSongFileName ? (
              <div className="bg-white rounded-pill p-3 w-50 m-3">
                {uploadedSongFileName.substring(0, 35)}...
              </div>
            ) : (
              <CloudinaryUpload
                setUrl={setPlaylistUrl}
                setName={setUploadedSongFileName}
              />
            )}
          </div>
          <div
            className="bg-white w-50 d-flex align-items-center justify-content-center p-4 rounded-pill fw-bold cursor-pointer font-semibold m-4"
            onClick={submitSong}
          >
            Submit Song
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSong;
