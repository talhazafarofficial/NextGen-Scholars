import "../styles/main.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'NextGen Scholars',
  description: 'A platform for aspiring scholars to connect and grow',
  icons: {
    icon: '/icon.png', 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
