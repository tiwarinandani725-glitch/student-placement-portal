// Get all important HTML elements
const searchInput = document.getElementById("jobSearch");
const filterSelect = document.getElementById("jobFilter");
const jobsContainer = document.getElementById("jobsContainer");
const noJobs = document.getElementById("noJobs");

// Search and filter jobs
function filterJobs() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = filterSelect.value;

    const jobCards = document.querySelectorAll(".job-card");
    let visibleJobs = 0;

    jobCards.forEach(function(card) {
        const title = card.dataset.title.toLowerCase();
        const company = card.dataset.company.toLowerCase();
        const category = card.dataset.category;

        const matchesSearch =
            title.includes(searchText) ||
            company.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "block";
            visibleJobs++;
        } else {
            card.style.display = "none";
        }
    });

    noJobs.hidden = visibleJobs !== 0;
}

// Listen for search and filter changes
searchInput.addEventListener("input", filterJobs);
filterSelect.addEventListener("change", filterJobs);

// Apply for a job
document.querySelectorAll(".apply-btn").forEach(function(button) {

    button.addEventListener("click", function() {

        const jobCard = button.closest(".job-card");
        const jobTitle = jobCard.dataset.title;
        const companyName = jobCard.dataset.company;

        const confirmApply = confirm(
            "Do you want to apply for " + jobTitle + " at " + companyName + "?"
        );

        if (!confirmApply) {
            return;
        }

        // Check duplicate applications
        const existingRows = document.querySelectorAll(
            "#applicationTable tr"
        );

        for (const row of existingRows) {
            if (
                row.cells[0].textContent === companyName &&
                row.cells[1].textContent === jobTitle
            ) {
                alert("You have already applied for this job!");
                return;
            }
        }

        // Create a new application row
        const table = document.getElementById("applicationTable");
        const newRow = document.createElement("tr");

        const companyCell = document.createElement("td");
        companyCell.textContent = companyName;

        const jobCell = document.createElement("td");
        jobCell.textContent = jobTitle;

        const dateCell = document.createElement("td");
        dateCell.textContent = new Date().toLocaleDateString("en-GB");

        const statusCell = document.createElement("td");
        const status = document.createElement("span");

        status.className = "status pending";
        status.textContent = "Under Review";

        statusCell.appendChild(status);

        newRow.append(
            companyCell,
            jobCell,
            dateCell,
            statusCell
        );

        table.appendChild(newRow);

        // Update application count
        const applicationCount = document.getElementById(
            "totalApplications"
        );

        applicationCount.textContent =
            Number(applicationCount.textContent) + 1;

        button.textContent = "Applied";
        button.disabled = true;
        button.style.opacity = "0.6";

        alert("Application added successfully!");
    });
});

// Resume PDF selection
const resumeInput = document.getElementById("resumeInput");
const resumeName = document.getElementById("resumeName");

resumeInput.addEventListener("change", function() {

    const file = resumeInput.files[0];

    if (!file) {
        resumeName.textContent = "No file selected";
        return;
    }

    if (file.type !== "application/pdf") {
        alert("Please select a PDF file.");
        resumeInput.value = "";
        resumeName.textContent = "No file selected";
        return;
    }

    resumeName.textContent = "Selected: " + file.name;
});

// Active sidebar navigation
const navigationLinks = document.querySelectorAll(".nav-link");

navigationLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        navigationLinks.forEach(function(item) {
            item.classList.remove("active");
        });

        link.classList.add("active");
    });
});
