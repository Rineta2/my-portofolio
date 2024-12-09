export const metadata = {
  title: "My Portfolio - Rizki Ramadhani",
  description: "Seputar pengalaman dan proyek yang sudah saya kerjakan",
  authors: [{ name: "Rizki Ramadhani" }],
  keywords: [
    "My Portfolio",
    "Pengembangan Website",
    "Aplikasi Mobile",
    "Portfolio",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    title: "My Portfolio - Rizki Ramadhani",
    description: "Seputar pengalaman dan proyek yang sudah saya kerjakan",
    url: "https://my-portfolio-rizki-ramadhani.vercel.app/",
    siteName: "My Portfolio - Rizki Ramadhani",
    images: [
      {
        url: "https://my-portfolio-rizki-ramadhani.vercel.app/favicon.ico",
        width: 1920,
        height: 1080,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Portfolio - Rizki Ramadhani",
    description: "Seputar pengalaman dan proyek yang sudah saya kerjakan",
    creator: "@rizki_ramadhani",
    images: ["https://my-portfolio-rizki-ramadhani.vercel.app/favicon.ico"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_VERTIFICATION_API_KEY,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#ffffff",
};
