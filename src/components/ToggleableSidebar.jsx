
import Sidebar from "../components/Sidebar";
import { CgProfile } from "react-icons/cg";


export function ToggleableSidebar({toggleBtnStatus, handleMenuClick}) {
    return (
        <div className={`bg-light offcanvas offcanvas-start w-75 ${ toggleBtnStatus && "show"}`} tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header ps-4">
            <div className="fw-bold fs-2 d-block d-md-none" style={{color: "#8D5F8C"}}>Workasana</div>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleMenuClick}></button>
        </div>
        <div className="offcanvas-body">
            <div>
                <Sidebar />
            </div>
        </div>
        </div>
    );
}