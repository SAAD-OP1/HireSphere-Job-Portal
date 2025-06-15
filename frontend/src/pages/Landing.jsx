import { useEffect, useState } from 'react';
import '../pageStyles/Landing.css';

const Landing = () => {
  
  const [jobCount, setJobCount] = useState(0);
  const [seekerCount, setSeekerCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [jobsRes, seekersRes] = await Promise.all([
          fetch('http://localhost:3000/api/jobs/stats/jobs-count'),
          fetch('http://localhost:3000/api/employee/stats/employees-count')
        ]);

        const jobsData = await jobsRes.json();
        const seekersData = await seekersRes.json();

        setJobCount(jobsData.totalJobs || 0); 
      setSeekerCount(seekersData.totalEmployees || 0);
      } catch (error) {
        console.error('Failed to fetch stats', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="landing-container">
      <section className="intro">
        <h1>Welcome to JobConnect</h1>
        <p>Your one-stop destination to hire or get hired.</p>
      </section>

      <section className="stats-section">
        <div className="stat-card">
          <h2>{jobCount}+</h2>
          <p>Jobs Posted</p>
        </div>
        <div className="stat-card">
          <h2>{seekerCount}+</h2>
          <p>Job Seekers Registered</p>
        </div>
      </section>

      <section className="cta-section">
        <p>Join today and take your next step toward a better career or a better team.</p>
        <div className="cta-buttons">
          <a href="/signup" className="btn">Get Started</a>
          <a href="/signin" className="btn outline">Sign In</a>
        </div>
      </section>
    </div>
  );
};

export default Landing;
