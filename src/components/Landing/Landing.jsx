import { Link ,useNavigate} from "react-router";

const Landing = () => {
  const navigate = useNavigate()
  return (
    <main className="landing">
      <section className="hero">
        <div className="container">
          <h1>Find Your Next Career Opportunity</h1>
          <p>
            A modern job board for candidates and recruiters to connect efficiently
            and securely. Apply with your CV and track your applications.
          </p>

          <div className="actions">
 
                <button className="LABTN" onClick={() => navigate(`/sign-up`)}>get Started</button>
                <button className="LABTN" onClick={() => navigate(`/sign-in`)}>Sign in</button>

          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose Our Platform?</h2>

          <div className="grid">
            <div className="card">
              <h3>Quick Applications</h3>
              <p>Apply to jobs easily by uploading your CV directly.</p>
            </div>

            <div className="card">
              <h3>Recruiter Tools</h3>
              <p>Post jobs, manage listings, and review applicants.</p>
            </div>

            <div className="card">
              <h3>Secure Access</h3>
              <p>Role-based authentication for users and HR recruiters.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Create an account today and start applying to jobs instantly.</p>


        <button className="LABTN" onClick={() => navigate(`/sign-up`)}>Sign-up</button>

        </div>
      </section>
    </main>
  );
};

export default Landing;
