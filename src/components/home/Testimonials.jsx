import { motion } from 'framer-motion';
import StarRating from '../products/StarRating';
import { staggerContainer, fadeUp } from '../../lib/animations';

const TESTIMONIALS = [
  { id: 1, name: 'Sara Ahmed', rating: 5, text: 'Great quality and fast shipping. Will order again!' },
  { id: 2, name: 'Omar Khaled', rating: 4.5, text: 'Products exactly as described. Very happy with my purchase.' },
  { id: 3, name: 'Nour Ali', rating: 5, text: 'Customer service was super helpful when I had questions.' },
];

function Testimonials() {
  return (
    <section className="bg-muted/30 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-xl font-bold text-foreground">What Our Customers Say</h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid gap-4 sm:grid-cols-3"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div key={t.id} variants={fadeUp} className="rounded-lg border border-border bg-card p-4">
              <StarRating rating={t.rating} />
              <p className="mt-2 text-sm text-muted-foreground">"{t.text}"</p>
              <p className="mt-3 text-sm font-medium text-foreground">— {t.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;