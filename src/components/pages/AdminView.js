import React from 'react'
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiRefreshCw } from 'react-icons/fi';
import { BsPersonPlus } from 'react-icons/bs';

export default function AdminView() {
    return (
        <div>
        <div className="grid-x admin-panel">
        <div className="cell small-6 admin-panel__header">
            <div class="grid-x">
                <div className="cell small-6 admin-panel__text">Users</div>
                <div className="cell small-6 admin-panel__create"><BsPersonPlus /></div>
            </div>
        </div>
            <div className="cell small-6 admin-panel__header">
            <div class="grid-x">
                <div className="cell small-6 admin-panel__text">Owner</div>
                <div className="cell small-6 admin-panel__create"><BsPersonPlus /></div>
            </div>
            </div>
            <div className="grid-x admin-panel__content">
                <div className="cell small-6 admin-panel__owners">
                    <div className="grid-x admin-panel__information">
                        <div className="cell auto">Bruger 1</div>
                        <div className="cell auto icons"><RiDeleteBinLine /> <FiRefreshCw /></div>
                    </div>
                </div>
            <div className="cell small-6 admin-panel__users">
                <div className="grid-x admin-panel__information">
                    <div className="cell auto">Owner 1</div>
                    <div className="cell auto icons"><RiDeleteBinLine /> <FiRefreshCw /></div>
                </div>
                <div className="grid-x admin-panel__information">
                    <div className="cell auto">Owner 2</div>
                    <div className="cell auto icons"><RiDeleteBinLine /> <FiRefreshCw /></div>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}
