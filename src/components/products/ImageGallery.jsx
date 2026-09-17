import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ImageGallery({ images = [], title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const gallery = images.length > 0 ? images : ['/placeholder.png'];

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-border bg-muted">
        <AnimatePresence mode="wait">
          <motion.img
            key={gallery[activeIndex]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            src={gallery[activeIndex]}
            alt={`${title} - image ${activeIndex + 1}`}
            className="h-full w-full object-contain p-6"
          />
        </AnimatePresence>
      </div>

      {gallery.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {gallery.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActiveIndex(i)}
              className={`aspect-square overflow-hidden rounded-md border bg-muted transition-colors ${
                i === activeIndex ? 'border-primary' : 'border-border hover:border-muted-foreground'
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-contain p-1.5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageGallery;