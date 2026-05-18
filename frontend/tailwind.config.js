/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Corporate Brand Colors
        dveinBlue: '#0056D2',
        dveinGreen: '#10B981',
        // Backgrounds
        bgLight: '#FFFFFF',
        bgGray: '#F4F7F6',
        // Refined Text Palette
        textPrimary: '#0D1117',   // Near-black — headings
        textBody: '#374151',      // Dark slate — body paragraphs
        textMuted: '#6B7280',     // Medium gray — subtext, captions
        textLight: '#9CA3AF',     // Light gray — placeholders, footer meta
        textAccent: '#0056D2',    // DVein blue — links, highlights
        textSuccess: '#059669',   // Emerald — positive badges
        // Legacy aliases
        textMain: '#0D1117',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.05)', // Soft shadow
      }
    },
  },
  plugins: [],
}