import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-muted/50 pt-16 md:pt-24 lg:pt-32 pb-16">
      {/* تأثيرات خلفية (Gradients) عشان تدي شكل عصري */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          
          {/* الجزء النصي (الشمال) */}
          <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                New Tech & Fashion Arrivals
              </div>
              
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl text-foreground">
                Upgrade Your Lifestyle with <br className="hidden lg:block"/>
                <span className="text-primary">SwiftCart</span>
              </h1>
              
              <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed mx-auto lg:mx-0">
                Discover the latest trends in electronics, fashion, and lifestyle. Premium quality products delivered swiftly to your doorstep.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/shop">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-lg h-12 px-8">
                  <ShoppingBag className="h-5 w-5" />
                  Shop Now
                </Button>
              </Link>
              <Link to="/shop?cat=electronics">
                <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 text-lg h-12 px-8">
                  Explore Electronics
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            {/* إحصائيات سريعة تحت الزراير */}
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-4 border-t border-border/50">
              <div>
                <p className="text-3xl font-bold text-foreground">10k+</p>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">50k+</p>
                <p className="text-sm text-muted-foreground">Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">24h</p>
                <p className="text-sm text-muted-foreground">Fast Delivery</p>
              </div>
            </div>
          </div>

          {/* الجزء الصوري (اليمين) */}
          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none flex justify-center">
            {/* شكل تجريدي (Abstract) يعبر عن المتجر لحد ما نضيف صور حقيقية */}
            <div className="relative w-full aspect-square rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 flex items-center justify-center animate-in zoom-in duration-1000">
              <div className="absolute inset-8 rounded-full border border-dashed border-primary/30 animate-[spin_20s_linear_infinite]"></div>
              <div className="relative z-10 grid grid-cols-2 gap-4 p-8">
                {/* كروت وهمية طايرة بتدي شكل جمالي */}
                <div className="h-32 w-24 md:h-40 md:w-32 rounded-xl bg-card shadow-xl border border-border flex items-center justify-center -translate-y-6 transform transition hover:-translate-y-8">
                  <span className="text-4xl">📱</span>
                </div>
                <div className="h-32 w-24 md:h-40 md:w-32 rounded-xl bg-card shadow-xl border border-border flex items-center justify-center translate-y-6 transform transition hover:translate-y-4">
                  <span className="text-4xl">👟</span>
                </div>
                <div className="h-32 w-24 md:h-40 md:w-32 rounded-xl bg-card shadow-xl border border-border flex items-center justify-center -translate-x-4 transform transition hover:-translate-x-6">
                  <span className="text-4xl">🎧</span>
                </div>
                <div className="h-32 w-24 md:h-40 md:w-32 rounded-xl bg-card shadow-xl border border-border flex items-center justify-center translate-x-4 transform transition hover:translate-x-6">
                  <span className="text-4xl">⌚</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}