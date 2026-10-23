# Operant AI Website - Quick Deployment Guide

Deploy your website **today** with these simple steps.

---

## ⚡ Fastest Option: Netlify (5 minutes)

### Step 1: Prepare Files
✅ You already have all website files ready in `website/` folder

### Step 2: Go to Netlify
1. Visit **netlify.com**
2. Click "Sign up" (use GitHub, Google, or email)
3. Choose plan (free tier is perfect for this)

### Step 3: Deploy
1. Click "Add new project" → "Deploy manually"
2. Drag and drop your entire `website/` folder
3. Netlify automatically deploys

**Result:** Your site is live at `operantai.netlify.com` in 30 seconds

### Step 4: Custom Domain (Optional)
1. In Netlify dashboard: Domain settings
2. Add your domain (operantai.com)
3. Follow DNS setup instructions

---

## 📝 Before Deploying - Personalization Checklist

Edit these files to add YOUR information:

### 1. index.html
Find and replace:
- **Line 93:** Update calendar link `"https://calendly.com/aderemi-ojo/30min"` → Your Calendly URL
- **Line 94:** Update email `"hello@operantai.com"` → Your email
- **Line 185-195:** Update testimonials with real clients (or remove section)

### 2. services.html  
- **Line 15:** Calendar link (same as above)
- **Line 16:** Email link (same as above)

### 3. case-studies.html
- Replace case study examples with YOUR project results
- Or use the provided templates and update company names
- Keep the same structure (Problem → Solution → Results)

### 4. All Pages
- **Footer:** Update copyright year and email

---

## 🎯 Personalization in 5 Minutes

**Search & Replace in your editor:**

1. Find: `https://calendly.com/aderemi-ojo/30min`  
   Replace: Your actual Calendly URL

2. Find: `hello@operantai.com`  
   Replace: Your email

3. Find: Case study company names  
   Replace: Your client names (anonymize if needed)

**That's it!** Your site is personalized.

---

## 🌐 Domain Options

### Free Names (for testing)
- `operantai.netlify.com` ← Automatic (no action needed)
- `operantai.vercel.com` ← If using Vercel

### Paid Domains (Professional)
| Registrar | Price | Recommendation |
|-----------|-------|-----------------|
| Namecheap | £4–8/year | Best value |
| Google Domains | £12/year | Easiest setup |
| GoDaddy | £9–12/year | Popular |

**Buy domain once, set up with Netlify in 5 minutes.**

---

## 📊 After You Deploy

### Day 1
✅ Test homepage on mobile and desktop  
✅ Test all buttons (CTAs, links)  
✅ Test ROI calculator  
✅ Try contact email  

### Day 2-3
✅ Submit to Google Search Console  
✅ Add to your LinkedIn profile  
✅ Share with first 10 prospects  

### Day 7
✅ Check analytics  
✅ Refine messaging based on feedback  
✅ Add testimonial from first client inquiry  

---

## 🔄 Common Updates (First Month)

### Add Your Logo
Replace text in navigation:

**Find in index.html (line 42):**
```html
<h1>Operant<span class="highlight">AI</span></h1>
```

**Replace with:**
```html
<img src="your-logo.png" alt="Operant AI Logo" style="height: 40px;">
```

### Update Navigation Menu
**If adding new pages:**
```html
<li><a href="blog.html">Blog</a></li>
<li><a href="about.html">About</a></li>
```

### Add Real Case Studies
Edit the case-study cards in `case-studies.html`. Structure:
- Company name + industry
- Problem (what was broken)
- Solution (what you built)
- Results (specific metrics)
- Quote from client

---

## 🚀 Deployment Steps (Command-by-Command)

### Using Netlify CLI (Advanced)

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Navigate to your website folder
cd "c:\dev\AI Biz\OperantAIAgency\website"

# 3. Deploy
netlify deploy --prod

# 4. Site is live!
```

---

## ✅ Quality Checklist Before Going Live

- [ ] All links work (test each button, link)
- [ ] Email link sends to your email
- [ ] Calendar link opens your Calendly
- [ ] ROI calculator works (try entering numbers)
- [ ] Mobile view looks good
- [ ] Contact information is correct
- [ ] No typos or test text left in
- [ ] Case studies make sense
- [ ] Testimonials are appropriate

---

## 🆘 Troubleshooting

### "Site won't load"
→ Check all HTML files are in same folder  
→ Verify no special characters in file names

### "Links don't work"
→ Check URLs are correct in HTML  
→ Test in browser console

### "Styling looks broken"
→ Clear browser cache (Ctrl+Shift+Delete)  
→ Check styles.css is loaded

### "Calculator doesn't work"
→ Verify script.js is in same folder  
→ Check browser console for errors

---

## 📞 Hosting Support

### Netlify Support
- Free plan: Community support
- Paid plan: Email support
- Website: support.netlify.com

### Domain Support (Namecheap, etc.)
- Each registrar has support docs
- Google domain setup is usually easiest

---

## 🎯 Next: Marketing Your Site

### Immediate (This Week)
1. Share link on LinkedIn
2. Email to first 20 prospects
3. Add to email signature
4. Share in relevant communities

### Week 2
1. Update LinkedIn profile with website link
2. Blog about your first case study
3. Ask clients for LinkedIn recommendations

### Ongoing
1. Add new case studies monthly
2. Update with latest testimonials
3. Mention wins on social media

---

## 📈 Measuring Success

### Track These Metrics (Free in Google Analytics)

**On your Netlify dashboard:**
- Daily visitors
- Geographic location
- Device type (mobile vs desktop)
- Top pages

**Next:** Set up goals
- CTA clicks
- Discovery calls booked
- Email sign-ups

---

## 🎓 After Deployment Training

### For Your Team
1. Send this README to your team
2. Show them how to update case studies
3. Document your update process

### For Clients
1. Share your new website in calls
2. Include it in proposals
3. Add to pitches

---

## 💼 What to Do With Your Website

### Use It For:
✅ **Sales Calls:** Share screen to show services  
✅ **Emails:** Link in signature  
✅ **LinkedIn:** Post the link  
✅ **Proposals:** Include website URL  
✅ **Credibility:** "We're not just an idea—we're a real company"  

### Expected Results (First 30 Days):
- 100–300 visitors
- 3–8 discovery call bookings
- 1–2 actual inquiries to respond to

---

## 🎉 You're Done!

**Your professional website is ready to go live.**

**Three options to deploy:**

| Option | Time | Cost | Best For |
|--------|------|------|----------|
| **Netlify** | 1 min | Free | Getting started fast |
| **GitHub Pages** | 5 min | Free | Developers |
| **Traditional Host** | 30 min | £5–10/mo | Long-term |

**Recommendation:** Start with Netlify (free), upgrade to custom domain in Week 2.

---

## 📋 30-Day Action Plan

```
Week 1:
☐ Deploy to Netlify
☐ Add custom domain (optional)
☐ Test all functionality
☐ Share website on LinkedIn
☐ Send to 20 prospects

Week 2:
☐ Check analytics
☐ Update with first testimonial/case study
☐ Follow up with clicks/inquiries
☐ Refine based on feedback

Week 3-4:
☐ Add blog (if desired)
☐ Update FAQ section
☐ Collect more case studies
☐ Optimize copy based on feedback
```

---

## 🚀 You're Official

**Congratulations!** You now have a professional, conversion-optimized website for Operant AI.

This is your digital storefront. Keep it updated, share it everywhere, and watch it drive leads.

**Next step:** Book your first discovery call and prove the model works.

---

**Questions?** See README.md for more details.  
**Ready?** Deploy now at netlify.com

**Good luck! 🎉**
