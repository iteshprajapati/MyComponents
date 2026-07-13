# Hackathon Component Library

A premium, modular, and minimalist React + SCSS component library designed for rapid development in hackathons and fast-paced projects. Fully customizable via CSS variables, featuring dark-mode overrides, static hover states, and a built-in custom color picker.

## 🚀 How to Run the Showcase App Locally

To browse the component catalog, copy source codes, and test the custom color picker locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/iteshprajapati/MyComponents.git
   cd MyComponents/MyComponents
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the Vite development server**:
   ```bash
   npm run dev
   ```

Open your browser and navigate to `http://localhost:5173` to explore the interactive playground.

---

## 📦 How to Use Components in Your Project

This library uses a **copy-paste component architecture** (similar to shadcn/ui) to give you total control over the markup and styles.

### Step 1: Initialize Global Styles & Variables

Copy [src/index.scss](file:///d:/MyComponents/MyComponents/src/index.scss) into your project's root styling entrypoint (e.g., `src/index.scss`). This file sets up the modern typography, layout tokens, desaturated semantic states, and default CSS custom variables:

```scss
/* Custom theme variables configured in :root */
:root {
  --primary-base: 215, 25%, 27%; /* Slate Charcoal */
  --primary: hsl(var(--primary-base));
  --font-sans: 'Plus Jakarta Sans', sans-serif;
  --radius-md: 12px;
  /* ... */
}
```

Import this stylesheet in your `src/main.jsx` entry file:
```javascript
import './index.scss';
```

---

### Step 2: Copy Components

Navigate to `src/components/` and copy any of the following folders into your React project:

*   **Atoms** (Basic elements): `Button`, `Input`, `Selection` (Checkbox, Radio, Switch), `Badge`, `Progress`, `Divider`.
*   **Molecules** (Small layout units): `StatCard`, `SearchBar`, `TabStrip`, `Tooltip`, `Timeline`, `AvatarGroup`.
*   **Organisms** (Complex widgets): `ModalDrawer`, `EventCalendar`, `UserProfileCard`, `AccordionGroup`, `NotificationCenter`.
*   **Templates** (Pre-designed layout structures): `SmartDataTable`, `AnalyticsDashboard`, `KanbanBoard`, `ChatHub`, `MediaDropzone`.
*   **Pages** (Ready-to-use template layouts): `DashboardLayout`, `LandingPage`, `OnboardingWizard`, `AuthScreens`, `SystemViews`.

---

### Step 3: Import & Render

Here is how you can render these components in your files:

#### 1. Rendering a Custom Button (Atom)
```javascript
import { Button } from './components/atoms/Button/Button';
import { Play } from 'lucide-react';

function App() {
  return (
    <Button 
      variant="solid" 
      color="primary" 
      leftIcon={<Play size={16} />}
      onClick={() => console.log('Playing...')}
    >
      Start Action
    </Button>
  );
}
```

#### 2. Rendering a Search Bar with Suggestions (Molecule)
```javascript
import { SearchBar } from './components/molecules/SearchBar/SearchBar';

function SearchPage() {
  const suggestions = ['Dashboard Layout', 'Smart Table', 'Kanban Board', 'Chat Hub'];

  return (
    <SearchBar 
      placeholder="Search components..." 
      suggestions={suggestions}
      onSearch={(query) => console.log('User searched for:', query)}
    />
  );
}
```

#### 3. Rendering a Smart Sorting Data Table (Template)
```javascript
import { SmartDataTable } from './components/templates/SmartDataTable/SmartDataTable';
import { Badge } from './components/atoms/Badge/Badge';

const columns = [
  { key: 'name', label: 'User Name', sortable: true },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status', render: (row) => (
    <Badge color={row.status === 'Active' ? 'success' : 'danger'}>{row.status}</Badge>
  )}
];

const data = [
  { id: 1, name: 'Alexander Wright', role: 'Developer', status: 'Active' },
  { id: 2, name: 'Jane Smith', role: 'Designer', status: 'Active' }
];

function AdminPanel() {
  return (
    <SmartDataTable 
      columns={columns} 
      data={data} 
      pageSize={5} 
    />
  );
}
```

---

## 🎨 Customizing Color Themes Dynamically

You can override the accent colors at runtime by setting CSS custom properties:

```javascript
// Change the highlight color dynamically in your code
document.documentElement.style.setProperty('--primary', '#2563eb'); // Blue
document.documentElement.style.setProperty('--primary-hover', '#1d4ed8');
```
All custom button shadows, borders, active tags, and status trackers in the library will instantly adapt to the newly set color.