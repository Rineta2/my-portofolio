import { metadata } from "@/components/hooks/meta/metadata";

metadata.manifest = "/manifest.json";

export { metadata };

import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

import "@/components/styling/globals.scss";

import Providers from "@/utils/auth/Provider";

import Pathname from "@/utils/auth/Pathname";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable}`}>
        <Providers>
          <Pathname>{children}</Pathname>
        </Providers>
      </body>
    </html>
  );
}
