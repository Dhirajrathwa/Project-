// Open modal and show job title
function openJob(title) {
  document.getElementById("jobTitle").innerText = title;
  // use flex so CSS centering works
  document.getElementById("jobModal").style.display = "flex";
  // trap focus (simple) - focus the close button
  const closeBtn = document.querySelector('#jobModal .close');
  if (closeBtn) closeBtn.focus();
}

function closeJob() {
  document.getElementById("jobModal").style.display = "none";
}

function scrollToForm() {
  const el = document.querySelector("#apply");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
  closeJob();
}

// Close when clicking outside the modal-content
document.addEventListener('click', function (e) {
  const modal = document.getElementById('jobModal');
  if (!modal) return;
  if (modal.style.display !== 'none' && !modal.contains(e.target)) return; // click elsewhere on page
  // if clicked directly on overlay (modal) but not on .modal-content
  if (modal === e.target) {
    closeJob();
  }
});

// Close on Escape
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeJob();
}); 

// filter jobs by title
const searchInput = document.getElementById('searchInput');
const locationFilter = document.getElementById('locationFilter');
const typeFilter = document.getElementById('typeFilter');
const suggestionsList = document.getElementById('suggestions');

function filterJobs() {
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




//form validation
function validateForm() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let resume = document.getElementById("resume").value.trim();
  let message = document.getElementById("message").value.trim();
  let formMessage = document.getElementById("formMessage");

  // Reset message
  formMessage.style.color = "red";
  formMessage.innerText = "";

  // Validation conditions
  if (name === "" || email === "" || resume === "" || message === "") {
    formMessage.innerText = "⚠️ Please fill out all fields.";
    return false;
  }

  // Email validation
  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    formMessage.innerText = "📧 Please enter a valid email address.";
    return false;
  }

  // Success
  formMessage.style.color = "green";
  formMessage.innerText = "✅ Application submitted successfully!";
  document.getElementById("applyForm").reset();
  return false; // prevent real submission for demo
}
