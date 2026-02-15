# Task Manager Panel

A task management panel built with Nuxt 3, Vuetify, and TypeScript. The home page shows a **dashboard** with task stats; the **admin panel** organizes tasks by status in a Kanban-style view.

## Features

### Core Capabilities

- **Dashboard** — “Today at a Glance” stat cards: due today, upcoming this week, completed today, overdue (theme-colored, gradient backgrounds)
- **Admin panel** — Full task management (create, edit, delete) in a status-based Kanban (Todo, In progress, Done)
- Drag & drop to move tasks between status columns
- Search, date range, sort, and filters
- Real-time sync across browser tabs
- Sound notifications (create / complete task)
- **Theme change** — Switch between light and dark mode (Vuetify; custom colors)
- **Language change** — English and Persian (fa), with RTL support
- Type-safe permission-based access control
- Jalali (Persian) calendar support

## Installation & Setup

### IDE and TypeScript in Vue Files

If you see "Cannot find name" errors in `.vue` files (e.g. for `openCreate` or script setup variables):

1. Install the **Vue - Official (Volar)** extension and disable **Vetur** if it is installed.
2. Run **Vue: Reload Project** or **Developer: Reload Window** from the Command Palette.
3. The project uses `.vscode/settings.json`; with Cursor/VS Code, Volar in Take Over Mode is used for Vue type-checking.

The code runs correctly at runtime; these errors are development-time type-check only.

### Prerequisites

- **Node.js 20 LTS**

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Test Login Credentials

For now, a single admin user is available:

- **Admin:** username `admin`, password `admin123`

Log in at `/login`. You can use the **dashboard** at `/` and the **admin** task board at `/admin`.

## Enabling Sound Notifications

To hear sounds when creating or completing tasks, allow **Sound** for the site in your browser (address bar → site permissions). Click the page once if prompted. Ad blockers may block audio.

## Project Structure

```
├── app.vue             # Root component
├── assets/             # Styles (SCSS) and processed assets
├── components/         # Vue components
├── composables/        # Shared composables
├── i18n/               # Internationalization (locales: en, fa)
├── layouts/            # Layouts
├── middleware/        # Route middleware
├── pages/              # Nuxt pages
├── plugins/            # Nuxt plugins (e.g. Vuetify)
├── public/             # Static files served at root (e.g. favicon)
├── stores/             # Pinia stores
├── types/              # TypeScript type definitions
├── utils/              # Jalali date utilities
└── nuxt.config.ts      # Nuxt configuration
```

## Tech Stack

- **Nuxt 3** — App framework
- **Vue 3** — Frontend framework
- **Vuetify 3** — UI component library
- **TypeScript** — Type safety
- **Pinia** — State management
- **VueUse** — Composition utilities
- **VueDraggable** — Drag & drop

## Technical Highlights

- **Real-time sync:** BroadcastChannel for cross-tab sync
- **Dashboard:** Stat cards use Vuetify theme colors (primary, purple, yellow, error) with gradient backgrounds
- **Status-based view:** Kanban-style columns (Todo, In progress, Done) on the admin page
- **Notification sound:** Web Audio API (requires sound permission)
- **Permission system:** Type-safe permissions
- **Theming:** Light and dark Vuetify themes with custom palette (including error colors)
- **Responsive design:** Mobile-friendly layout
- **RTL support:** Full right-to-left support

## License

MIT License
