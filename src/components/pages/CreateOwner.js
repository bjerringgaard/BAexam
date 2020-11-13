import React from 'react'

export default function CreateOwner() {
    return (
        <div>
            
            <form className="create-owner">
                <h1>Create Owner Component</h1>
                <div class="grid-container">
                    <div class="grid-x grid-padding-x">
                        <div class="medium-6 cell">
                            <label>
                            Name:
                            <input type="text" name="name" />
                            </label>
                        </div>
                        <div class="medium-6 cell">
                            <label>
                            Name:
                            <input type="text" name="name" />
                            </label>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
