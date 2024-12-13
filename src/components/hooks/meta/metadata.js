const BASE_URL = "https://rzki-r-my-porto.vercel.app";

export const metadata = {
  title: "My Portfolio - Rizki Ramadhan",
  description: "Seputar pengalaman dan proyek yang sudah saya kerjakan",
  authors: [{ name: "Rizki Ramadhan" }],
  keywords: [
    "My Portfolio",
    "Pengembangan Website",
    "Aplikasi Mobile",
    "Portfolio",
    "Rizki Ramadhan",
  ],

  icons: {
    icon: [
      {
        url: "/icon.png",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
    ],
    apple: "/icon.png",
    shortcut: "/icon.png",
    appleTouchIcon: "/icon.png",
  },

  manifest: "/manifest.json",

  metadataBase: new URL(BASE_URL),

  other: {
    "theme-color": "#ffffff",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
  },

  openGraph: {
    type: "website",
    title: "My Portfolio - Rizki Ramadhan",
    description: "Seputar pengalaman dan proyek yang sudah saya kerjakan",
    url: "https://rzki-r-my-porto.vercel.app/",
    siteName: "My Portfolio - Rizki Ramadhan",
    images: [
      {
        url: "https://rzki-r-my-porto.vercel.app/icon.png",
        width: 1920,
        height: 1080,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Portfolio - Rizki Ramadhan",
    description: "Seputar pengalaman dan proyek yang sudah saya kerjakan",
    creator: "@rizki_ramadhan",
    images: ["https://rzki-r-my-porto.vercel.app/icon.png"],
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
