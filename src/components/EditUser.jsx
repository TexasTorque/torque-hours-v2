import { Modal, Button } from "react-bootstrap";
import { 
    setStats,
} from "../firebase";

export default function EditUser({ user, setEditUser, saveUser }) {

    const save = (newName, newHours, newVolunteerHours, newMeetings, newGraduation) => {
        let meetings;
        if (newMeetings === "") {
            meetings = [];
        } else {
            meetings = newMeetings.split(", ");
        }
        setStats(user, newName, Number(newHours), Number(newVolunteerHours), meetings, Number(newGraduation));

        saveUser({name: newName, hours: Number(newHours), volunteer: Number(newVolunteerHours), meetings: meetings, uid: user.uid, graduation: user.graduation});
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
                            id="username"
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
                            id="hours"
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
                            id="volunteer"
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
                            id="meetings"
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
                            id="graduation"
                        />
                    </div>
                    <div>
                        <Button variant="success" style={{marginTop: "1em", float: "right"}} onClick={(e) => save(
                                    document.getElementById("username").value,
                                    document.getElementById("hours").value,
                                    document.getElementById("volunteer").value,
                                    document.getElementById("meetings").value,
                                    document.getElementById("graduation").value
                                )
                            }>
                            Save
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}