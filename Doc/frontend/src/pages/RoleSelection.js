import '../css/RoleSelection.css'
import { Link } from "react-router-dom"


const RoleSelection = () => {
    console.log("Rendered!! Role selection")
    return (
        <div className="roleSelection">
            <h2 className='title'>Choose your role</h2>
            <div className="button-container">
                {/* show two buttons on the first page */}
                <Link to='/loginSignup'>
                    <button className="patientDocButton">DOCTOR</button>
                </Link>

                <Link to='/patientLogin'>
                    <button className="patientDocButton">PATIENT</button>
                </Link>

            </div>
        </div>
    )
}

export default RoleSelection

