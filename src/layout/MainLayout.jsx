
import { FooterSection } from "../components/Footer";
import { Header } from "../components/Header"
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="dark:bg-[#142030] dark:text-slate-100">
      <header>
        <nav>
            <Header></Header>
        </nav>
      </header>
      <main className="w-10/12 mx-auto min-h-[calc(100vh-305px)]">
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
