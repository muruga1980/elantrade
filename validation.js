// ============================================
// ÉLAN TRADELINKS LLP - Form Validation
// jQuery Validation Plugin Integration
// ============================================

(function($) {
    'use strict';

    // Contact/Enquiry Form Validation
    function initContactForm() {
        const $form = $('#contactForm, #enquiryForm');
        if (!$form.length) return;

        // jQuery Validation
        if ($.validator) {
            $form.validate({
                rules: {
                    fullName: {
                        required: true,
                        minlength: 2,
                        maxlength: 100
                    },
                    email: {
                        required: true,
                        email: true,
                        maxlength: 100
                    },
                    phone: {
                        required: false,
                        phoneNumber: true
                    },
                    company: {
                        required: false,
                        maxlength: 100
                    },
                    productInterest: {
                        required: false
                    },
                    message: {
                        required: true,
                        minlength: 10,
                        maxlength: 2000
                    }
                },
                messages: {
                    fullName: {
                        required: 'Please enter your full name',
                        minlength: 'Name must be at least 2 characters',
                        maxlength: 'Name must not exceed 100 characters'
                    },
                    email: {
                        required: 'Please enter your email address',
                        email: 'Please enter a valid email address',
                        maxlength: 'Email must not exceed 100 characters'
                    },
                    phone: {
                        phoneNumber: 'Please enter a valid phone number'
                    },
                    message: {
                        required: 'Please enter your message',
                        minlength: 'Message must be at least 10 characters',
                        maxlength: 'Message must not exceed 2000 characters'
                    }
                },
                errorElement: 'span',
                errorClass: 'error-message',
                validClass: 'valid',
                highlight: function(element) {
                    $(element).addClass('error').removeClass('valid');
                    $(element).closest('.form-group').addClass('has-error');
                },
                unhighlight: function(element) {
                    $(element).removeClass('error').addClass('valid');
                    $(element).closest('.form-group').removeClass('has-error');
                },
                errorPlacement: function(error, element) {
                    error.addClass('visible');
                    error.insertAfter(element);
                },
                submitHandler: function(form) {
                    const $submitBtn = $(form).find('button[type="submit"], .submit-btn');
                    const originalText = $submitBtn.html();

                    // Disable submit button
                    $submitBtn.prop('disabled', true).html('<span class="material-icons">hourglass_empty</span> Sending...');

                    // Web3Forms live submission
                    const formData = new FormData(form);
                    const action = form.getAttribute('action') || 'https://api.web3forms.com/submit';

                    fetch(action, {
                        method: 'POST',
                        body: formData
                    })
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(data) {
                        if (data.success) {
                            if (window.showSuccessAlert) {
                                window.showSuccessAlert('Thank you! Your enquiry has been submitted successfully. We will contact you within 24 hours.');
                            } else {
                                alert('Thank you! Your enquiry has been submitted successfully.');
                            }
                            form.reset();
                            $(form).find('.form-group').removeClass('has-error');
                            $(form).find('.error').removeClass('error');
                            $(form).find('.valid').removeClass('valid');
                            $(form).find('.error-message').remove();
                        } else {
                            var errorMsg = data.message || 'Something went wrong. Please try again or contact us directly.';
                            if (window.showSuccessAlert) {
                                window.showSuccessAlert(errorMsg);
                            } else {
                                alert(errorMsg);
                            }
                        }
                    })
                    .catch(function(error) {
                        console.error('Web3Forms submission error:', error);
                        if (window.showSuccessAlert) {
                            window.showSuccessAlert('Network error. Please check your connection and try again, or contact us directly.');
                        } else {
                            alert('Network error. Please check your connection and try again.');
                        }
                    })
                    .finally(function() {
                        $submitBtn.prop('disabled', false).html(originalText);
                    });

                    return false;
                }
            });
        }
    }

    // Custom phone number validation
    function initPhoneValidation() {
        if ($.validator) {
            $.validator.addMethod('phoneNumber', function(value, element) {
                // Allow empty (optional field)
                if (value === '') return true;
                
                // International phone number regex
                // Supports: +1234567890, 123-456-7890, (123) 456-7890, etc.
                const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
                return phoneRegex.test(value) || this.optional(element);
            }, 'Please enter a valid phone number');
        }
    }

    // Real-time validation feedback
    function initRealTimeValidation() {
        const $forms = $('#contactForm, #enquiryForm');
        if (!$forms.length) return;

        $forms.find('input, textarea, select').on('blur', function() {
            const $field = $(this);
            const $form = $field.closest('form');
            
            if ($form.data('validator')) {
                $form.data('validator').element($field);
            }
        });

        // Clear error on input
        $forms.find('input, textarea, select').on('input', function() {
            const $field = $(this);
            const $group = $field.closest('.form-group');
            
            if ($field.val().trim() !== '') {
                $field.removeClass('error');
                $group.removeClass('has-error');
                $group.find('.error-message').fadeOut(200, function() {
                    $(this).remove();
                });
            }
        });
    }

    // Email format validation helper
    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    // Initialize all validations
    function init() {
        initPhoneValidation();
        initContactForm();
        initRealTimeValidation();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})(jQuery);
