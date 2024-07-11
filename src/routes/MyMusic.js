import {useState, useEffect} from "react";
import SingleSongCard from "../components/shared/SingleSongCard";
import {makeAuthenticatedGETRequest} from "../utils/serverHelpers";
import LoggedInContainer from "../containers/LoggedInContainer";

const MyMusic = () => {
    const [songData, setSongData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/song/get/mysongs"
            );
            setSongData(response.data);
        };
        getData();
    }, []);

    return (
        <LoggedInContainer curActiveScreen="myMusic">
            <div className="text-white fs-1 fw-bold pb-4 pl-2 pt-8">
                My Songs
            </div>
            <div className="my-3 overflow-auto">
  {songData.map((item) => {
    return (
      <div key={item.id}>
        <SingleSongCard info={item} playSound={() => {}}  />
        <button
          style={{ backgroundColor: 'red', color: 'white' }}
          className="btn btn-sm"
        >
          Delete
        </button>
      </div>
    );
  })}
</div>
        </LoggedInContainer>
    );
};

export default MyMusic;