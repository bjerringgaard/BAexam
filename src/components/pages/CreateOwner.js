import React from 'react'

export default function CreateOwner() {
    return (
        <div>
        <h1>Create Owner Component</h1>
            <form className="create-owner">
                
                <div class="grid-container">
                    <div class="grid-x grid-padding-x">
                        <div class="medium-6 cell">
                        <label className="create-owner__header">
                        <p>Virksomhed</p>
                            <input type="text" name="name" />
                            </label>
                        </div>
                        <div class="medium-6 cell">
                            <label className="create-owner__header">
                            <p>CVR</p>
                            <input type="text" name="name" />
                            </label>
                        </div>
                        <div class="medium-6 cell">
                            <label className="create-owner__header">
                            <p>Email</p>
                            <input type="text" name="name" />
                            </label>
                        </div>
                        <div class="medium-6 cell">
                            <label className="create-owner__header">
                            <p>Telefon Nr</p>
                            <input type="text" name="name" />
                            </label>
                        </div>
                        <div class="medium-6 cell">
                            <label className="create-owner__header">
                            <p>CVR</p>
                            <input type="text" name="name" />
                            </label>
                        </div>
                        <div class="medium-6 cell">
                            <label className="create-owner__header">
                            <p>Logo</p>
                            <input type="text" name="name" />
                            </label>
                        </div>
                    </div>
                    <div class="small-12 cell">
                    <button type="button" class="create-owner__succes">Tilføj Firma</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
