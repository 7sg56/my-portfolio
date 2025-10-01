# Centralized Data Management

This portfolio uses a centralized data management system located in `lib/data.ts`. All projects, experience, resume, and profile information is managed from this single location.

## Files Updated

- ✅ `lib/data.ts` - Central data management
- ✅ `components/terminal/commands.tsx` - Updated to use centralized data
- ✅ `data/projects.ts` - Now re-exports from centralized data

## How to Update Data

### 1. Projects
To add, update, or remove projects, edit the `PROJECTS` array in `lib/data.ts`:

```typescript
export const PROJECTS: Project[] = [
  {
    name: "Your Project Name",
    slug: "project-slug",
    desc: "Project description",
    tech: ["Next.js", "React", "TypeScript"],
    repo: "https://github.com/username/repo",
    demo: "https://your-demo.com",
  },
  // Add more projects...
];
```

### 2. Experience
To update experience, edit the `EXPERIENCE` array in `lib/data.ts`:

```typescript
export const EXPERIENCE: Experience[] = [
  {
    title: "Job Title",
    company: "Company Name",
    period: "2023 - Present",
    description: "Job description",
    type: 'work' // 'work' | 'education' | 'volunteer' | 'project'
  },
  // Add more experience...
];
```

### 3. Resume
To update resume information, edit the `RESUME` object in `lib/data.ts`:

```typescript
export const RESUME: Resume = {
  url: "/resume.pdf", // Path to your resume file
  filename: "Your_Name_Resume.pdf", // Download filename
  lastUpdated: "2024-01-15" // Update this when you update your resume
};
```

### 4. Profile
To update your profile information, edit the `PROFILE` object in `lib/data.ts`:

```typescript
export const PROFILE: Profile = {
  name: "Your Name",
  handle: "your-handle",
  tagline: "Your tagline",
  about: "Your about text...",
  // ... other profile fields
};
```

## Utility Functions

The centralized data system provides utility functions:

- `getAllProjects()` - Get all projects
- `getProject(slug)` - Get specific project by slug or index
- `getAllExperience()` - Get all experience entries
- `getResume()` - Get resume information
- `getProfile()` - Get profile information
- `getProjectsCount()` - Get projects count for dynamic text

## Benefits

1. **Single Source of Truth** - All data is managed in one place
2. **Consistency** - Same data across terminal, desktop, and other components
3. **Easy Updates** - Change data once, updates everywhere
4. **Type Safety** - TypeScript ensures data consistency
5. **Utility Functions** - Helper functions for common operations

## Usage in Components

Import the data and utility functions:

```typescript
import { 
  PROJECTS, 
  EXPERIENCE, 
  RESUME, 
  PROFILE, 
  getProject, 
  getAllProjects 
} from "@/lib/data";
```

This system ensures that your portfolio data is always consistent across all components and easy to maintain.
