# Carbon Copy 🌱

A comprehensive carbon footprint tracking application for sustainable travel. Track, analyze, and reduce your travel emissions with intelligent insights powered by SAGE AI.

## Features

### 🏠 Core Features
- **Dashboard**: Real-time carbon footprint visualization with weekly, monthly, and yearly views
- **Carbon Calculator**: Calculate emissions for different travel modes with customizable parameters
- **Travel History**: Log and track all your trips with detailed emission data
- **Scheduled Travels**: Plan future trips and estimate their carbon impact
- **SAGE AI Assistant**: Get personalized recommendations for reducing your carbon footprint

### 👤 User Management
- **Authentication**: Secure email/password authentication with session management
- **User Profiles**: Personalized profiles with travel preferences and statistics
- **Onboarding Flow**: Guided setup for new users
- **Settings**: Manage notifications, privacy, and account preferences

### 📊 Analytics
- **Emissions Summary**: Track emissions by week, month, and year
- **Trip Breakdown**: Detailed analysis of individual trips
- **Smartwatch Integration**: Sync walking and cycling activities (coming soon)
- **Notifications**: Stay informed about your carbon footprint progress

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Authentication**: Custom JWT-based auth with httpOnly cookies

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (Neon recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd carboncopyapp4
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   \`\`\`env
   # Database Configuration (Neon)
   DATABASE_URL=your_neon_database_url
   PGHOST=your_neon_host
   PGUSER=your_neon_user
   PGDATABASE=your_database_name
   PGPASSWORD=your_database_password
   PGPORT=5432
   
   # Optional: For local development
   # PGHOST=localhost
   # PGUSER=postgres
   # PGDATABASE=carbon_copy
   # PGPASSWORD=your_password
   \`\`\`

4. **Initialize the database**
   
   Run the SQL scripts in order:
   \`\`\`bash
   # First, create all tables
   psql -U your_user -d your_database -f scripts/init-database.sql
   
   # Then, seed with test data (optional)
   psql -U your_user -d your_database -f scripts/seed-test-data.sql
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

### Tables

- **users**: User authentication and account information
- **user_profiles**: Extended user profile data and travel preferences
- **travel_logs**: Historical travel records with emissions data
- **scheduled_travels**: Upcoming planned trips
- **emissions_summary**: Aggregated emissions data by time period
- **smartwatch_activities**: Synced activity data from wearables
- **notifications**: User notifications and alerts
- **sage_conversations**: Chat history with SAGE AI
- **user_settings**: User preferences and settings

## Project Structure

\`\`\`
carboncopyapp4/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── profile/         # User profile management
│   │   ├── travel-logs/     # Travel log CRUD
│   │   ├── scheduled-travels/
│   │   ├── notifications/
│   │   └── emissions-summary/
│   ├── dashboard/           # Main dashboard page
│   ├── calculator/          # Carbon calculator
│   ├── history/             # Travel history
│   ├── sage-ai/             # AI assistant chat
│   ├── profile/             # User profile pages
│   ├── login/               # Login page
│   ├── signup/              # Registration page
│   ├── onboarding/          # New user onboarding
│   └── notifications/       # Notifications page
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── bottom-nav.tsx       # Bottom navigation
│   └── menu-drawer.tsx      # Side menu drawer
├── lib/                     # Utility libraries
│   ├── db.ts               # Database connection and types
│   ├── auth.ts             # Authentication utilities
│   ├── hooks/              # Custom React hooks
│   └── utils.ts            # Helper functions
├── scripts/                 # Database scripts
│   ├── init-database.sql   # Table creation
│   └── seed-test-data.sql  # Sample data
└── public/                  # Static assets
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Travel Logs
- `GET /api/travel-logs?userId={id}` - Get all travel logs
- `POST /api/travel-logs` - Create new travel log

### Scheduled Travels
- `GET /api/scheduled-travels` - Get scheduled trips
- `POST /api/scheduled-travels` - Schedule new trip

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications` - Mark notification as read

### Emissions
- `GET /api/emissions-summary?userId={id}&periodType={type}` - Get emissions summary

## Test Account

For testing purposes, use these credentials:

- **Email**: test@carboncopy.com
- **Password**: password123
- **User ID**: 550e8400-e29b-41d4-a716-446655440000

## Emission Calculation

The app uses the following emission factors (kg CO₂ per km):

- **Walking/Bicycle**: 0 kg
- **Motorcycle**: 0.08 kg
- **Tricycle**: 0.06 kg
- **Jeepney**: 0.07 kg
- **Car**: 0.12 kg (or calculated from fuel consumption)
- **Bus**: 0.05 kg
- **Train**: 0.04 kg
- **Plane**: 0.25 kg

For vehicles with fuel consumption:
\`\`\`
CO₂ emission = (fuel consumption L/100km) × distance × 2.31 kg CO₂/L
\`\`\`

## Color System

The app uses an earth-toned color palette:

- **Cream** (#fff8e7): Background
- **Olive** (#5c6b3d): Primary actions
- **Sage** (#b8d88e): Accents and highlights
- **Brown** (#3d3020): Text and headings

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub or contact the development team.

---

**Carbon Copy** - Track. Reduce. Travel Green. 🌍
