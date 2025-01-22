document.addEventListener('DOMContentLoaded', function () {
    // Navbar shrink function
    const navbarShrink = () => {
        const navbar = document.getElementById("mainNav");
        if (!navbar) return;

        // If the screen is smaller than 992px, always remove "navbar-transparent"
        if (window.innerWidth <992) {
            navbar.classList.remove("navbar-transparent");
            navbar.style.backgroundColor = ""; // Restores the default style if there is one
            return; // We leave to not apply any more changes
        }

        // For screens greater than or equal to 992px

        if (window.scrollY === 0) {
            navbar.classList.remove("navbar-shrink", "navbar-default");
            navbar.classList.add("navbar-transparent");
        } else {
            navbar.classList.add("navbar-shrink", "navbar-default");
            navbar.classList.remove("navbar-transparent");
        }
        // Ensure responsive behavior
        if (window.innerWidth >= 992) {
            navbar.style.backgroundColor = window.scrollY === 0 ? "transparent" : "rgba(33, 37, 41, 0.9)"; //rgba(33, 37, 41, 0.9)
        }
    };

    // Run shrink function on page load and scroll
    navbarShrink();
    document.addEventListener("scroll", navbarShrink);

    // Activate Bootstrap scrollspy
    const mainNav = document.getElementById("mainNav");
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.querySelector('.navbar-toggler');
    const responsiveNavItems = document.querySelectorAll('#navbarResponsive .nav-link');
    responsiveNavItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});

// night mode
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");

    if (!localStorage.getItem("theme")) {
        const prefersNight = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (prefersNight) {
            document.body.classList.add("night-mode");
        }
    } else {
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme === "night") {
            document.body.classList.add("night-mode");
        }
    }

    updateIcons();

    themeToggle.addEventListener("click", () => {
        if (!themeToggle.classList.contains("rotate")) {
            themeToggle.classList.add("rotate");

            // Rotate the button (we disable other animations during this time)
            setTimeout(() => {
                themeToggle.classList.remove("rotate");
            }, 600);

            // Change the theme
            document.body.classList.toggle("night-mode");
            const isNightMode = document.body.classList.contains("night-mode");
            localStorage.setItem("theme", isNightMode ? "night" : "light");
            updateIcons();
        }
    });

    function updateIcons() {
        const isNightMode = document.body.classList.contains("night-mode");
        const sunIcon = themeToggle.querySelector(".icon.sun");
        const moonIcon = themeToggle.querySelector(".icon.moon");

        if (isNightMode) {
            sunIcon.style.opacity = "0";
            // sunIcon.style.transform = "scale(0.8)";
            moonIcon.style.opacity = "1";
            // moonIcon.style.transform = "scale(1)";
        } else {
            sunIcon.style.opacity = "1";
            // sunIcon.style.transform = "scale(1)";
            moonIcon.style.opacity = "0";
            // moonIcon.style.transform = "scale(0.8)";
        }
    }
});





// Handle closure of all modals
document.addEventListener('DOMContentLoaded', function () {
    const modals = document.querySelectorAll('.portfolio-modal');
  
    modals.forEach(modal => {
      const closeModal = modal.querySelector('.close-modal');
  
      // Close the modal when clicking the close button
      if (closeModal) {
        closeModal.addEventListener('click', (e) => {
          e.stopPropagation();
          modal.classList.remove('show');
        });
      }
  
      // Close the modal if clicked outside the active area
      window.addEventListener('click', (e) => {
        if (modal.classList.contains('show') && !modal.querySelector('.modal-dialog').contains(e.target)) {
          modal.classList.remove('show');
        }
      });
    });
  });

  

//save night mode option
  const toggleNightMode = () => {
    document.body.classList.toggle('night-mode');
    localStorage.setItem('nightMode', document.body.classList.contains('night-mode'));
};

// When loading the page
if (localStorage.getItem('nightMode') === 'true') {
    document.body.classList.add('night-mode');
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
// Get references to the form and button
const form = document.getElementById('contactForm');
const submitButton = document.getElementById('submitButton');

// Function to validate a field
function validateField(field, regex = null) {
    const value = field.value.trim();
    const invalidFeedback = field.nextElementSibling;

    if (regex) {
        if (!regex.test(value)) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            if (invalidFeedback) {
                invalidFeedback.textContent = field.dataset.errorMessage || 
                    (field.type === 'email' ? 'Formato de correo no válido.' : 'Campo no válido.');
            }
            return false;
        }
    } else {
        if (!value) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            if (invalidFeedback) {
                invalidFeedback.textContent = field.dataset.errorMessage || 'Este campo es obligatorio.';
            }
            return false;
        }

        // Additional validation: maximum length
        if (field.maxLength && value.length > field.maxLength) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            if (invalidFeedback) {
                invalidFeedback.textContent = `El texto debe ser menor a ${field.maxLength} caracteres.`;
            }
            return false;
        }
         // Minimum length validation (if applicable)
         if (field.minLength && value.length <field.minLength) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            if (invalidFeedback) {
                invalidFeedback.textContent = `El texto debe ser mayor a ${field.minLength} caracteres.`;
            }
            return false;
        }
    }

    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    if (invalidFeedback) invalidFeedback.textContent = '';
    return true;
}

// Validation of all fields in real time
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const message = document.getElementById('message');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isNameValid = validateField(name);
    const isEmailValid = validateField(email, emailRegex);
    const isPhoneValid = validateField(phone);
    const isMessageValid = validateField(message);

    return isNameValid && isEmailValid && isPhoneValid && isMessageValid;
}

// Listen to 'input' events for each field
form.addEventListener('input', () => {
    const isFormValid = validateForm();
    submitButton.disabled = !isFormValid; // Habilita/deshabilita el botón de envío
});

// Validation when submitting the form
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita el envío predeterminado
    const isValid = validateForm();

    if (isValid) {
        sendFormData(); // Envía el formulario si todo es válido
    }
});

// Sending the form with fetch
function sendFormData() {
    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(response => {
            if (response.ok) {
                document.getElementById('submitSuccessMessage').innerHTML = `
                    <div class="text-center text-success mb-3">
                        <strong>¡Formulario enviado exitosamente!</strong> Gracias por contactarnos. Te responderemos a la brevedad.
                    </div>`;
                document.getElementById('submitSuccessMessage').classList.remove('d-none');
                document.getElementById('submitErrorMessage').classList.add('d-none');
                form.reset();
                submitButton.disabled = true; // Disable button after submission
                submitButton.innerText = 'Message Sent'; // Change button text
                document.querySelectorAll('.is-valid').forEach((field) => field.classList.remove('is-valid'));
            } else {
                document.getElementById('submitErrorMessage').innerHTML = `
                    <div class="text-center text-danger mb-3">
                        <strong>¡Error al enviar el formulario!</strong> Inténtalo nuevamente más tarde.
                    </div>`;
                document.getElementById('submitErrorMessage').classList.remove('d-none');
                document.getElementById('submitSuccessMessage').classList.add('d-none');
            }
        })
        .catch(() => {
            document.getElementById('submitErrorMessage').innerHTML = `
                <div class="text-center text-danger mb-3">
                    <strong>¡Error al enviar el formulario!</strong> Verifica tu conexión a internet e inténtalo nuevamente.
                </div>`;
            document.getElementById('submitErrorMessage').classList.remove('d-none');
            document.getElementById('submitSuccessMessage').classList.add('d-none');
        });
}


// JavaScript for portfolio interaction

// Filters by category
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        document.querySelectorAll('.portfolio-item').forEach(item => {
            const category = item.parentElement.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.parentElement.style.display = 'block';
            } else {
                item.parentElement.style.display = 'none';
            }
        });
    });
});

// Interactive search
document.getElementById('searchBar').addEventListener('input', (event) => {
    const searchQuery = event.target.value.toLowerCase();
    document.querySelectorAll('.portfolio-item').forEach(item => {
        const heading = item.querySelector('.portfolio-caption-heading').textContent.toLowerCase();
        const subheading = item.querySelector('.portfolio-caption-subheading').textContent.toLowerCase();
        if (heading.includes(searchQuery) || subheading.includes(searchQuery)) {
            item.parentElement.style.display = 'block';
        } else {
            item.parentElement.style.display = 'none';
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll("[data-animation]");
  
    const handleScroll = () => {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const inView = rect.top <window.innerHeight && rect.bottom > 0;
  
        if (inView) {
          el.classList.add("animate");
        } else {
          el.classList.remove("animate"); // If you want the animation to be reversible
        }
      });
    };
  
    // Run the event on scroll and on page load
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // To animate elements that are already visible
  });
  
// general error handler
window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason || {};
    const message = reason.message || reason.toString(); // Maneja casos sin .message
    if (message.includes("is not valid JSON")) {
        console.warn("Handled extension-related rejection:", message);
        event.preventDefault();
    }
});




