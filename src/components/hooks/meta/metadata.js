export const metadata = {
  title: "My Portfolio - Rizki Ramadhan",
  description: "Seputar pengalaman dan proyek yang sudah saya kerjakan",
  authors: [{ name: "Rizki Ramadhan" }],
  keywords: [
    "My Portfolio",
    "Pengembangan Website",
    "Aplikasi Mobile",
    "Portfolio",
  ],
  link: [
    {
      rel: "icon",
      href: "/favicon.ico",
      sizes: "64x64 32x32 24x24 16x16",
      type: "image/x-icon",
    },
  ],
  link: [
    {
      rel: "manifest",
      href: "/manifest.json",
    },
  ],
  link: [
    {
      rel: "apple-touch-icon",
      href: "/favicon.ico",
      type: "image/x-icon",
      sizes: "64x64 32x32 24x24 16x16",
    },
  ],
  meta: [
    {
      name: "theme-color",
      content: "#ffffff",
    },
  ],
  meta: [
    {
      name: "mobile-web-app-capable",
      content: "yes",
    },
  ],
  meta: [
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
  ],
  meta: [
    {
      name: "manifest",
      content: "/manifest.json",
    },
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
    shortcut: "/favicon.ico",
    appleTouchIcon: "/favicon.ico",
    other: {
      rel: "manifest",
      url: "/manifest.json",
    },
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    title: "My Portfolio - Rizki Ramadhan",
    description: "Seputar pengalaman dan proyek yang sudah saya kerjakan",
    url: "https://rzki-r-my-porto.vercel.app/",
    siteName: "My Portfolio - Rizki Ramadhan",
    images: [
      {
        url: "https://rzki-r-my-porto.vercel.app/favicon.ico",
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
    images: ["https://rzki-r-my-porto.vercel.app/favicon.ico"],
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
