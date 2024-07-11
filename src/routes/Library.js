import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";

const Library = () => {
  const [myPlaylists, setMyPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/playlist/get/me");
        setMyPlaylists(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching playlists:", error);
        setError("Error fetching playlists. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <LoggedInContainer curActiveScreen={"library"}>
      <div className="text-white fs-3 pt-5 fw-bold">My Playlists</div>
      <div className="py-5">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <div className="row row-cols-5 g-4">
            {myPlaylists.map((item) => (
              <div className="col" key={JSON.stringify(item)}>
                <div className="card">
                  <img
                    src={item.thumbnail}
                    className="card-img-top"
                    alt={item.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    {/* Add description if needed */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </LoggedInContainer>
  );
};

export default Library;
