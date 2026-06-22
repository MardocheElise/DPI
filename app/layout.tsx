// // // app/layout.tsx

// // import type { Metadata } from "next";
// // import { Inter } from "next/font/google";
// // import "./globals.css";

// // const inter = Inter({ subsets: ["latin"] });

// // export const metadata: Metadata = {
// //   title: "DPI - Dossier Patient Informatisé",
// //   description: "Système de gestion du Dossier Patient Informatisé",
// // };

// // export default function RootLayout({
// //   children,
// // }: Readonly<{
// //   children: React.ReactNode;
// // }>) {
// //   return (
// //     <html lang="fr">
// //       <body className={inter.className}>{children}</body>
// //     </html>
// //   );
// // }
















// import type { Metadata } from "next";
// import "./globals.css";
// import Sidebar from "@/components/Sidebar";

// export const metadata: Metadata = {
//   title: "DPI - Dossier Patient Informatisé",
//   description: "Système de gestion du dossier patient informatisé",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="fr">
//       <head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap"
//           rel="stylesheet"
//         />
//       </head>
//       <body className="min-h-screen" style={{ background: "#f0fdfa" }}>
//         <Sidebar />
//         <main className="ml-64 min-h-screen">
//           {children}
//         </main>
//       </body>
//     </html>
//   );
// }





// Route: app/layout.tsx — Layout racine PinHome

import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Geist } from "next/font/google";
import { cn } from "@/lib/data/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "PinHome — Property Management",
  description: "Plateforme de gestion de réservations immobilières",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={cn("h-full", "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col antialiased">
        <Sidebar />
        <main className="ml-64 min-h-screen">
        {children}
        </main>
      </body>
    </html>
  );
}


 