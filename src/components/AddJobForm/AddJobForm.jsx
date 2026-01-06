import React from 'react'

function AddJobForm() {
    return (
        <div>
            <h1>Add Job</h1>
            <form>
                <label htmlFor="title">Title: </label>
                <input required type="text" name="title" id="title" />
                <br />
                <br />
                <label htmlFor="description">Description: </label>
                <textarea required type="text" name="description" id="description"></textarea>
                <br />
                <br />
                <label htmlFor="company">Company: </label>
                <input required type="text" id="company" name="company" />
                <br />
                <br />
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default AddJobForm