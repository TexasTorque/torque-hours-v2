import { useNavigate } from "react-router-dom";
import torque_logo from "../assets/torque_logo.png";

export default function Header() {

  const navigate = useNavigate();

  return (
    <div className="header" onClick={() => navigate("/")}>
      <div className="header-border-box">
        <img src={torque_logo} style={{ height: "3.5em", width: "3.5em" }}></img>
        <div>
          <h4 className="header-name">Torque Hours</h4>
          <p className="header-credit" onClick={() => document.location.replace("https://github.com/TexasTorque/torque-hours-v2/")}>Created by Davey</p>
        </div>
      </div>
    </div>
  );
}