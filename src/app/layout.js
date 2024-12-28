import { metadata } from "@/components/hooks/meta/metadata";

metadata.manifest = "/manifest.json";

export { metadata };

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

import "@/components/styling/globals.scss";

import Providers from "@/utils/auth/Provider";

import Pathname from "@/utils/auth/Pathname";

import { ThemeProvider } from "@/utils/theme/ThemeContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <ThemeProvider>
          <Providers>
            <Pathname>{children}</Pathname>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
