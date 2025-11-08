/* // Initialize elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize form handler
    const form = document.getElementById('jobApplicationForm');
    if (form) {
        form.addEventListener('submit', submitApplication);
    }

    // Initialize filters
    filterJobs();
});

// Job filtering functionality
function filterJobs() {
    const searchInput = document.getElementById('searchInput');
    const locationFilter = document.getElementById('locationFilter');
    const typeFilter = document.getElementById('typeFilter');
    const suggestionsList = document.getElementById('suggestions');
    
    if (!searchInput || !locationFilter || !typeFilter) return;

    const searchValue = searchInput.value.toLowerCase();
    const selectedLocation = locationFilter.value;
    const selectedType = typeFilter.value;
    const jobCards = document.querySelectorAll('.job-card');

  let matches = [];

  jobCards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    const location = card.dataset.location.toLowerCase();
    const type = card.dataset.type.toLowerCase();

    const matchesSearch = title.includes(searchValue) || location.includes(searchValue);
    const matchesLocation = !selectedLocation || location === selectedLocation;
    const matchesType = !selectedType || type === selectedType;

    if (matchesSearch && matchesLocation && matchesType) {
      card.style.display = 'block';
      matches.push(card.dataset.title);
    } else {
      card.style.display = 'none';
    }
  });

  // Show suggestions if typing
  if (searchValue && matches.length > 0) {
    suggestionsList.innerHTML = matches
      .map(item => `<li onclick="selectSuggestion('${item}')">${item}</li>`)
      .join('');
    suggestionsList.style.display = 'block';
  } else {
    suggestionsList.style.display = 'none';
  }
}

function selectSuggestion(jobTitle) {
  searchInput.value = jobTitle;
  suggestionsList.style.display = 'none';
  filterJobs();
}
 */

//initialise elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize form handler
    const form = document.getElementById('jobApplicationForm');
    if (form) {
        form.addEventListener('submit', submitApplication);
    }
    // Initialize filters
    filterJobs();
});

function filterJobs() {
    const searchInput = document.getElementById('searchInput');
    const locationFilter = document.getElementById('locationFilter');
    const typeFilter = document.getElementById('typeFilter');
    const suggestionsList = document.getElementById('suggestions');

    if (!searchInput || !locationFilter || !typeFilter) return;
    const searchValue = searchInput.value.toLowerCase();
    const selectedLocation = locationFilter.value.toLowerCase();
    const selectedType = typeFilter.value.toLowerCase();
    const jobCards = document.querySelectorAll('.job-card');

    let matches = [];

    jobCards.forEach(card => {
        const title = card.dataset.title.toLowerCase();
        const location = card.dataset.location.toLowerCase();
        const type = card.dataset.type.toLowerCase();
        const matchesSearch = title.includes(searchValue) || location.includes(searchValue);
        const matchesLocation = !selectedLocation || location === selectedLocation;
        const matchesType = !selectedType || type === selectedType;
        if (matchesSearch && matchesLocation && matchesType) {
            card.style.display = 'block';
            matches.push(card.dataset.title);
        }
        else {
            card.style.display = 'none';
        }
    });
    // Show suggestions if typing
    if (searchValue && matches.length > 0) {
        suggestionsList.innerHTML = matches
            .map(item => `<li onclick="selectSuggestion('${item}')">${item}</li>`)
            .join('');
        suggestionsList.style.display = 'block';
    } else {
        suggestionsList.style.display = 'none';
    }
}
function selectsuggestion() {
    searchInput.value = jobTitle;
    suggestionsList.style.display = 'none';
    filterJobs();

}





// Handle Apply Now button click
function applyNow(title, location, type) {
    const form = document.getElementById('application-form');
    if (form) {
        // Pre-fill the job title
        const jobTitleInput = document.getElementById('jobTitle');
        if (jobTitleInput) {
            jobTitleInput.value = `${title} (${location}, ${type})`;
        }

        // Pre-select job role if it matches available options
        const jobRoleSelect = document.getElementById('jobRole');
        if (jobRoleSelect) {
            // Try to find a matching role
            const options = Array.from(jobRoleSelect.options);
            const matchingOption = options.find(option =>
                title.toLowerCase().includes(option.value.toLowerCase()) ||
                option.value.toLowerCase().includes(title.toLowerCase())
            );

            if (matchingOption) {
                jobRoleSelect.value = matchingOption.value;
            } else {
                jobRoleSelect.value = ''; // Reset to default if no match
            }
        }

        // Scroll to form
        form.scrollIntoView({ behavior: 'smooth' });

        // Focus job role select if empty, otherwise focus name input
        setTimeout(() => {
            const jobRole = document.getElementById('jobRole');
            const nameInput = document.getElementById('applicantName');

            if (jobRole && jobRole.value === '') {
                jobRole.focus();
            } else if (nameInput) {
                nameInput.focus();
            }
        }, 800);
    }
}

// Handle form submission
function submitApplication(event) {
    event.preventDefault();

    const jobTitle = document.getElementById('jobTitle').value;
    const name = document.getElementById('applicantName').value.trim();
    const email = document.getElementById('applicantEmail').value.trim();
    const resume = document.getElementById('applicantResume');
    const submitButton = event.target.querySelector('button[type="submit"]');

    // Validation
    const jobRole = document.getElementById('jobRole').value;
    if (!jobRole) {
        alert('Please select your preferred role');
        document.getElementById('jobRole').focus();
        return;
    }

    if (name.length < 2) {
        alert('Please enter a valid name (minimum 2 characters)');
        document.getElementById('applicantName').focus();
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.match(emailPattern)) {
        alert('Please enter a valid email address');
        document.getElementById('applicantEmail').focus();
        return;
    }

    if (!resume.files || resume.files.length === 0) {
        alert('Please upload your resume');
        resume.focus();
        return;
    }

    // File type validation
    const allowedTypes = ['application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(resume.files[0].type)) {
        alert('Please upload a PDF or Word document');
        resume.focus();
        return;
    }

    // Show loading state
    submitButton.disabled = true;
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Success
        alert('Application submitted successfully! We will contact you soon.');
        event.target.reset();

        // Restore button
        submitButton.disabled = false;
        submitButton.textContent = originalText;

        // Scroll back to jobs section
        const jobsSection = document.getElementById('jobs');
        if (jobsSection) {
            jobsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 1500);
}
