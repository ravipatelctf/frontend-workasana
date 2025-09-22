
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { ToggleableSidebar } from "../components/ToggleableSidebar";
import { useNavigate } from "react-router-dom";


export default function PageLayout({children}) {
    const [toggleBtnStatus, setToggleBtnStatus] = useState(false);

    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
    }, [token]);

    if (!token) {
        return;
    }

    function handleMenuClick() {
        setToggleBtnStatus(!toggleBtnStatus)
    }
    
    return (
        <div className="row m-0">
            <div className="col-md-2 border">
                <div className="">
                    <div className="d-none d-md-block">
                        <Sidebar />
                    </div>
                    <div className="d-block d-md-none">
                        <ToggleableSidebar toggleBtnStatus={toggleBtnStatus} setToggleBtnStatus={setToggleBtnStatus} handleMenuClick={handleMenuClick} />
                    </div>
                </div>
            </div>
            <div className="col-md-10  py-1">
                <div className="row gap-3 align-items-center">
                    <div className="col-3">
                        <button className="btn d-block d-md-none" type="button">
                            <GiHamburgerMenu size="2em" onClick={handleMenuClick}/>
                        </button>
                    </div>
                    <div className="col-3 text-center fw-bold fs-2 d-block d-md-none" style={{color: "#8D5F8C"}}>Workasana</div>
                </div>
                <div className="row m-0 py-4">
                    {children}
                </div>
            </div>
        </div>
    );
}