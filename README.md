# Habit Tracker

A comprehensive habit tracking application built with React and Skapi. Track all aspects of your life including job applications, education, leisure activities, chores, sleep, and more.

## Features

- **Job Application Tracking**: Track applications sent, interviews, shortlists, and offers
- **Time Tracking**: Record time spent on applications (cover letters, forms), education, and other activities
- **Life Activities**: Track leisure time, holidays, social interactions, house chores, sleep, walks, and more
- **Detailed Descriptions**: Every activity includes a description to help explain your decisions
- **User Authentication**: Secure login/signup with Skapi
- **Activity Filtering**: Filter activities by type
- **Responsive Design**: Works on desktop and mobile devices

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

3. Edit `.env` and add your Skapi service ID:
```
VITE_SKAPI_SERVICE_ID=your-skapi-service-id-here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

**Note:** The `.env` file is already included in `.gitignore` to keep your service ID secure.

## Usage

1. **Sign Up/Login**: Create an account or login with your existing credentials
2. **Add Activities**: Use the "Add New Activity" form to track your activities
3. **View Activities**: Browse all your tracked activities in the list below
4. **Filter**: Use the filter dropdown to view specific activity types
5. **Delete**: Click the × button on any activity card to delete it

## Activity Types

- **Job Application Sent**: Track when you send a job application
- **Job Interview**: Record interview events
- **Job Shortlist**: Track when you're shortlisted
- **Job Offer Received**: Record job offers
- **Application Time**: Time spent writing cover letters or filling applications
- **Education/Recap**: Time spent learning or reviewing concepts
- **Leisure Time**: Track your leisure activities
- **Holiday**: Record holiday time
- **Talking to Friends**: Track social interactions
- **House Chores**: Record time spent on household tasks
- **Sleep**: Track your sleep duration
- **Walk/Exercise**: Record walks and exercise
- **Other Activity**: Any other activity you want to track

## Technology Stack

- React 18
- Vite
- Skapi (Backend as a Service)
- CSS3

## Project Structure

```
habit-tracker/
├── src/
│   ├── components/
│   │   ├── Auth.jsx          # Login/Signup component
│   │   ├── Auth.css
│   │   ├── ActivityForm.jsx  # Form to add new activities
│   │   ├── ActivityForm.css
│   │   ├── ActivityList.jsx  # Display list of activities
│   │   └── ActivityList.css
│   ├── App.jsx               # Main app component
│   ├── App.css
│   ├── main.jsx              # React entry point
│   ├── skapi.js              # Skapi initialization
│   └── index.css             # Global styles
├── package.json
└── README.md
```

## Notes

- All data is stored securely in your private Skapi database
- Activities are automatically sorted by date (newest first)
- You can load more activities using the "Load More" button
- Each activity includes a timestamp for accurate tracking
