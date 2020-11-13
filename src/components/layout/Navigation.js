import React from 'react'
import {Link} from 'react-router-dom';

const Navigation = () => {
    return (
    <div className="grey">
        <div className="grid-container">
            <div className="grid-x ">
                <div className="cell small-6 red">
                </div>
                <div className="cell small-6 blue">
                    <nav>
                        <ul>
                            <Link to="/"><li className="">Home</li></Link>
                            <Link to="/login"><li className="">Login</li></Link>
                            <Link to="/signup"><li className="">SignUp</li></Link>
                            <Link to="/admin"><li className="">Admin</li></Link>
                            <Link to="/userpage"><li className="">User Page</li></Link>
                            <Link to="/ownerpage"><li className="">Owner Page</li></Link>
                            <Link to="/testpage"><li className="">Test Page</li></Link>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Navigation;