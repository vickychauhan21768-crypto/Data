# JobHub - Job Booking Platform

A simple job posting and browsing platform built with Node.js and Express.

## Features

- 📝 Post new job listings
- 📋 Browse all available jobs
- 🗑️ Delete job listings
- 📱 Responsive design
- ⚡ Fast and lightweight

## Project Structure

```
├── server.js           # Express server
├── package.json        # Dependencies
├── public/
│   ├── index.html      # Home page (post jobs)
│   ├── jobs.html       # Browse all jobs
│   ├── style.css       # Styling
│   └── script.js       # Frontend JavaScript
└── README.md
```

## Installation

1. Navigate to the project directory:
   ```bash
   cd Website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Server

Start the development server:
```bash
npm start
```

The server will run on `http://localhost:3000`

## Usage

1. **Home Page** (`http://localhost:3000/`)
   - Post new job listings
   - View recently posted jobs

2. **Browse Jobs** (`http://localhost:3000/jobs`)
   - View all posted jobs
   - Delete job listings

## API Endpoints

- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create a new job
- `GET /api/jobs/:id` - Get a specific job
- `DELETE /api/jobs/:id` - Delete a job

## Future Enhancements

- Add MongoDB database integration
- User authentication
- Job applications
- Advanced search and filtering
- Email notifications
- Admin dashboard

## License

ISC
