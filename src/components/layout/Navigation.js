import React from 'react'
import {Link} from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="header__navigation">
            <ul>
                <Link to="/"><li className="">Home</li></Link>
                <Link to="/login"><li className="">Login</li></Link>
                <Link to="/signup"><li className="">SignUp</li></Link>
                <Link to="/admin"><li className="">Admin</li></Link>
                <Link to="/userpage"><li className="">User Page</li></Link>
                <Link to="/ownerpage"><li className="">Owner Page</li></Link>
                <Link to="/testpage"><li className="">Test Page</li></Link>
            </ul>
        </div>
    )
}

export default Navigation;