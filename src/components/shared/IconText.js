import {Icon} from "@iconify/react";
import {Link} from "react-router-dom";

const IconText = ({iconName, displayText, active, targetLink, onClick}) => {
    return (
        <Link to={targetLink} className="block" style={{textDecoration:"none"}}>
            <div
                className="d-flex align-items-center justify-content-start cursor-pointer"
                onClick={onClick}
            >
                <div className="px-5 py-2">
                    <Icon
                        icon={iconName}
                        color={active ? "white" : "secondary"}
                        fontSize={27}
                    />
                </div>
                <div
                    className={`${
                        active ? "text-white" : "text-secondary"
                    } ts-4 fw-bold hover:text-white`}
                >
                    {displayText}
                </div>
            </div>
        </Link>
    );
};

export default IconText;