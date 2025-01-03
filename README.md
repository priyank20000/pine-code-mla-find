# Indian Political Representatives Finder

A Next.js application that helps citizens find their local political representatives using PIN codes.

## Features

- 🔍 Search representatives by PIN code
- 👥 View MLA, MP, and Municipal Corporation members
- ✏️ Edit missing contact information
- 💾 24-hour data caching with MongoDB
- 🤖 AI-powered fallback for missing data

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: MongoDB with Mongoose
- **AI Services**: Google Gemini Pro API
- **Icons**: Lucide React

## APIs Used

1. **India Post PIN Code API**
   - Endpoint: `https://api.postalpincode.in/pincode/{pincode}`
   - Purpose: Fetch postal area details for PIN codes
   - Response: Post office details including state, district, and region

2. **Google Gemini Pro API**
   - Purpose: Generate representative information when postal API fails
   - Features:
     - Fallback data generation
     - Contextual information based on location
   - Environment Variable: `GEMINI_API_KEY`

3. **MongoDB Database**
   - Purpose: Cache representative data
   - Features:
     - 24-hour TTL (Time To Live) for documents
     - Automatic cleanup of expired data
   - Environment Variable: `MONGODB_URI`

## Environment Variables

Create a `.env` file with:

```env
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   └── representatives/
│   └── page.tsx          # Main page
├── components/           # React components
├── lib/
│   ├── api/             # API integration
│   ├── data/            # Data fetching
│   ├── types/           # TypeScript types
│   └── utils/           # Utility functions
└── public/              # Static assets
```

## Database Schema

### Representative Collection

```typescript
{
  pincode: string,
  areaDetails: {
    Name: string,
    District: string,
    State: string,
    // ... other postal details
  },
  representatives: {
    mla: {
      name: string,
      party: string,
      phone: string,
      email: string,
      constituency: string
    },
    mp: {
      // Similar to MLA structure
    },
    corporators: [{
      // Similar structure with ward instead of constituency
    }]
  },
  createdAt: Date // TTL index for 24-hour expiry
}
```

## API Routes

1. `GET /api/representatives`
   - Query params: `pincode`
   - Returns representative data from cache or generates new data

2. `POST /api/representatives/update`
   - Body: `{ name, phone, email }`
   - Updates contact information for a representative

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables
4. Run development server:
   ```bash
   npm run dev
   ```

## Development Guidelines

- Use TypeScript for type safety
- Follow Next.js 14 best practices
- Implement error handling for API calls
- Maintain responsive design
- Add loading states for better UX

## Error Handling

The application handles various error scenarios:
- Invalid PIN codes
- API failures
- Network issues
- Database connection errors
- Missing representative data

## Caching Strategy

- Representative data is cached in MongoDB
- TTL index automatically removes data after 24 hours
- Fresh data is generated on cache miss
- Fallback to Gemini AI when postal API fails

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a pull request
