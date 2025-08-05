import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Home } from "./pages/Home";
// import { Music } from "./pages/Music";
import { Certificates } from "./pages/Certificates";
import { About } from "./pages/About";
import { Work } from "./pages/Work";
import { Contact } from "./pages/Contact";
import Project from "./pages/Project";
import { useParams } from "react-router-dom";

const ProjectWrapper = () => {
  const { projectId } = useParams();
  if (!projectId) {
    return <div>Project not found</div>;
  }
  return <Project projectId={projectId} />;
};

export function AppRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        {/* <Route path="/music" element={<Music />} /> */}
        <Route path="/work" element={<Work />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/project/:projectId" element={<ProjectWrapper />} />
      </Routes>
    </AnimatePresence>
  );
}
