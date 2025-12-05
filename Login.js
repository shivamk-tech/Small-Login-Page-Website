document.addEventListener('DOMContentLoaded', () => {
    const getStartedBtn = document.getElementById('getStartedBtn');
    const authModal = document.getElementById('authModal');
    const closeModalBtn = authModal.querySelector('.close');
    const showSignupBtn = document.getElementById('showSignupBtn');
    
    const loginView = document.getElementById('loginView');
    const signupView = document.getElementById('signupView');
    const signupAddressView = document.getElementById('signupAddressView');
    const signupFinalView = document.getElementById('signupFinalView'); // Step 3: Email
    const signupCredentialsView = document.getElementById('signupCredentialsView'); // Step 4: Phone & Password
    const authSeparator = document.getElementById('authSeparator');
    const googleLoginBtn = document.getElementById('googleLoginBtn');

    // Signup navigation buttons
    const nextBtn1 = signupView.querySelector('.next-btn');
    const backBtn1 = signupAddressView.querySelector('.back-btn');
    const nextBtn2 = signupAddressView.querySelector('.next-btn');
    const backBtn2 = signupFinalView.querySelector('.back-btn');
    const nextBtn3 = signupFinalView.querySelector('.next-btn');
    const backBtn3 = signupCredentialsView.querySelector('.back-btn');

    // Forms and OTP buttons
    const signupCredentialsForm = signupCredentialsView.querySelector('form');
    const sendPhoneOtpBtn = document.getElementById('sendPhoneOtpBtn');

    const modalTitle = document.getElementById('authModalTitle');
    const modalSubtitle = authModal.querySelector('h2');

    // For city suggestions
    const cityInput = document.getElementById('signupCity');
    const addressInput = document.getElementById('signupAddress');
    const stateInput = document.getElementById('signupState');
    const detectLocationBtn = document.getElementById('detectLocationBtn');

    // To store the generated OTP for verification
    let generatedEmailOtp = null;
    let generatedPhoneOtp = null;

    const openModal = () => {
        authModal.hidden = false;
        document.body.style.overflow = 'hidden';
        // Use a short delay to allow the display property to apply before starting the transition
        setTimeout(() => {
            authModal.classList.add('opening');
        }, 10);
    };

    const closeModal = () => {
        authModal.classList.remove('opening');
        authModal.classList.add('closing');
        authModal.addEventListener('transitionend', () => {
            authModal.hidden = true;
            authModal.classList.remove('closing');
            document.body.style.overflow = '';
            // Reset to login view when closed
            resetToLoginView();
        }, { once: true });
    };

    const showSignup = () => {
        loginView.style.display = 'none';
        authSeparator.style.display = 'none';
        googleLoginBtn.style.display = 'none';
        signupView.style.display = 'block';
        modalTitle.textContent = 'Sign Up';
        modalSubtitle.textContent = 'Create your account';
    };

    const resetToLoginView = () => {
        signupView.style.display = 'none';
        signupAddressView.style.display = 'none';
        signupFinalView.style.display = 'none';
        signupCredentialsView.style.display = 'none';
        loginView.style.display = 'block';
        authSeparator.style.display = 'flex';
        googleLoginBtn.style.display = 'flex';
        modalTitle.textContent = 'Welcome';
        modalSubtitle.textContent = 'Please enter details to log in';
    };

    // Event Listeners
    getStartedBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
            closeModal();
        }
    });

    showSignupBtn.addEventListener('click', showSignup);

    // Multi-step form navigation
    nextBtn1.addEventListener('click', () => {
        signupView.style.display = 'none';
        signupAddressView.style.display = 'block';
        modalTitle.textContent = 'Address';
        modalSubtitle.textContent = 'Please provide your address';
    });

    backBtn1.addEventListener('click', () => {
        signupAddressView.style.display = 'none';
        signupView.style.display = 'block';
        modalTitle.textContent = 'Sign Up';
        modalSubtitle.textContent = 'Create your account';
    });

    nextBtn2.addEventListener('click', () => {
        signupAddressView.style.display = 'none';
        signupFinalView.style.display = 'block';
        modalTitle.textContent = 'Final Step';
        modalSubtitle.textContent = 'Create your password to complete';
    });

    backBtn2.addEventListener('click', () => {
        signupFinalView.style.display = 'none';
        signupAddressView.style.display = 'block';
        modalTitle.textContent = 'Address';
        modalSubtitle.textContent = 'Please provide your address';
    });

    nextBtn3.addEventListener('click', () => {
        signupFinalView.style.display = 'none';
        signupCredentialsView.style.display = 'block';
        modalTitle.textContent = 'Credentials';
        modalSubtitle.textContent = 'Secure your account';
    });

    backBtn3.addEventListener('click', () => {
        signupCredentialsView.style.display = 'none';
        signupFinalView.style.display = 'block';
        modalTitle.textContent = 'Final Step';
        modalSubtitle.textContent = 'Create your password to complete';
    });

    sendPhoneOtpBtn.addEventListener('click', () => {
        const phoneInput = document.getElementById('signupPhone');
        const phone = phoneInput.value;

        // Basic phone validation (you can make this more robust)
        if (!phone || !/^\d{10}$/.test(phone)) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }

        sendPhoneOtpBtn.disabled = true;
        sendPhoneOtpBtn.textContent = 'Sending...';

        // --- Simulation for Frontend ---
        setTimeout(() => { // Simulate network delay
            generatedPhoneOtp = Math.floor(100000 + Math.random() * 900000).toString();
            console.log(`Generated Phone OTP for ${phone}: ${generatedPhoneOtp}`); // For testing
            alert(`An OTP has been sent to your phone (check the console for the OTP: ${generatedPhoneOtp}).`);
            sendPhoneOtpBtn.disabled = false;
            sendPhoneOtpBtn.textContent = 'Resend OTP';
        }, 1000);
    });

    signupCredentialsForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the form from actually submitting
        const emailOtpInput = document.getElementById('signupOtp');
        const phoneOtpInput = document.getElementById('signupPhoneOtp');
        const passwordInput = document.getElementById('signupPassword');
        const confirmPasswordInput = document.getElementById('signupConfirmPassword');

        // --- Simulation for Frontend ---
        if (generatedEmailOtp === null) {
            alert('Please verify your email with an OTP first.');
            return;
        }
        if (emailOtpInput.value !== generatedEmailOtp) {
            alert('Invalid Email OTP. Please go back and try again.');
            return;
        }
        if (generatedPhoneOtp === null) {
            alert('Please verify your phone number with an OTP.');
            return;
        }
        if (phoneOtpInput.value !== generatedPhoneOtp) {
            alert('Invalid Phone OTP. Please try again.');
            phoneOtpInput.value = '';
            return;
        }
        if (passwordInput.value !== confirmPasswordInput.value) {
            alert('Passwords do not match. Please try again.');
            return;
        }
        if (passwordInput.value.length < 8) {
            alert('Password must be at least 8 characters long.');
            return;
        }

        // If all checks pass
            alert('Sign up successful! Your account has been created.');
            closeModal(); // Close the modal on success
    });

    // --- Auto-detect Location Logic ---
    detectLocationBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            const originalBtnText = detectLocationBtn.querySelector('span').textContent;
            detectLocationBtn.querySelector('span').textContent = 'Detecting...';
            detectLocationBtn.disabled = true;

            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                
                // Use OpenStreetMap's free Nominatim API for reverse geocoding
                const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();

                    if (data && data.address) {
                        // The API can return 'city', 'town', or 'village'. We check for them in order.
                        addressInput.value = data.address.road || '';
                        cityInput.value = data.address.city || data.address.town || data.address.village || '';
                        stateInput.value = data.address.state || '';
                    }
                } catch (error) {
                    alert('Could not fetch address. Please enter it manually.');
                } finally {
                    detectLocationBtn.querySelector('span').textContent = originalBtnText;
                    detectLocationBtn.disabled = false;
                }

            }, (error) => {
                alert(`Error getting location: ${error.message}. Please ensure location services are enabled.`);
                detectLocationBtn.querySelector('span').textContent = originalBtnText;
                detectLocationBtn.disabled = false;
            });
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    });

    // --- City Suggestions Logic ---
    const cities = [
        'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur',
        'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara',
        'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivli', 'Vasai-Virar', 'Varanasi',
        'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad', 'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur',
        'Gwalior', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh', 'Solapur', 'Hubli-Dharwad',
        'Bareilly', 'Moradabad', 'Mysore', 'Gurgaon', 'Aligarh', 'Jalandhar', 'Tiruchirappalli', 'Bhubaneswar', 'Salem', 'Warangal',
        'Mira-Bhayandar', 'Thiruvananthapuram', 'Bhiwandi', 'Saharanpur', 'Guntur', 'Amravati', 'Noida', 'Jamshedpur', 'Bhilai',
        'Cuttack', 'Firozabad', 'Kochi', 'Nellore', 'Bhavnagar', 'Dehradun', 'Durgapur', 'Asansol', 'Rourkela', 'Nanded',
        'Kolhapur', 'Ajmer', 'Akola', 'Gulbarga', 'Jamnagar', 'Ujjain', 'Loni', 'Siliguri', 'Jhansi', 'Ulhasnagar',
        'Jammu', 'Sangli-Miraj & Kupwad', 'Mangalore', 'Erode', 'Belgaum', 'Ambattur', 'Tirunelveli', 'Malegaon', 'Gaya',
        'Jalgaon', 'Udaipur', 'Maheshtala', 'Tirupur','Sonbhadra'
    ];
    const indianStates = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 'Delhi', 'Puducherry', 'Ladakh', 'Jammu and Kashmir'
    ];

    const initializeSuggestions = (inputElement, dataArray) => {
        let suggestionsContainer;

        const createSuggestionsContainer = () => {
            if (!suggestionsContainer) {
                suggestionsContainer = document.createElement('div');
                suggestionsContainer.className = 'suggestions-container';
                inputElement.parentElement.appendChild(suggestionsContainer);
            }
        };

        const showSuggestions = (filteredItems) => {
            if (!suggestionsContainer) createSuggestionsContainer();
            suggestionsContainer.innerHTML = '';
            if (filteredItems.length === 0) {
                if (suggestionsContainer) suggestionsContainer.style.display = 'none';
                return;
            }

            filteredItems.forEach(item => {
                const suggestionItem = document.createElement('div');
                suggestionItem.className = 'suggestion-item';
                suggestionItem.textContent = item;
                suggestionItem.addEventListener('click', () => {
                    inputElement.value = item;
                    if (suggestionsContainer) suggestionsContainer.style.display = 'none';
                });
                suggestionsContainer.appendChild(suggestionItem);
            });

            suggestionsContainer.style.display = 'block';
        };

        inputElement.addEventListener('focus', createSuggestionsContainer);

        inputElement.addEventListener('input', () => {
            const inputText = inputElement.value.toLowerCase();
            if (inputText.length === 0) {
                if (suggestionsContainer) suggestionsContainer.style.display = 'none';
                return;
            }

            const filteredItems = dataArray.filter(item =>
                item.toLowerCase().startsWith(inputText)
            );

            showSuggestions(filteredItems);
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!suggestionsContainer) return;
            
            const isClickInside = inputElement.contains(e.target) || suggestionsContainer.contains(e.target);
            if (!isClickInside) {
                suggestionsContainer.style.display = 'none';
            }
        });
    };

    initializeSuggestions(cityInput, cities);
    initializeSuggestions(stateInput, indianStates);
});
