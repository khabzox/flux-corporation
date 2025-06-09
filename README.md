# Flux Corporation

A modern Next.js application with a rich UI built using Radix UI components, Tailwind CSS, and React. The project includes form validation, drag-and-drop functionality, and responsive layouts.

## Color Scheme

The application uses a custom blue color palette:

- **Primary Blue**: `#005CE5` - Main brand color for buttons, links, and primary actions
- **Dark Blue-Gray**: `#344051` - Text color and secondary elements
- **Supporting Colors**: Various blue tints and shades derived from the primary palette

## Features

- **UI Components**: Built with Radix UI primitives and styled with Tailwind CSS
- **Form Handling**: React Hook Form with Zod validation
- **Drag and Drop**: @hello-pangea/dnd for interactive interfaces
- **Data Visualization**: Recharts for charts and graphs
- **Date Handling**: date-fns and react-day-picker for calendar functionality
- **Responsive Layouts**: react-resizable-panels for adjustable panels
- **Theming**: Next Themes for dark/light mode support

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/khabzox/flux-corporation
   ```

2. Navigate to the project directory:
   ```bash
   cd flux-corporation
   ```

3. Install dependencies using pnpm (recommended):
   ```bash
   pnpm install
   ```

## Development

Start the development server:
```bash
pnpm dev
```

Build for production:
```bash
pnpm build
```

Start production server:
```bash
pnpm start
```

Lint your code:
```bash
pnpm lint
```

## Configuration

The project uses environment variables for configuration. Create a `.env` file in the root directory with your settings:

```env
# Example environment variables
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS with animations
- Radix UI components
- React Hook Form + Zod
- Various UI libraries (lucide-react, recharts, etc.)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bugfix
3. Submit a pull request

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Radix UI for accessible primitives
- Tailwind Labs for CSS framework
- Vercel for Next.js framework
- All open-source contributors of the dependencies used