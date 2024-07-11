import {openUploadWidget} from "../../utils/CloudinaryService";

const CloudinaryUpload = ({setUrl, setName}) => {
    const uploadImageWidget = () => {
        let myUploadWidget = openUploadWidget(
            {
                cloudName: "dtyjnzqrw",
                uploadPreset: "va4ohmto",
                sources: ["local"],
            },
            function (error, result) {
                if (!error && result.event === "success") {
                    setUrl(result.info.secure_url);
                    setName(result.info.original_filename);
                } else {
                    if (error) {
                        console.log(error);
                    }
                }
            }
        );
        myUploadWidget.open();
    };

    return (
        <button className="bg-white text-black  rounded p-4 fw-bold" onClick={uploadImageWidget}>Select Track</button>
    );
};

export default CloudinaryUpload;