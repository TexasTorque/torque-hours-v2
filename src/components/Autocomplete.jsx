import { useState } from "react";
import "../index.css";

export default function Autocomplete({width, height, users, onClick}) {

    const [matches, setMatches] = useState([]);


    const inputUpdated = (e) => {
        const value = e.target.value;

        onClick(value);


        if (value == "") {
            setMatches([]);
        } else {
            let matches = [];

            users.forEach(val => {
                if (val.name.toLowerCase().includes(value.toLowerCase())) {
                    matches.push(val.name);
                }

                if (val.name.toLowerCase() == value.toLowerCase()) {
                    matches = [];
                }
            });
            setMatches(matches);
        }
    }

    const nameClicked = (name) => {
        document.getElementById("autocomplete").value = name;
        onClick(name);

        setMatches([]);
    }

    return (
        <>
            <div>
                <input id="autocomplete" type="text" style={{width: width, height: "35px"}} placeholder="Enter a user..." onChange={inputUpdated}/>
                <div style={{backgroundColor: "white", position: "fixed", width: width, borderRadius: "0px 0px 5px 5px", maxHeight: height, overflowY: "scroll"}}>
                    {
                        matches
                            .sort((a, b) => a.localeCompare(b))
                            .map((val, index) => (
                            <p 
                                style={{color: "black", margin: "0px"}} 
                                onClick={() => nameClicked(val)}
                                key={index}
                            >
                                {val}
                            </p>
                        ))
                    }
                </div>
            </div>
        </>
    )
}