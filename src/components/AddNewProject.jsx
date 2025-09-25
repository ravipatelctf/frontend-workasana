
import { useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../api";
import { useFetchPost } from "../useFetchPost";

export function AddNewProject({setReferesh, handleShowAddNewProject}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const {postData, error} = useFetchPost(`${baseUrl}/projects`);

    function handleFormCancel() {
        setName("");
        setDescription("");
        handleShowAddNewProject(false)
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        if (!name || !description) {
            return;
        }

        toast.info("Creating Project...");
        const payload = {"name": name, "description": description};

        try {
            await postData(payload);
            setReferesh((pv) => pv + 1);
            setName("");
            setDescription("");
            handleShowAddNewProject(false);   
        } catch (error) {
            console.error("Failed to create project.")
        }
    }

    return (
        <div>
        {/* Backdrop */}
        <div className="modal-backdrop fade show"></div>

        {/* Modal */}
        <div className="modal show d-block">
        <div className="modal-dialog modal-dialog-centered">  
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Create New Project</h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => handleShowAddNewProject(false)}></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleFormSubmit}>
                        <label htmlFor="name" className="form-label">Project Name</label>
                        <input 
                            type="text"
                            required
                            value={name}
                            placeholder="Enter Project Name"
                            onChange={(e) => setName(e.target.value)}
                            className="form-control mb-3" />
                        <label htmlFor="description" className="form-label">Project Description</label>
                        <textarea 
                            type="text"
                            required
                            value={description}
                            placeholder="Enter Project Description"
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-control mb-3" >
                        </textarea>
                    
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary fw-bold" onClick={handleFormCancel}>Cancel</button>
                            <button type="submit" className="btn btn-primary fw-bold">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
}