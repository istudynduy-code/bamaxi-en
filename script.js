// BaMaxi Premium - Advanced Monetization Features

let stripe; // Will be initialized with your key
let currentProduct = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Stripe (replace with your actual publishable key)
    stripe = Stripe('pk_live_YOUR_PUBLISHABLE_KEY');

    console.log('🎉 BaMaxi Premium loaded!');
});

// Open payment modal
function buyProduct(productId, productName, price) {
    currentProduct = {
        id: productId,
        name: productName,
        price: price
    };

    document.getElementById('productName').value = productName;
    document.getElementById('productPrice').value = price;
    document.getElementById('summaryProduct').textContent = productName;
    document.getElementById('summaryPrice').textContent = '$' + price.toFixed(2);

    openPaymentModal();
}

// Open modal
function openPaymentModal() {
    document.getElementById('paymentModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    document.getElementById('paymentModal').classList.remove('show');
    document.getElementById('paymentForm').reset();
    document.body.style.overflow = 'auto';
}

// Update payment UI based on selection
function updatePaymentUI() {
    const method = document.getElementById('paymentMethod').value;

    // Hide all containers
    document.getElementById('stripeContainer').style.display = 'none';
    document.getElementById('paypalContainer').style.display = 'none';
    document.getElementById('bankContainer').style.display = 'none';
    document.getElementById('localContainer').style.display = 'none';

    // Show selected container
    switch(method) {
        case 'stripe':
            document.getElementById('stripeContainer').style.display = 'block';
            break;
        case 'paypal':
            document.getElementById('paypalContainer').style.display = 'block';
            break;
        case 'bank':
            document.getElementById('bankContainer').style.display = 'block';
            break;
        case 'local':
            document.getElementById('localContainer').style.display = 'block';
            break;
    }
}

// Initialize Stripe card element
function initStripeCard() {
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');
    return { cardElement, elements };
}

// Process payment
async function processPayment(event) {
    event.preventDefault();

    const method = document.getElementById('paymentMethod').value;
    const email = document.getElementById('customerEmail').value;
    const name = document.getElementById('customerName').value;

    console.log('Processing payment:', {
        method: method,
        product: currentProduct,
        customer: email
    });

    // Validate inputs
    if (!email || !name) {
        alert('Please fill in all required fields');
        return;
    }

    // Handle different payment methods
    switch(method) {
        case 'stripe':
            await processStripePayment();
            break;
        case 'paypal':
            redirectToPayPal();
            break;
        case 'bank':
            handleBankTransfer();
            break;
        case 'local':
            handleLocalPayment();
            break;
    }
}

// Stripe payment processing
async function processStripePayment() {
    // In production, call your backend API
    console.log('Stripe payment processing...');

    // Simulated payment success
    setTimeout(() => {
        completePayment();
    }, 2000);
}

// PayPal redirect
function redirectToPayPal() {
    const email = document.getElementById('customerEmail').value;
    const paypalUrl = `https://www.paypal.com/checkout?amount=${currentProduct.price}&email=${email}`;
    alert('You would be redirected to PayPal\nIn production: ' + paypalUrl);
    // window.location.href = paypalUrl;
}

// Bank transfer instructions
function handleBankTransfer() {
    const email = document.getElementById('customerEmail').value;
    alert(`Bank Transfer Details:
Bank: Example Bank
Account: 123456789
Amount: $${currentProduct.price}

Reference: ${email}

Please send screenshot to contact@bamaxi.eng`);

    // Send confirmation email
    sendConfirmationEmail(email, 'Bank Transfer Pending');
}

// Local payment (Vietnam)
function handleLocalPayment() {
    const email = document.getElementById('customerEmail').value;
    alert(`Vietnam Payment Options:

Momo: 0936XXXXXX
Amount: ${(currentProduct.price * 24000).toFixed(0)} VND

ZaloPay: Available

Bank Transfer: Also available

Please send transaction details to contact@bamaxi.eng`);

    sendConfirmationEmail(email, 'Local Payment Pending');
}

// Complete payment
function completePayment() {
    const email = document.getElementById('customerEmail').value;
    const name = document.getElementById('customerName').value;

    // Send download links via email
    sendDownloadLinks(email, name);

    // Show success message
    alert(`✅ Payment Successful!

Your download links have been sent to: ${email}

Check your email for:
- ${currentProduct.name}
- Download instructions
- Lifetime access details

Thank you for purchasing!`);

    // Close modal and reset
    closeModal();
    document.getElementById('paymentForm').reset();

    // In production, would save to database
    console.log('Payment recorded:', {
        customer: name,
        email: email,
        product: currentProduct,
        timestamp: new Date()
    });
}

// Send download links (simulated)
function sendDownloadLinks(email, name) {
    console.log('Sending download links to:', email);

    const emailContent = {
        to: email,
        subject: `Your ${currentProduct.name} - Download Links`,
        body: `Hello ${name},

Thank you for purchasing ${currentProduct.name}!

Your download links:
1. Main materials PDF
2. Bonus resources
3. Answer keys

This content is yours to keep forever. You have lifetime access!

Download link (valid for 30 days): [Link would go here]

Questions? Reply to this email.

Best regards,
BaMaxi English Team`
    };

    // In production, this would call your email service
}

// Send confirmation email
function sendConfirmationEmail(email, status) {
    console.log('Sending confirmation email to:', email);
    console.log('Status:', status);
}

// Newsletter subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = document.getElementById('emailSubscribe').value;

    console.log('Newsletter subscription:', email);

    alert(`✅ Thank you for subscribing!

You'll receive:
- Exclusive discounts (up to 50% off)
- New course announcements
- Teaching tips
- Limited-time offers

Check your email to confirm.`);

    document.getElementById('emailSubscribe').value = '';

    // In production, this would save to email list
}

// Unlock free resource
function unlockFreeResource(type) {
    console.log('Unlocking free resource:', type);

    let content = '';
    switch(type) {
        case 'vocab':
            content = 'Vocabulary lessons PDF is ready to download!\n\nDownload: [Link]\nFile size: 15MB';
            break;
        case 'grammar':
            content = 'Grammar basics PDF is ready!\n\nDownload: [Link]\nFile size: 8MB';
            break;
    }

    alert('✅ Access Granted!\n\n' + content);
}

// Start quiz
function startQuiz() {
    alert('🎮 Interactive Quiz\n\nStarting quiz in full-screen mode...\n\n(In production: would load interactive quiz interface)');
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('paymentModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Initialize payment method on modal open
// This would be enhanced in production

console.log('✨ BaMaxi Premium is ready to earn money!');
console.log('📊 Payment methods: Stripe, PayPal, Bank Transfer, Local (Vietnam)');
console.log('💰 Products ready: 3 courses + 6 digital products + bundles');
