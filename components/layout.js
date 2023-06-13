import React, { useState } from "react";
import CategorySelector from "./categoryselector";
import { useRouter, UseRouter } from "next/router";
import Mainbar from "./mainbar";
import { motion } from "framer-motion";
import { useSession} from "next-auth/react"

function Layout({ children }) {
  const router = useRouter();
  const noNav = ["/login", "/signup", "/"];
  const { data: session } = useSession()

  return (
    <motion.div
      initial={{ opacity: 0}}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.2 }}
      transition={{
        duration: 0.5
      }}
    >
      {noNav.includes(router.pathname) ? null : <div>
        
        <CategorySelector session={session}/>
        <Mainbar session={session}/>
         </div>}
      <main>{children}</main>
    </motion.div>
  );
}

export default Layout;
