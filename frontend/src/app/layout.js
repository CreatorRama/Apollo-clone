// frontend/src/app/layout.js
import './globals.css';

export const metadata = {
  title: 'Apollo 247 Clone',
  description: 'A clone of Apollo 247 doctors listing page',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}