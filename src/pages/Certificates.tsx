import { motion } from "framer-motion";
import resdesign from "../assets/Certificates/resdesign.jpg";
import quality from "../assets/Certificates/quality.jpg";
import jsalgo from "../assets/Certificates/jsalgo.jpg";
import frontend from "../assets/Certificates/frontend.jpg";
import datavis from "../assets/Certificates/datavis.jpg";
import api from "../assets/Certificates/api.jpg";
import jklu from "../assets/Certificates/47.png";
import cs50x from "../assets/Certificates/cs50x.png";
import cs50p from "../assets/Certificates/cs50p.png";
import scientificpy from "../assets/Certificates/scientificpy.png";

interface Ride {
  title: string;
  distance: string;
  elevation: string;
  date: string;
  image: string;
  link: string;
}

const rides: Ride[] = [
  {
    title: "CS50x: Introduction to Computer Science",
    distance: "42km",
    elevation: "850m",
    date: "2021",
    image: cs50x,
    link: "https://certificates.cs50.io/6e6425f6-fd59-492e-8594-bc798ef16e07.pdf?size=letter",
  },
  {
    title: "CS50P: Programming with Python",
    distance: "42km",
    elevation: "850m",
    date: "2022",
    image: cs50p,
    link: "https://certificates.cs50.io/42d2610a-2720-481c-ae47-d591d2d13779.pdf?size=letter",
  },
  {
    title: "Scientific Computing with Python",
    distance: "42km",
    elevation: "850m",
    date: "12/2021",
    image: scientificpy,
    link: "https://www.freecodecamp.org/certification/akshay-kumar-sharma/scientific-computing-with-python-v7",
  },
  {
    title: "Responsive Web Design",
    distance: "42km",
    elevation: "850m",
    date: "11/2020",
    image: resdesign,
    link: "https://www.freecodecamp.org/certification/akshay-kumar-sharma/responsive-web-design",
  },
  {
    title: "APIs and Microservices",
    distance: "65km",
    elevation: "320m",
    date: "3/2021",
    image: api,
    link: "https://www.freecodecamp.org/certification/akshay-kumar-sharma/back-end-development-and-apis",
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    distance: "65km",
    elevation: "320m",
    date: "11/2020",
    image: jsalgo,
    link: "https://www.freecodecamp.org/certification/akshay-kumar-sharma/javascript-algorithms-and-data-structures",
  },
  {
    title: "Front End Development Libraries",
    distance: "65km",
    elevation: "320m",
    date: "12/2020",
    image: frontend,
    link: "https://www.freecodecamp.org/certification/akshay-kumar-sharma/front-end-development-libraries",
  },
  {
    title: "Data Visualization",
    distance: "65km",
    elevation: "320m",
    date: "12/2020",
    image: datavis,
    link: "https://www.freecodecamp.org/certification/akshay-kumar-sharma/data-visualization",
  },
  {
    title: "Quality Assurance",
    distance: "65km",
    elevation: "320m",
    date: "7/2021",
    image: quality,
    link: "https://www.freecodecamp.org/certification/akshay-kumar-sharma/quality-assurance-v7",
  },
  {
    title: "Aarohan 2025",
    distance: "65km",
    elevation: "320m",
    date: "2/2025",
    image: jklu,
    link: "https://drive.google.com/file/d/19GKWXn49-8Ld8cRmlSfHC5RTIMFO0BAR/view?usp=drive_link",
  },
];

export function Certificates() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen pt-20 px-8 max-w-6xl mx-auto my-4"
    >
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-bold mb-12 text-white"
      >
        Certificates
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rides.map((ride, index) => (
          <motion.div
            key={ride.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 rounded-lg overflow-hidden text-white"
          >
            <img
              src={ride.image}
              alt={ride.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{ride.title}</h3>

              <div className="grid grid-cols-3 gap-4 text-gray-400 mb-4">
                <div>
                  <p className="text-sm">Distance</p>
                  <p className="font-semibold text-white">{ride.distance}</p>
                </div>
                <div>
                  <p className="text-sm">Elevation</p>
                  <p className="font-semibold text-white">{ride.elevation}</p>
                </div>
                <div>
                  <p className="text-sm">Date</p>
                  <p className="font-semibold text-white">{ride.date}</p>
                </div>
              </div>
              <a href={ride.link} target="_blank">
                <div className="bg-gray-700 text-xs px-4 py-2 rounded">
                  View Certificate
                </div>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
