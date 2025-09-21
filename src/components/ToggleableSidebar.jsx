
import Sidebar from "../components/Sidebar";
import { CgProfile } from "react-icons/cg";


export function ToggleableSidebar({data, toggleBtnStatus, handleMenuClick}) {
    return (
        <div style={{backgroundColor: "#F5EFE6"}} className={`offcanvas offcanvas-start w-75 ${ toggleBtnStatus && "show"}`} tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header ps-4">
                <div className="fw-bold mb-1 text-danger text-decoration-none d-flex align-items-center gap-1">
                    <CgProfile style={{color: "#6D94C5"}} className="fs-3 text-secondary" />
                    <span style={{color: "#6D94C5"}} className="fw-bold fs-5 text-secondary">{data?.name}</span>
                </div>
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