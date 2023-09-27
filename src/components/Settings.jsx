import { Modal, Button } from "react-bootstrap"
import {
    getMaxHours,
    setSettings,
} from "../firebase";
import { useEffect, useState } from "react";

export default function Settings({visible, setSettingsVisible}) {

    const [maxHours, setMaxHours] = useState(4);

    useEffect(() => {
        getMaxHours().then(setMaxHours);
    }, []);

    const save = (maxHours) => {
        setSettings(maxHours);
    }

    return (
        <>
            <Modal
                show={visible}
            >
                <Modal.Header>
                    <Modal.Title>Settings</Modal.Title>
                    <button 
                        type="button" 
                        className="btn-close"
                        onClick={() => {
                            setSettingsVisible(false);
                        }}
                    ></button>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label
                            style={{fontSize: 22, fontWeight: 500}}
                        >
                        Max Hours:
                        </label>
                        <input
                            name="name"
                            style={{marginLeft: "10px", float: "right"}}
                            defaultValue={maxHours}
                            id="max-hours"
                        />
                    </div>
                    <div>
                        <Button
                            variant="success" 
                            style={{marginTop: "1em", float: "right"}}
                            onClick={() => {
                                setSettingsVisible(false);
                                
                                save(document.getElementById("max-hours").value);
                            }}
                        >
                            Save
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}