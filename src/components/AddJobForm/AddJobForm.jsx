import { useState } from 'react'
import { useNavigate } from 'react-router'
import * as jobService from '../../services/jobService'

const AddJobForm = ({ addJob }) => {
    const navigate = useNavigate()

    const [formState, setFormState] = useState({
        title: '', description: '', company: ''
    })

    const handleChange = (evt) => {
        setFormState({ ...formState, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = async (evt) => {
        try {
            evt.preventDefault()

            const newJob = await jobService.create(formState)

            if (newJob) {
                console.log("Added new job")
                addJob(newJob)
                navigate('/')
            }
        } catch (err) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Add Job</h1>

            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input required name="title" value={formState.title} onChange={handleChange} />

                <label>Description</label>
                <textarea required name="description" value={formState.description} onChange={handleChange} />

                <label>Company</label>
                <input required name="company" value={formState.company} onChange={handleChange} />

                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default AddJobForm
