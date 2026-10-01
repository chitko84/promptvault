import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'PromptVault', description: 'Premium AI prompt management platform', icons: { icon: '/favicon.svg' } };

// Apply saved dark mode before first paint to avoid a light flash.
const themeInit = `(function(){try{if(localStorage.getItem('promptvault_dark')==='1'){document.documentElement.classList.add('dark')}}catch(e){}})();`;

export default function RootLayout({ children }:{children:React.ReactNode}){
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {children}
      </body>
    </html>
  );
}
