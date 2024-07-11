import {useState} from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import {Icon} from "@iconify/react";
import {makeAuthenticatedGETRequest} from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";

const SearchPage = () => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [songData, setSongData] = useState([]);

    const searchSong = async () => {
        // This function will call the search api
        const response = await makeAuthenticatedGETRequest(
            "/song/get/songname/" + searchText
        );
        setSongData(response.data);
    };

    return (
        <LoggedInContainer curActiveScreen="search">
            <div className="vw-100 vh-100">
                <div
                    className={`w-25 p-3 fs-6 rounded-pill bg-dark px-5 d-flex text-white align-items-center ${
                        isInputFocused ? "border border-white" : ""
                    }`}
                >
                    <Icon icon="ic:outline-search" className="fs-4" />
                    <input
                        type="text"
                        placeholder="What do you want to listen to?"
                        className="w-100 bg-secondary "
                        onFocus={() => {
                            setIsInputFocused(true);
                        }}
                        onBlur={() => {
                            setIsInputFocused(false);
                        }}
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                searchSong();
                            }
                        }}
                    />
                </div>
                {songData.length > 0 ? (
                    <div className="pt-5">
                        <div className="text-white mb-3">
                            Showing search results for
                            <span className="fw-bold"> {searchText}</span>
                        </div>
                        {songData.map((item) => {
                            return (
                                <SingleSongCard
                                    info={item}
                                    key={JSON.stringify(item)}
                                    playSound={() => {}}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-secondary pt-5">
                        Nothing to show here.
                    </div>
                )}
            </div>
        </LoggedInContainer>
    );
};

export default SearchPage;