
import { useEffect, useState } from "react";
import { useFetch } from "../useFetch";
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { ToggleableSidebar } from "../components/ToggleableSidebar";
import { baseUrl } from "../api";


export default function PageLayout({children}) {
    const [toggleBtnStatus, setToggleBtnStatus] = useState(false);

    const userEmail = sessionStorage.getItem("email");
    const {data, fetchData} = useFetch(`${baseUrl}/users/${userEmail}`);

    const userDetails = JSON.parse(sessionStorage.getItem("data"));
    
    useEffect(() => {
        if (!userDetails) {
            fetchData();
        }
    }, []);

    if (data) {
        sessionStorage.setItem("data", JSON.stringify(data));
    }

    function handleMenuClick() {
        setToggleBtnStatus(!toggleBtnStatus)
    }

    return (
        <div className="row">
            <div className="col-md-2 position-fixed border top-0 start-0 bottom-0 h-100 bg-light">
                <div className="d-none d-md-block">
                    <Sidebar data={userDetails || data} />
                </div>
                <div className="d-block d-md-none">
                    <ToggleableSidebar data={userDetails || data} toggleBtnStatus={toggleBtnStatus} setToggleBtnStatus={setToggleBtnStatus} handleMenuClick={handleMenuClick} />
                </div>
            </div>
            <div className="col-md-10 offset-md-2 py-1">
                <div className="row align-items-center">
                    <div className="col-4">
                        <button className="btn d-block d-md-none" type="button">
                            <GiHamburgerMenu size="2em" onClick={handleMenuClick}/>
                        </button>
                    </div>
                    <div className="col-4">
                        <div className="fw-bold fs-2 d-flex align-items-center text-decoration-none">
                            <span className="" style={{color: "#8D5F8C"}}>work</span>
                            <span className="" style={{color: "#8D5F8C"}}>asana</span> 
                        </div>
                    </div>
                </div>
                <div className="py-4">
                    {children}
                </div>
            </div>
        </div>
    );
}