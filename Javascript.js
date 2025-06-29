
        document.addEventListener('DOMContentLoaded', function() {
            // Mobile Menu Toggle
            const mobileMenuBtn = document.querySelector('.mobile-menu');
            const nav = document.querySelector('nav');
            
            mobileMenuBtn.addEventListener('click', function() {
                nav.classList.toggle('active');
                this.querySelector('i').classList.toggle('fa-times');
                this.querySelector('i').classList.toggle('fa-bars');
            });
            
            // Smooth Scrolling for Navigation Links
            document.querySelectorAll('nav a').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                    }
                });
            });
            
            // Header Scroll Effect
            window.addEventListener('scroll', function() {
                const header = document.querySelector('header');
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
            
            // Workout Level Tabs
            const tabBtns = document.querySelectorAll('.tab-btn');
            const workoutPlans = document.querySelectorAll('.workout-plan');
            
            tabBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Remove active class from all buttons
                    tabBtns.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Get the level from data attribute
                    const level = this.getAttribute('data-level');
                    
                    // Hide all workout plans
                    workoutPlans.forEach(plan => {
                        plan.classList.remove('show');
                    });
                    
                    // Show the selected workout plan
                    document.querySelector(`.workout-plan.${level}`).classList.add('show');
                });
            });
            
            // Video Category Filter
            const videoCategoryBtns = document.querySelectorAll('.video-category-btn');
            const videoCards = document.querySelectorAll('.video-card');
            
            videoCategoryBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Remove active class from all buttons
                    videoCategoryBtns.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Get the category from data attribute
                    const category = this.getAttribute('data-category');
                    
                    // Show/hide videos based on category
                    videoCards.forEach(card => {
                        if (category === 'all' || card.getAttribute('data-category') === category) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
            
            // Diet Plan Tabs
            const dietTabBtns = document.querySelectorAll('.diet-tab-btn');
            const dietPlans = document.querySelectorAll('.diet-plan');
            
            dietTabBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Remove active class from all buttons
                    dietTabBtns.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Get the diet type from data attribute
                    const dietType = this.getAttribute('data-diet');
                    
                    // Hide all diet plans
                    dietPlans.forEach(plan => {
                        plan.classList.remove('show');
                    });
                    
                    // Show the selected diet plan
                    document.querySelector(`.diet-plan.${dietType}`).classList.add('show');
                });
            });
            
            // Video Modal
            const videoThumbnails = document.querySelectorAll('.video-thumbnail');
            const videoModal = document.querySelector('.video-modal');
            const closeModal = document.querySelector('.close-modal');
            const videoIframe = document.querySelector('.video-container iframe');
            
            videoThumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', function() {
                    const videoUrl = this.getAttribute('data-video') + "?autoplay=1";
                    videoIframe.setAttribute('src', videoUrl);
                    videoModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });
            
            closeModal.addEventListener('click', function() {
                videoModal.classList.remove('active');
                videoIframe.setAttribute('src', '');
                document.body.style.overflow = 'auto';
            });
            
            videoModal.addEventListener('click', function(e) {
                if (e.target === videoModal) {
                    videoModal.classList.remove('active');
                    videoIframe.setAttribute('src', '');
                    document.body.style.overflow = 'auto';
                }
            });
            
            // Testimonial Slider
            const testimonialSlides = document.querySelectorAll('.testimonial-slide');
            const dots = document.querySelectorAll('.dot');
            const prevBtn = document.querySelector('.slider-prev');
            const nextBtn = document.querySelector('.slider-next');
            let currentSlide = 0;
            
            function showSlide(n) {
                // Wrap around if at beginning or end
                if (n >= testimonialSlides.length) {
                    currentSlide = 0;
                } else if (n < 0) {
                    currentSlide = testimonialSlides.length - 1;
                } else {
                    currentSlide = n;
                }
                
                // Hide all slides
                testimonialSlides.forEach(slide => {
                    slide.classList.remove('active');
                });
                
                // Remove active class from all dots
                dots.forEach(dot => {
                    dot.classList.remove('active');
                });
                
                // Show current slide
                testimonialSlides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            }
            
            function nextSlide() {
                showSlide(currentSlide + 1);
            }
            
            function prevSlide() {
                showSlide(currentSlide - 1);
            }
            
            // Auto slide every 5 seconds
            let slideInterval = setInterval(nextSlide, 5000);
            
            // Reset interval when manually changing slides
            function resetInterval() {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            }
            
            // Event listeners for buttons
            nextBtn.addEventListener('click', function() {
                nextSlide();
                resetInterval();
            });
            
            prevBtn.addEventListener('click', function() {
                prevSlide();
                resetInterval();
            });
            
            // Event listeners for dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    showSlide(index);
                    resetInterval();
                });
            });
            
            // Progress Tracker Form
            const progressForm = document.getElementById('progress-form');
            const totalWorkoutsEl = document.getElementById('total-workouts');
            const totalHoursEl = document.getElementById('total-hours');
            const currentStreakEl = document.getElementById('current-streak');
            const avgIntensityEl = document.getElementById('avg-intensity');
            
            // Sample workout data (in a real app, this would come from a database)
            let workouts = [
                { date: '2023-06-01', type: 'strength', duration: 45, intensity: 4, notes: 'Chest and triceps' },
                { date: '2023-06-03', type: 'cardio', duration: 30, intensity: 3, notes: 'Running' },
                { date: '2023-06-04', type: 'hiit', duration: 20, intensity: 5, notes: 'Tabata workout' },
                { date: '2023-06-05', type: 'strength', duration: 60, intensity: 4, notes: 'Leg day' },
                { date: '2023-06-07', type: 'yoga', duration: 40, intensity: 2, notes: 'Vinyasa flow' }
            ];
            
            // Initialize stats
            updateStats();
            
            // Form submission
            progressForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const date = document.getElementById('workout-date').value;
                const type = document.getElementById('workout-type').value;
                const duration = parseInt(document.getElementById('workout-duration').value);
                const intensity = parseInt(document.getElementById('workout-intensity').value);
                const notes = document.getElementById('workout-notes').value;
                
                // Create new workout object
                const newWorkout = {
                    date,
                    type,
                    duration,
                    intensity,
                    notes
                };
                
                // Add to workouts array
                workouts.push(newWorkout);
                
                // Update stats
                updateStats();
                
                // Update chart
                updateChart();
                
                // Reset form
                this.reset();
                
                // Show success message
                alert('Workout logged successfully!');
            });
            
            // Function to update stats
            function updateStats() {
                // Total workouts
                totalWorkoutsEl.textContent = workouts.length;
                
                // Total hours (convert minutes to hours with 1 decimal place)
                const totalMinutes = workouts.reduce((sum, workout) => sum + workout.duration, 0);
                const totalHours = (totalMinutes / 60).toFixed(1);
                totalHoursEl.textContent = totalHours;
                
                // Current streak (simplified - in a real app you'd check consecutive dates)
                currentStreakEl.textContent = workouts.length > 0 ? '3' : '0';
                
                // Average intensity
                const avgIntensity = workouts.reduce((sum, workout) => sum + workout.intensity, 0) / workouts.length;
                avgIntensityEl.textContent = workouts.length > 0 ? avgIntensity.toFixed(1) : '0';
            }
            
            // Initialize Chart
            let workoutChart;
            
            function initChart() {
                const ctx = document.getElementById('workoutChart').getContext('2d');
                
                // Group workouts by type for chart data
                const workoutTypes = ['cardio', 'strength', 'hiit', 'yoga', 'other'];
                const typeCounts = workoutTypes.map(type => {
                    return workouts.filter(workout => workout.type === type).length;
                });
                
                workoutChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Cardio', 'Strength', 'HIIT', 'Yoga', 'Other'],
                        datasets: [{
                            label: 'Workouts by Type',
                            data: typeCounts,
                            backgroundColor: [
                                'rgba(255, 71, 87, 0.7)',
                                'rgba(46, 213, 115, 0.7)',
                                'rgba(255, 165, 2, 0.7)',
                                'rgba(106, 176, 76, 0.7)',
                                'rgba(116, 125, 140, 0.7)'
                            ],
                            borderColor: [
                                'rgba(255, 71, 87, 1)',
                                'rgba(46, 213, 115, 1)',
                                'rgba(255, 165, 2, 1)',
                                'rgba(106, 176, 76, 1)',
                                'rgba(116, 125, 140, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 1
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }
                });
            }
            
            // Function to update chart
            function updateChart() {
                // Group workouts by type for chart data
                const workoutTypes = ['cardio', 'strength', 'hiit', 'yoga', 'other'];
                const typeCounts = workoutTypes.map(type => {
                    return workouts.filter(workout => workout.type === type).length;
                });
                
                // Update chart data
                workoutChart.data.datasets[0].data = typeCounts;
                workoutChart.update();
            }
            
            // Initialize chart when page loads
            initChart();
            
            // Form validation for contact form
            const contactForm = document.getElementById('contactForm');
            
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simple validation - in a real app you'd do more thorough validation
                const name = document.getElementById('contact-name').value;
                const email = document.getElementById('contact-email').value;
                const subject = document.getElementById('contact-subject').value;
                const message = document.getElementById('contact-message').value;
                
                if (name && email && subject && message) {
                    // In a real app, you would send this data to a server
                    alert('Thank you for your message! We will get back to you soon.');
                    this.reset();
                } else {
                    alert('Please fill in all fields.');
                }
            });
            
            // Newsletter form
            const newsletterForm = document.getElementById('newsletterForm');
            
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = this.querySelector('input').value;
                
                if (email) {
                    // In a real app, you would send this to your email list
                    alert('Thank you for subscribing to our newsletter!');
                    this.reset();
                } else {
                    alert('Please enter your email address.');
                }
            });
        });
