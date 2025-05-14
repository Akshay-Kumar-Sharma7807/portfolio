import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface Track {
  title: string;
  duration: string;
  image: string;
}

const tracks: Track[] = [
  {
    title: "Midnight Synthesis",
    duration: "4:32",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Digital Dreams",
    duration: "3:45",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop"
  }
];

export  function Music() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative  min-h-screen pt-20 px-8 max-w-4xl mx-auto"
    >
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-bold mb-12"
      >
        Music
      </motion.h1>
      <div className="space-y-6">
        {tracks.map((track, index) => (
          <motion.div
            key={track.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-6 group cursor-pointer"
          >
            <div className="relative w-24 h-24 overflow-hidden rounded-lg">
              <img
                src={track.image}
                alt={track.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold">{track.title}</h3>
              <p className="text-gray-400">{track.duration}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}