# EmailJS Setup Guide

## 🦇 Batman Portfolio - Email Integration Setup

This guide will help you set up EmailJS to enable contact form functionality on your Batman portfolio.

## 📧 What is EmailJS?

EmailJS is a free, open-source service that allows you to send emails directly from client-side JavaScript without needing a backend server. It's perfect for portfolio websites!

## 🚀 Setup Steps

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider:
   - **Gmail** (Recommended for your case)
   - **Outlook**
   - **Yahoo**
   - Or any other provider
4. Follow the setup instructions for your chosen provider
5. Note down your **Service ID**

### Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template:

```
Subject: New Contact from Batman Portfolio

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
Sent from Batman Portfolio Contact Form
```

4. Save the template and note down your **Template ID**

### Step 4: Get Your Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

### Step 5: Update Your Code
Replace the placeholder values in `script.js`:

```javascript
// Replace these values in script.js
emailjs.init("IJHyYiAnH5GLCXS1d"); // Your actual public key
emailjs.send('service_246q42c', 'template_v16y9r1', templateParams)
```

## 🔧 Configuration Example

After setup, your `script.js` should look like this:

```javascript
// Initialize EmailJS with your actual public key
emailjs.init("IJHyYiAnH5GLCXS1d"); // Your actual public key

// Send email with your actual service and template IDs
emailjs.send('service_246q42c', 'template_9rxgw5i', templateParams)
```

## 📊 Free Plan Limits

- **200 emails per month** (perfect for portfolio)
- **2 email services**
- **2 email templates**
- **No credit card required**

## 🛡️ Security Features

- **Rate limiting** to prevent spam
- **Domain restrictions** (optional)
- **Template validation**
- **Email verification**

## 🎯 Benefits for Your Portfolio

1. **No Backend Required**: Works with static hosting
2. **Professional**: Emails come directly to your Gmail
3. **Reliable**: 99.9% uptime
4. **Free**: Perfect for personal portfolios
5. **Easy Setup**: 5-minute configuration

## 🔍 Testing

1. Fill out the contact form on your portfolio
2. Click "Send Message"
3. Check your Gmail inbox
4. You should receive the email with the visitor's details

## 🆘 Troubleshooting

### Common Issues:
- **"Service not found"**: Check your Service ID
- **"Template not found"**: Check your Template ID
- **"Invalid public key"**: Verify your Public Key
- **Emails not received**: Check spam folder

### Support:
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Community Forum: [https://github.com/emailjs-com/emailjs-sdk](https://github.com/emailjs-com/emailjs-sdk)

## 🎉 You're All Set!

Once configured, your Batman portfolio will have a fully functional contact form that sends emails directly to your Gmail inbox. No server setup required!

---

*"Like Batman's communication system, your portfolio now has a direct line to reach you!"* 🦇📧
