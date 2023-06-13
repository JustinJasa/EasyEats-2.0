import "@/styles/globals.css";
import Layout from "@/components/layout";
import localFont from "@next/font/local";
import { AnimatePresence } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const gloock = localFont({
  src: [
    {
      path: "../public/fonts/Gloock-Regular.ttf",
      weight: "400",
    },
  ],
  variable: "--font-gloock",
});

// axios.interceptors.request.use(
//   config => {
//       config => {}
//   }
// )

export default function App({ Component, pageProps, router }) {


  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <AnimatePresence
            mode="wait"
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            <main className={`${gloock.variable} font-sans`}>
              <Component {...pageProps} key={router.asPath} />
              <ToastContainer/>
            </main>
          </AnimatePresence>
        </Layout>
      </SessionProvider>
    </>
  );
}


