import "../src/index.css";
import "aos/dist/aos.css";
import Providers from "./providers";
import Layout from "../src/layout/Layout";

export const metadata = {
  title: "WorkTrackPro",
  description: "A simpler way to manage work, people, and productivity.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className="overflow-x-hidden">
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
