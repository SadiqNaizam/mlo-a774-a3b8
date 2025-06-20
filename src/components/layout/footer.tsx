import React from 'react';
import { Link } from 'react-router-dom';
import { PlaySquare } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'About Us', href: '#' }, // Placeholder
    { label: 'Terms of Service', href: '#' }, // Placeholder
    { label: 'Privacy Policy', href: '#' }, // Placeholder
    { label: 'Contact', href: '#' }, // Placeholder
  ];

  return (
    <footer className="border-t bg-muted/40 text-muted-foreground">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <PlaySquare className="h-6 w-6 text-primary" />
          <span className="text-sm font-semibold">StreamPlatform</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {footerLinks.map((link) => (
            <Link key={link.label} to={link.href} className="hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-center text-sm">
          &copy; {currentYear} StreamPlatform. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;