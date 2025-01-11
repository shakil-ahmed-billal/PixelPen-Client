
import {motion, useScroll } from "motion/react";
import { FooterSection } from "../components/Footer";
import { Header } from "../components/Header"
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  const { scrollYProgress } = useScroll()


  return (
    <div className="dark:bg-[#142030] dark:text-slate-100">
      <motion.div style={{
        scaleX: scrollYProgress,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 10,
        backgroundColor: "red",
        transformOrigin: "0%",
        zIndex: 10,
      }} className="">

      </motion.div>
      <header>
        <nav>
            <Header></Header>
        </nav>
      </header>
      <main className="md:w-10/12 w-11/12 mx-auto min-h-[calc(100vh-305px)] pt-20">
        <section>
            <Outlet></Outlet>
        </section>
      </main>
      <footer className="mt-10">
        <FooterSection></FooterSection>
      </footer>
    </div>
  )
}

export default MainLayout
