import {useState, useEffect} from "react";
import {makeAuthenticatedGETRequest} from "../utils/serverHelpers";

const AddToPlaylistModal = ({closeModal, addSongToPlaylist}) => {
    const [myPlaylists, setMyPlaylists] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/playlist/get/me"
            );
            setMyPlaylists(response.data);
        };
        getData();
    }, []);

    return (
        <div
            className="position-absolute bg-dark vw-100 vh-100 bg-opacity-50 d-flex justify-content-center align-items-center"
            onClick={closeModal}
        >
            <div
                className="bg-dark col-4 rounded p-5"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="text-white mb-5 fw-bold fs-4">
                    Select Playlist
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    {myPlaylists.map((item) => {
                        return (
                            <PlaylistListComponent
                                info={item}
                                addSongToPlaylist={addSongToPlaylist}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const PlaylistListComponent = ({info, addSongToPlaylist}) => {
    return (
        <div className="bg-dark w-100 d-flex align-items-center cursor-pointer p-3 hover-bg-gray-400" onClick={()=>{
            addSongToPlaylist(info._id)
        }}>
            <div>
                <img
                    src={info.thumbnail}
                    className="w-1 h-1 rounded"
                    alt="thumbnail"
                />
            </div>
            <div className="text-white fw-bold me-3">{info.name}</div>
        </div>
    );
};

export default AddToPlaylistModal;