import React from 'react'
import {Link} from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="header__navigation">
            <ul>
                <Link to="/login"><li className="">Login</li></Link>
                <Link to="/admin"><li className="">Admin</li></Link>
                <Link to="/userpage"><li className="">Dashboard</li></Link>
                <Link to="/testpage"><li className="">Test Page</li></Link>
            </ul>
        </div>
    )
}

export default Navigation;