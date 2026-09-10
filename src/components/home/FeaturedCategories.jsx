import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Shirt, 
  Home as HomeIcon, 
  Watch, 
  Sparkles, 
  Dumbbell,
  ArrowRight
} from 'lucide-react';

/* =========================================
   داتا الأقسام (مفصولة لسهولة التعديل)
   ========================================= */
const CATEGORIES = [
  { id: 1, name: 'Electronics', icon: Smartphone, path: '/shop?cat=electronics', items: '320+ Items' },
  { id: 2, name: 'Fashion', icon: Shirt, path: '/shop?cat=fashion', items: '840+ Items' },
  { id: 3, name: 'Home & Living', icon: HomeIcon, path: '/shop?cat=home', items: '210+ Items' },
  { id: 4, name: 'Watches', icon: Watch, path: '/shop?cat=watches', items: '150+ Items' },
  { id: 5, name: 'Beauty', icon: Sparkles, path: '/shop?cat=beauty', items: '430+ Items' },
  { id: 6, name: 'Sports', icon: Dumbbell, path: '/shop?cat=sports', items: '180+ Items' },
];

export default function FeaturedCategories() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* عنوان السيكشن */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Shop by Category
            </h2>
            <p className="text-muted-foreground mt-2">
              Explore our wide range of products
            </p>
          </div>
          
          <Link 
            to="/shop" 
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View All Categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* شبكة الأقسام (Grid) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                to={cat.path}
                className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card p-6 text-center transition-all hover:border-primary/50 hover:shadow-md hover:bg-muted/50"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{cat.items}</p>
                </div>
              </Link>
            );
          })}
        </div>
        
        {/* زرار عرض الكل في الموبايل بس */}
        <div className="mt-6 sm:hidden flex justify-center">
          <Link 
            to="/shop" 
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View All Categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}