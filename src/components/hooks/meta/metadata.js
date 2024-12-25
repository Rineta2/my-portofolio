const BASE_URL = process.env.NEXT_PUBLIC_URL;

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
    "Rizki Ramadhan Portfolio",
  ],

  icons: {
    icon: [
      {
        url: `${BASE_URL}/icon.png`,
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
    ],
    apple: `${BASE_URL}/icon.png`,
    shortcut: `${BASE_URL}/icon.png`,
    appleTouchIcon: `${BASE_URL}/icon.png`,
  },

  manifest: `${BASE_URL}/manifest.json`,

  metadataBase: new URL(BASE_URL),
  canonical: BASE_URL,

  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",

  other: {
    "theme-color": "#ffffff",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
  },

  openGraph: {
    type: "website",
    title: "My Portfolio - Rizki Ramadhan",
    description: "Seputar pengalaman dan proyek yang sudah saya kerjakan",
    url: BASE_URL,
    siteName: "My Portfolio - Rizki Ramadhan",
    locale: "id_ID",
    images: [
      {
        url: `${BASE_URL}/icon.png`,
        width: 1920,
        height: 1080,
        alt: "Icon for My Portfolio - Rizki Ramadhan",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "My Portfolio - Rizki Ramadhan",
    description: "Seputar pengalaman dan proyek yang sudah saya kerjakan",
    creator: "@rizki_ramadhan",
    site: "@rizki_ramadhan",
    images: [`${BASE_URL}/icon.png`],
  },

  verification: {
    google: process.env.NEXT_PUBLIC_VERTIFICATION_API_KEY,
  },

  robots: {
    index: true,
    follow: true,
    noarchive: true,
    nocache: true,
  },
};
