# Contact Form Configuration Guide

## Overview
Your Qatmeer landing page uses Formspree for form handling. The contact information section has been removed, leaving only the contact form for pilot program applications.

## Current Form Setup
- **Form Location**: Contact section at bottom of page
- **Current Action**: `https://formspree.io/f/your_form_id` (placeholder)
- **JavaScript Config**: `script.js` line 12

## How to Configure the Form

### Option 1: Formspree (Recommended - Free & Easy)

1. **Create Formspree Account**
   - Go to [formspree.io](https://formspree.io)
   - Sign up for a free account
   - Create a new form project

2. **Get Your Form ID**
   - After creating the form, you'll get an endpoint like: `https://formspree.io/f/xabcdefg`
   - Copy the form ID (the part after `/f/`)

3. **Update Your Website**
   - Replace `your_form_id` in **two locations**:
   
   **File: index.html (line ~615)**
   ```html
   <form class="contact-form" action="https://formspree.io/f/YOUR_ACTUAL_FORM_ID" method="POST">
   ```
   
   **File: script.js (line ~12)**
   ```javascript
   formEndpoint: 'https://formspree.io/f/YOUR_ACTUAL_FORM_ID',
   ```

4. **Deploy Changes**
   ```bash
   git add index.html script.js
   git commit -m "Configure Formspree form endpoint"
   git push
   ```

### Option 2: Email Redirect (Simple Alternative)

Replace the form action with a mailto link:

**File: index.html**
```html
<form class="contact-form" action="mailto:your-email@domain.com" method="post" enctype="text/plain">
```

**Note**: This opens the user's email client instead of submitting through the website.

### Option 3: Custom Backend

If you have your own server, replace the form action with your endpoint:
```html
<form class="contact-form" action="https://your-domain.com/api/contact" method="POST">
```

## Form Fields Included

The contact form collects:
- **Name** (required)
- **Email** (required) 
- **Company** (optional)
- **Message** (required)

## Testing the Form

1. After configuring Formspree, test the form on your live website
2. Submit a test message
3. Check if you receive the email
4. Verify the success message appears on the website

## Formspree Features (Free Plan)

- ✅ 50 submissions/month
- ✅ Email notifications
- ✅ Spam filtering
- ✅ Form analytics dashboard
- ✅ No coding required

## Security Notes

- Formspree handles spam protection automatically
- All form submissions are encrypted in transit
- No sensitive data is stored on your GitHub Pages site
- Email addresses are validated before submission

---

**Quick Setup Commands:**

```bash
# After getting your Formspree form ID:
# 1. Edit the files with your form ID
# 2. Commit and deploy:

git add index.html script.js
git commit -m "Configure contact form with Formspree"
git push
```

Your form will be live within minutes after pushing the changes!