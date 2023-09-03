import { Modal, Button } from "react-bootstrap";
import { 
    setHours,
    setVolunteerHours,
    setName,
    getAllUsers,
 } from "../firebase";

export default function EditUser({ user, setEditUser, saveUser }) {

    const save = (newName, newHours, newVolunteerHours) => {
        setName(user, newName);
        setHours(user, newHours);
        setVolunteerHours(user, newVolunteerHours);

        saveUser({name: newName, hours: Number(newHours), volunteer: Number(newVolunteerHours), meetings: user.meetings});

        setEditUser({});
    }

    return (
        <>
            <Modal
                show={user.name}
            >
                <Modal.Header>
                    <Modal.Title>Edit User - {user.name}</Modal.Title>
                    <button 
                        type="button" 
                        className="btn-close"
                        onClick={() => {
                            setEditUser({});
                        }}
                    ></button>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label
                            style={{fontSize: 22, fontWeight: 500}}
                        >
                        Name:
                        </label>
                        <input
                            name="name"
                            style={{marginLeft: "10px", float: "right"}}
                            defaultValue={user.name}
                        />
                    </div>
                    <div>
                        <label
                            style={{fontSize: 22, fontWeight: 500}}
                        >
                        Hours:
                        </label>
                        <input
                            name="name"
                            style={{marginLeft: "10px", float: "right"}}
                            defaultValue={user.hours}
                        />
                    </div>
                    <div>
                        <label
                            style={{fontSize: 22, fontWeight: 500}}
                        >
                        Volunteer Hours:
                        </label>
                        <input
                            name="name"
                            style={{marginLeft: "10px", float: "right"}}
                            defaultValue={user.volunteer}
                        />
                    </div>
                    <div>
                        <Button style={{marginTop: "1em", float: "right"}} onClick={(e) => save(e.target.parentNode.parentNode.children[0].children[1].value, e.target.parentNode.parentNode.children[1].children[1].value, e.target.parentNode.parentNode.children[2].children[1].value)}>
                            Save Changes
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}