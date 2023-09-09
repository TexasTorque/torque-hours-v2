import { Modal, Button } from "react-bootstrap";
import { 
    setStats,
    deleteUser,
 } from "../firebase";

export default function EditUser({ user, setEditUser, saveUser }) {

    const save = (newName, newHours, newVolunteerHours, newMeetings) => {
        setStats(user, Number(newName), Number(newHours), Number(newVolunteerHours), newMeetings.split(", "))

        saveUser({name: newName, hours: Number(newHours), volunteer: Number(newVolunteerHours), meetings: newMeetings.split(", "), uid: user.uid});
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
                        <label
                            style={{fontSize: 22, fontWeight: 500}}
                        >
                        Meetings Attended:
                        </label>
                        <input
                            name="name"
                            style={{marginLeft: "10px", float: "right"}}
                            defaultValue={String(user.meetings).replaceAll(",", ", ")}
                        />
                    </div>
                    <div>
                        <label
                            style={{fontSize: 22, fontWeight: 500}}
                        >
                        Graduation Year:
                        </label>
                        <input
                            name="name"
                            style={{marginLeft: "10px", float: "right"}}
                            defaultValue={user.graduation}
                        />
                    </div>
                    <div>
                        <Button variant="success" style={{marginTop: "1em", float: "right"}} onClick={(e) => save(e.target.parentNode.parentNode.children[0].children[1].value, e.target.parentNode.parentNode.children[1].children[1].value, e.target.parentNode.parentNode.children[2].children[1].value, e.target.parentNode.parentNode.children[3].children[1].value)}>
                            Save
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}