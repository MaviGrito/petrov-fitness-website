# Cal.com Setup Guide

## Creating Your Account
1. Go to [cal.com](https://cal.com) and sign up
2. Set your username to `mikhail-petrov` (or update the username in `src/data/calcom.ts`)

## Event Types to Create
Create these 5 event types in your Cal.com dashboard:

### 1. First PT Session (50% OFF)
- **Slug:** `first-pt-session`
- **Duration:** 60 minutes
- **Description:** "Book your first personal training session at 50% off."
- **Location:** Goodlife Clubs Payneham OR Online

### 2. Regular PT Session
- **Slug:** `regular-pt-session`
- **Duration:** 60 minutes
- **Location:** Goodlife Clubs Payneham

### 3. Free Consultation
- **Slug:** `free-consultation`
- **Duration:** 15-30 minutes
- **Location:** Phone call or Video call
- **Price:** Free

### 4. Online Coaching Consultation
- **Slug:** `online-coaching-consultation`
- **Duration:** 30 minutes
- **Location:** Video call (Zoom/Google Meet)

### 5. Boxing Class
- **Slug:** `boxing-class`
- **Duration:** 60 minutes
- **Location:** Goodlife Clubs Payneham

## Branding
1. Go to **Settings → Appearance**
2. Upload the Petrov Fitness logo
3. Set brand color to `#e1c340`
4. Set theme to **Dark**

## Availability
1. Go to **Availability** in your dashboard
2. Set your weekly schedule
3. Set minimum notice to 24 hours
4. Set buffer time between sessions: 15-30 minutes

## Updating the Username
If you use a different Cal.com username, update `src/data/calcom.ts`:
```typescript
export const calConfig = {
  username: 'your-username-here', // Change this
  // ...
};
```
