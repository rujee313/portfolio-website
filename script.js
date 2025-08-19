// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }),
  )
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Contact Form Handling
const contactForm = document.getElementById("contact-form")
const formMessage = document.getElementById("form-message")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const name = formData.get("name")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")

    // Basic validation
    if (!name || !email || !subject || !message) {
      showFormError("Please fill in all required fields.")
      return
    }

    if (!isValidEmail(email)) {
      showFormError("Please enter a valid email address.")
      return
    }

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const btnText = submitBtn.querySelector(".btn-text")
    const btnLoading = submitBtn.querySelector(".btn-loading")

    btnText.style.display = "none"
    btnLoading.style.display = "inline-flex"
    submitBtn.disabled = true

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
      // Hide loading state
      btnText.style.display = "inline"
      btnLoading.style.display = "none"
      submitBtn.disabled = false

      // Show success message
      contactForm.style.display = "none"
      formMessage.style.display = "block"

      // Log form data (in real implementation, send to server)
      console.log("Form submitted:", {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString(),
      })

      // Reset form after 5 seconds
      setTimeout(() => {
        contactForm.reset()
        contactForm.style.display = "block"
        formMessage.style.display = "none"
      }, 5000)
    }, 2000) // Simulate 2 second processing time
  })
}

// Newsletter Form Handling
const newsletterForm = document.getElementById("newsletter-form")

if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const email = this.querySelector('input[type="email"]').value

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.")
      return
    }

    // Simulate newsletter signup
    const submitBtn = this.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent

    submitBtn.textContent = "Subscribing..."
    submitBtn.disabled = true

    setTimeout(() => {
      alert("Thank you for subscribing to our newsletter!")
      this.reset()
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }, 1500)
  })
}

// Utility Functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showFormError(message) {
  // Create or update error message
  let errorDiv = document.querySelector(".form-error")

  if (!errorDiv) {
    errorDiv = document.createElement("div")
    errorDiv.className = "form-error"
    errorDiv.style.cssText = `
            background: #fef2f2;
            border: 1px solid #fecaca;
            color: #dc2626;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
        `
    contactForm.insertBefore(errorDiv, contactForm.firstChild)
  }

  errorDiv.textContent = message

  // Remove error message after 5 seconds
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.parentNode.removeChild(errorDiv)
    }
  }, 5000)
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".project-card, .skill-category, .blog-post")

  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// // Add loading animation for images
// document.addEventListener("DOMContentLoaded", () => {
//   const images = document.querySelectorAll("img")

//   images.forEach((img) => {
//     img.addEventListener("load", () => {
//       img.style.opacity = "1"
//     })

//     // Set initial opacity
//     img.style.opacity = "0"
//     img.style.transition = "opacity 0.3s ease"
//   })
// })
