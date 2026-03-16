# 🌳 Family Tree

A web-based interactive family tree application built with **Next.js** and **FamilyTreeJS**, powered by **Airtable** as the data source.

## ✨ Features

- Interactive family tree visualization using FamilyTreeJS (Hugo template)
- Gender-based node coloring (blue for male, orange for female)
- Multiple orientation options (Top, Bottom, Left, Right, and variants)
- Expand/collapse nodes
- Export to PDF
- Real-time data refresh
- Smooth animations and pan/zoom support
- Dark mode support
- Responsive layout

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- [FamilyTreeJS](https://balkan.app/FamilyTreeJS) (local)
- [Airtable](https://airtable.com/) as database

## 📋 Prerequisites

- Node.js >= 20.9.0
- An Airtable account with a base configured

## ⚙️ Airtable Setup

Create a table named **`Members`** with the following fields:

| Field  | Type    | Description                        |
|--------|---------|------------------------------------|
| `id`   | Number  | Unique numeric ID                  |
| `name` | Text    | Full name                          |
| `gender` | Text  | `male` or `female`                |
| `fid`  | Number  | Father's ID                        |
| `mid`  | Number  | Mother's ID                        |
| `pids` | Text    | Partner IDs (comma-separated)      |
| `img`  | Text    | Image URL (optional)               |

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd family-tree
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory:
```env
AIRTABLE_TOKEN=your_airtable_personal_access_token
AIRTABLE_BASE_ID=your_airtable_base_id
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure
```
family-tree/
├── pages/
│   ├── _app.js          # App wrapper
│   ├── _document.js     # HTML document
│   ├── index.js         # Main family tree page
│   └── api/
│       └── family.js    # API route — fetches data from Airtable
├── public/
│   └── familytree.js    # FamilyTreeJS library (local)
├── styles/
│   └── globals.css      # Global styles
└── .env.local           # Environment variables (not committed)
```

## 🌐 API

### `GET /api/family`

Fetches all family members from Airtable and returns them as a JSON array compatible with FamilyTreeJS node format.

**Response example:**
```json
[
  { "id": 1, "name": "John Doe", "gender": "male", "pids": [2] },
  { "id": 2, "name": "Jane Doe", "gender": "female", "pids": [1], "fid": 3 }
]
```

## 🎛️ Orientation Options

The tree orientation can be changed via the dropdown on the page:

| Value | Orientation   |
|-------|---------------|
| 0     | Top           |
| 1     | Bottom        |
| 2     | Right         |
| 3     | Left          |
| 4     | Top Left      |
| 5     | Bottom Left   |
| 6     | Right Top     |
| 7     | Left Top      |

## 📦 Scripts
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

## 📄 License

This project is for private/personal use.