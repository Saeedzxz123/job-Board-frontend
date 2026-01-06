import { useEffect, useContext, useState } from 'react'
import { Routes, Route } from 'react-router'

import * as jobService from './services/jobService'

import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import SignInForm from './components/SignInForm/SignInForm'
import Landing from './components/Landing/Landing'
import Dashboard from './components/Dashboard/Dashboard'
import AddJobForm from './components/AddJobForm/AddJobForm'

import { UserContext } from './contexts/UserContext'
import JobDetails from './components/JobDetails/JobDetails'
import EditJobForm from './components/EditJobForm/EditJobForm'

const App = () => {
  // Access the user object from UserContext
  // This gives us the currently logged-in user's information (username, email) that we extract from the token
  const { user } = useContext(UserContext)
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    if (!user) return

    const getAllJobs = async () => {
      try {
        const jobs = await jobService.index()
        setJobs(jobs)
      } catch (error) {
        console.log(error)
      }
    }

    getAllJobs()
  }, [user])

  const addJob = (job) => {
    setJobs([...jobs, job])
  }

  return (
    <>
      <NavBar />
      <Routes>
        {/* if the user is logged in we have the user object else we have the user set to null */}
        <Route path="/" element={user ? <Dashboard jobs={jobs} /> : <Landing />}/>
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/add-new-job" element={<AddJobForm addJob={addJob} />}/>
        <Route path="/jobs/:id" element= {<JobDetails />} />
        <Route path="jobs/:id/edit" element={<EditJobForm />}></Route>
      </Routes>
    </>
  )
}

export default App
