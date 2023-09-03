import { Modal, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { checkPassword } from "../firebase"

export default function AdminPassword() {
    const [pass, setPass] = useState("");
    const [show, setShow] = useState(true);

    const navigate = useNavigate();

    return (
        <>
            <Modal
                show={show}
            >
                <Modal.Header>
                    <Modal.Title>Admin Password</Modal.Title>
                    <button 
                        type="button" 
                        className="btn-close"
                        onClick={() => {
                            navigate("/");
                        }}
                    ></button>
                </Modal.Header>
                <Modal.Body>
                    <label
                        style={{fontSize: 22, fontWeight: 500}}
                    >
                    Password:
                    </label>
                    <input
                        type="password"
                        name="name"
                        style={{marginLeft: "10px"}}
                        onChange={(e) => {
                            setPass(e.target.value);
                        }}
                    />
                    <Button
                        style={{marginLeft: "10px"}}
                        onClick={() => {
                            checkPassword(pass).then(val => setShow(!val));
                        }}
                    >
                    ✓
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    )
}