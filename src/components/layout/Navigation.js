import React from 'react'
import {Link} from 'react-router-dom';
import { RiUserLine } from 'react-icons/ri';
import { BiLogIn } from 'react-icons/bi';


const Navigation = () => {

    return (
        <div className="header__navigation">
            <ul>
                <Link to="/login"><li className=""><BiLogIn /></li></Link>
                <Link to="/userpage"><li className=""><RiUserLine /></li></Link>
            </ul>
        </div>
    )
}

export default Navigation;