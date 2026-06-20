// Handle form submission
const jobForm = document.getElementById('jobForm');
if (jobForm) {
  jobForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const location = document.getElementById('location').value;

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, location }),
      });

      if (response.ok) {
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = 'Job posted successfully!';
        messageDiv.className = 'message success';
        jobForm.reset();

        // Reload jobs after a short delay
        setTimeout(() => {
          loadRecentJobs();
          messageDiv.style.display = 'none';
        }, 2000);
      } else {
        throw new Error('Failed to post job');
      }
    } catch (error) {
      const messageDiv = document.getElementById('message');
      messageDiv.textContent = 'Error posting job: ' + error.message;
      messageDiv.className = 'message error';
    }
  });
}

// Load recent jobs on home page
async function loadRecentJobs() {
  try {
    const response = await fetch('/api/jobs');
    const jobs = await response.json();

    const jobsList = document.getElementById('jobsList');
    if (!jobsList) return;

    jobsList.innerHTML = '';

    if (jobs.length === 0) {
      jobsList.innerHTML = '<p>No jobs posted yet. Be the first!</p>';
      return;
    }

    // Show last 3 jobs
    const recentJobs = jobs.slice(-3).reverse();
    recentJobs.forEach(job => {
      jobsList.innerHTML += createJobCard(job);
    });
  } catch (error) {
    console.error('Error loading jobs:', error);
  }
}

// Load all jobs on jobs page
async function loadAllJobs() {
  try {
    const response = await fetch('/api/jobs');
    const jobs = await response.json();

    const jobsList = document.getElementById('jobsList');
    const noJobs = document.getElementById('noJobs');

    if (!jobsList) return;

    if (jobs.length === 0) {
      jobsList.style.display = 'none';
      noJobs.style.display = 'block';
      return;
    }

    jobsList.innerHTML = '';
    noJobs.style.display = 'none';

    jobs.reverse().forEach(job => {
      jobsList.innerHTML += createJobCard(job);
    });

    // Add delete functionality
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const jobId = e.target.dataset.id;
        if (confirm('Are you sure you want to delete this job?')) {
          await deleteJob(jobId);
        }
      });
    });
  } catch (error) {
    console.error('Error loading jobs:', error);
  }
}

// Create job card HTML
function createJobCard(job) {
  const date = new Date(job.postedAt).toLocaleDateString();
  return `
    <div class="job-card">
      <h3>${job.title}</h3>
      <div class="location">📍 ${job.location}</div>
      <p class="description">${job.description.substring(0, 100)}...</p>
      <div class="posted-date">Posted: ${date}</div>
      <span class="status">${job.status}</span>
      <div class="actions">
        <button class="btn btn-danger delete-btn" data-id="${job.id}">Delete</button>
      </div>
    </div>
  `;
}

// Delete job
async function deleteJob(jobId) {
  try {
    const response = await fetch(`/api/jobs/${jobId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      loadAllJobs();
    } else {
      alert('Failed to delete job');
    }
  } catch (error) {
    console.error('Error deleting job:', error);
    alert('Error deleting job');
  }
}

// Load recent jobs on home page when it loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadRecentJobs);
} else {
  loadRecentJobs();
}
