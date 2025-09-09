// Natural Hero Slideshow with Eye-Catching Transitions
document.addEventListener('DOMContentLoaded', function() {
    // Performance optimization: Use requestAnimationFrame for smooth animations
    function rafPolyfill() {
        let lastTime = 0;
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback) {
                const currTime = new Date().getTime();
                const timeToCall = Math.max(0, 16 - (currTime - lastTime));
                const id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }
    }
    rafPolyfill();
    
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    function nextSlide() {
        // Use requestAnimationFrame for smooth transitions
        requestAnimationFrame(() => {
            // Add fade-out class to current slide
            slides[currentSlide].classList.add('fade-out');
            slides[currentSlide].classList.remove('active');
            
            // Move to next slide
            currentSlide = (currentSlide + 1) % slideCount;
            
            // Add active class to new slide with delay for smooth transition
            setTimeout(() => {
                slides.forEach((slide, index) => {
                    slide.classList.remove('fade-out', 'active');
                    if (index === currentSlide) {
                        slide.classList.add('active');
                    }
                });
            }, 100);
        });
    }
    
    // Start natural slideshow - change every 6 seconds for comfortable viewing
    setInterval(nextSlide, 6000);
    
    // Add subtle zoom animation on load
    setTimeout(() => {
        requestAnimationFrame(() => {
            slides[0].style.transform = 'scale(1.02)';
            setTimeout(() => {
                requestAnimationFrame(() => {
                    slides[0].style.transform = 'scale(1)';
                });
            }, 3000);
        });
    }, 1000);
});

// Enhanced contact form with Formspree integration (TEMPORARILY DISABLED FOR TESTING)
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contactForm');
    // Temporarily commented out to allow direct form submission for Formspree activation
    // if (!form) return;
    if (!form) return; // Form disabled for testing - will re-enable after Formspree activation
    
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get all form fields
        var firstName = document.getElementById('firstName');
        var lastName = document.getElementById('lastName');
        var email = document.getElementById('email');
        var phone = document.getElementById('phone');
        var subject = document.getElementById('subject');
        var message = document.getElementById('message');
        var submitBtn = form.querySelector('button[type="submit"]');

        var isValid = true;
        
        // Validate required fields
        [firstName, lastName, email, subject, message].forEach(function (field) {
            if (!field.value.trim()) { 
                field.classList.add('is-invalid'); 
                isValid = false; 
            } else { 
                field.classList.remove('is-invalid'); 
            }
        });
        
        // Validate email format
        var emailValid = /^\S+@\S+\.\S+$/.test(email.value);
        if (!emailValid) { 
            email.classList.add('is-invalid'); 
            isValid = false; 
        }

        if (!isValid) return;

        // Show loading state
        var originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
        submitBtn.disabled = true;

        // Prepare form data for Formspree
        var formData = new FormData(form);

        // Submit to Formspree
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok');
        })
        .then(function(data) {
            // Success
            submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Message Sent!';
            submitBtn.classList.remove('btn-primary');
            submitBtn.classList.add('btn-success');
            
            // Show success message
            var successDiv = document.createElement('div');
            successDiv.className = 'alert alert-success mt-3';
            successDiv.innerHTML = '<i class="bi bi-check-circle me-2"></i>Thank you for your message! We\'ll get back to you soon.';
            form.appendChild(successDiv);
            
            // Reset form after delay
            setTimeout(function() {
                form.reset();
                successDiv.remove();
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('btn-success');
                submitBtn.classList.add('btn-primary');
                submitBtn.disabled = false;
            }, 3000);
        })
        .catch(function(error) {
            console.error('Error:', error);
            
            // Error state
            submitBtn.innerHTML = '<i class="bi bi-exclamation-triangle me-2"></i>Try Again';
            submitBtn.classList.remove('btn-primary');
            submitBtn.classList.add('btn-danger');
            
            // Show error message
            var errorDiv = document.createElement('div');
            errorDiv.className = 'alert alert-danger mt-3';
            errorDiv.innerHTML = '<i class="bi bi-exclamation-triangle me-2"></i>Sorry, there was an error sending your message. Please try again.';
            form.appendChild(errorDiv);
            
            // Reset button after delay
            setTimeout(function() {
                errorDiv.remove();
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('btn-danger');
                submitBtn.classList.add('btn-primary');
                submitBtn.disabled = false;
            }, 3000);
        });
    });
});

// Enhanced reservation form with Formspree integration
document.addEventListener('DOMContentLoaded', function () {
    var rform = document.getElementById('reservationForm');
    if (!rform) return;
    
    rform.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get all form fields
        var name = document.getElementById('resName');
        var email = document.getElementById('resEmail');
        var date = document.getElementById('resDate');
        var time = document.getElementById('resTime');
        var guests = document.getElementById('resGuests');
        var notes = document.getElementById('resNotes');
        var submitBtn = rform.querySelector('button[type="submit"]');

        var isValid = true;
        
        // Validate required fields
        [name, email, date, time, guests].forEach(function (field) {
            if (!field.value.trim()) { 
                field.classList.add('is-invalid'); 
                isValid = false; 
            } else { 
                field.classList.remove('is-invalid'); 
            }
        });
        
        // Validate email format
        var emailValid = /^\S+@\S+\.\S+$/.test(email.value);
        if (!emailValid) { 
            email.classList.add('is-invalid'); 
            isValid = false; 
        }
        
        // Validate date is not in the past
        var selectedDate = new Date(date.value);
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            date.classList.add('is-invalid');
            isValid = false;
        }
        
        // Validate number of guests
        var guestCount = parseInt(guests.value, 10);
        if (guests.value !== 'more' && (isNaN(guestCount) || guestCount < 1)) { 
            guests.classList.add('is-invalid'); 
            isValid = false; 
        }

        if (!isValid) return;

        // Show loading state
        var originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Submitting...';
        submitBtn.disabled = true;

        // Prepare form data for Formspree
        var formData = new FormData(rform);

        // Submit to Formspree
        fetch(rform.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok');
        })
        .then(function(data) {
            // Success
            submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Request Sent!';
            submitBtn.classList.remove('btn-primary');
            submitBtn.classList.add('btn-success');
            
            // Show success message
            var successDiv = document.createElement('div');
            successDiv.className = 'alert alert-success mt-3';
            successDiv.innerHTML = '<i class="bi bi-check-circle me-2"></i>Thank you for your reservation request! We\'ll confirm your booking within 24 hours.';
            rform.appendChild(successDiv);
            
            // Reset form after delay
            setTimeout(function() {
                rform.reset();
                successDiv.remove();
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('btn-success');
                submitBtn.classList.add('btn-primary');
                submitBtn.disabled = false;
            }, 5000);
        })
        .catch(function(error) {
            console.error('Error:', error);
            
            // Error state
            submitBtn.innerHTML = '<i class="bi bi-exclamation-triangle me-2"></i>Try Again';
            submitBtn.classList.remove('btn-primary');
            submitBtn.classList.add('btn-danger');
            
            // Show error message
            var errorDiv = document.createElement('div');
            errorDiv.className = 'alert alert-danger mt-3';
            errorDiv.innerHTML = '<i class="bi bi-exclamation-triangle me-2"></i>Sorry, there was an error submitting your reservation. Please try again.';
            rform.appendChild(errorDiv);
            
            // Reset button after delay
            setTimeout(function() {
                errorDiv.remove();
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('btn-danger');
                submitBtn.classList.add('btn-primary');
                submitBtn.disabled = false;
            }, 3000);
        });
    });
});

// Enhanced newsletter form with Formspree integration
document.addEventListener('DOMContentLoaded', function () {
    var newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        var emailInput = newsletterForm.querySelector('input[type="email"]');
        var submitBtn = newsletterForm.querySelector('button[type="submit"]');
        
        // Validate email
        if (!emailInput.value.trim() || !/^\S+@\S+\.\S+$/.test(emailInput.value)) {
            emailInput.classList.add('is-invalid');
            return;
        }
        emailInput.classList.remove('is-invalid');

        // Show loading state
        var originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-1"></i>Subscribing...';
        submitBtn.disabled = true;

        // Submit to Formspree
        fetch(newsletterForm.action, {
            method: 'POST',
            body: new FormData(newsletterForm),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok');
        })
        .then(function(data) {
            // Success
            submitBtn.innerHTML = '<i class="bi bi-check-circle me-1"></i>Subscribed!';
            submitBtn.classList.remove('btn-primary');
            submitBtn.classList.add('btn-success');
            emailInput.value = '';
            
            // Reset after delay
            setTimeout(function() {
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('btn-success');
                submitBtn.classList.add('btn-primary');
                submitBtn.disabled = false;
            }, 3000);
        })
        .catch(function(error) {
            console.error('Error:', error);
            
            // Error state
            submitBtn.innerHTML = '<i class="bi bi-exclamation-triangle me-1"></i>Try Again';
            submitBtn.classList.remove('btn-primary');
            submitBtn.classList.add('btn-danger');
            
            // Reset after delay
            setTimeout(function() {
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('btn-danger');
                submitBtn.classList.add('btn-primary');
                submitBtn.disabled = false;
            }, 3000);
        });
    });
});

// Order functionality for menu items
function orderItem(itemName, itemPrice) {
    // Create WhatsApp message
    var message = `Hello Barista Coffee! 🍵

I would like to order:
📦 ${itemName} - ${itemPrice}

Please let me know:
• Availability
• Pickup/delivery options
• Total cost including any delivery fees

Thank you!`;
    
    // Encode the message for URL
    var encodedMessage = encodeURIComponent(message);
    
    // WhatsApp business number (using the same number from contact page)
    var whatsappNumber = "254702211922";
    
    // Create WhatsApp URL
    var whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
}

// Gallery modal preview
document.addEventListener('DOMContentLoaded', function () {
    var grid = document.getElementById('galleryGrid');
    if (!grid) return;
    var modal = document.getElementById('imageModal');
    var img = document.getElementById('modalImage');
    grid.addEventListener('click', function (e) {
        var target = e.target;
        if (target && target.tagName === 'IMG') {
            img.src = target.getAttribute('data-full') || target.src;
            var bsModal = new bootstrap.Modal(modal);
            bsModal.show();
        }
    });
});

