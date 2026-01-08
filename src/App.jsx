import { useEffect, useContext, useState } from "react"
import { Routes, Route } from "react-router"

import * as jobService from "./services/jobService"

import NavBar from "./components/NavBar/NavBar"
import SignUpForm from "./components/SignUpForm/SignUpForm"
import SignInForm from "./components/SignInForm/SignInForm"
import Landing from "./components/Landing/Landing"
import Dashboard from "./components/Dashboard/Dashboard"
import AddJobForm from "./components/AddJobForm/AddJobForm"
import EditJobForm from './components/EditJobForm/EditJobForm'
import { UserContext } from "./contexts/UserContext"
import JobDetails from "./components/JobDetails/JobDetails"
import MyApplications from './components/MyApplications/MyApplications'
import HrJobs from './components/HrJobs/HrJobs'

const App = () => {

  const { user } = useContext(UserContext)
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    if (!user) return;

    const getAllJobs = async () => {
      try {
        const jobs = await jobService.index();
        setJobs(jobs);
      } catch (error) {
        console.log(error)
      }
    };

    getAllJobs()
  }, [user])

  const addJob = (job) => {
    setJobs([...jobs, job])
  };

  const deleteJob = (id) => {
    const newJobList = jobs.filter((job) => {
      return job._id !== id
    })

    

    setJobs(newJobList)
  }

    const updateOneJob = (updatedJob) => {
    const newUpdatedJob = jobs.map((oneJob) => {
      if (oneJob._id === updatedJob._id) {
        return updatedJob
      } else {
        return oneJob
      }
    })
    setJobs(newUpdatedJob)
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"  element={user ? <Dashboard jobs={jobs} /> : <Landing />}
        />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/add-new-job" element={<AddJobForm addJob={addJob} />} />
        <Route path="/jobs/:id" element={<JobDetails deleteJob={deleteJob} />} />
        <Route path="jobs/:id/edit" element={<EditJobForm updateOneJob={updateOneJob} />}></Route>
        <Route path="/my" element={<MyApplications />} />
        <Route path="/hr" element={<HrJobs />} />

      </Routes>
    </>
  );
};

export default App;
