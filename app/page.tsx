import Link from "next/link";
import { SERVICES } from "@/lib/bookings";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-nude-100">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-display text-lg font-semibold text-nude-800 italic">
            Nailed It by Chazi
          </span>
          <Link
            href="/book"
            className="bg-rosegold text-white text-sm font-semibold px-4 py-2 rounded-full
                       transition-all duration-200 active:scale-95 hover:bg-rosegold-dark shadow-soft"
          >
            Book Na!
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-petal via-cream to-nude-50 py-16 px-4">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blush-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-nude-100/60 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm text-rosegold text-xs font-semibold px-4 py-2 rounded-full border border-rosegold/20 mb-6 shadow-soft animate-fade-in">
            <span>✨</span>
            <span>Home-based nail salon</span>
            <span>✨</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-nude-900 mb-4 leading-tight animate-fade-up">
            Nailed It
            <span className="block italic text-rosegold">by Chazi</span>
          </h1>

          <p className="text-nude-600 text-lg mb-2 animate-fade-up font-body">
            Let your nails do the talking 💅✨
          </p>
          <p className="text-nude-500 text-sm mb-8 animate-fade-up">
            Professional gel & softgel nail services from the comfort of home
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up">
            <Link
              href="/book"
              className="btn-primary text-center text-base py-4 px-8 shadow-glow"
            >
              Book Na! 💅
            </Link>
            <a
              href="#services"
              className="btn-secondary text-center text-base py-4 px-8"
            >
              View Services
            </a>
          </div>

          {/* Policy banners */}
          <div className="mt-8 flex flex-col gap-2 animate-fade-up">
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold px-4 py-2 rounded-xl">
              ⚠️ NO PAYMENT = NO RESERVED SLOT
            </div>
            <div className="bg-nude-50 border border-nude-200 text-nude-700 text-xs px-4 py-2 rounded-xl">
              🚫 Slot fee is STRICTLY NON-REFUNDABLE for no-shows
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-nude-900 mb-2">
              Services & Prices
            </h2>
            <p className="text-nude-500 text-sm">All prices include nail prep and finish</p>
          </div>

          <div className="space-y-4">
            {Object.entries(SERVICES).map(([category, info]) => (
              <div key={category} className="card border border-nude-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{info.icon}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-nude-800">
                      {category}
                    </h3>
                    <p className="text-nude-400 text-xs">{info.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {info.variants.map((variant) => (
                    <div
                      key={variant.name}
                      className="flex items-center justify-between bg-cream rounded-xl px-3 py-2"
                    >
                      <span className="text-nude-700 text-sm">{variant.name}</span>
                      <span className="text-rosegold font-semibold text-sm">
                        ₱{variant.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-petal border border-blush-200 rounded-2xl p-4 text-center">
            <p className="text-nude-600 text-sm">
              💳 <strong>₱50 slot fee</strong> required to book — deductible from total
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/book"
              className="btn-primary inline-block text-base py-4 px-10"
            >
              Book Your Slot Now
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio / Facebook Section */}
      <section id="portfolio" className="py-12 px-4 bg-cream">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-display text-3xl font-bold text-nude-900 mb-2">
              Our Work
            </h2>
            <p className="text-nude-500 text-sm">
              Check out our latest nail designs and transformations
            </p>
          </div>

          {/* Facebook Page Plugin Placeholder */}
          <div className="card border border-nude-100 text-center py-12">
            <div className="text-4xl mb-4">📸</div>
            <h3 className="font-display text-xl font-semibold text-nude-800 mb-2">
              Check out our latest work on Facebook
            </h3>
            <p className="text-nude-500 text-sm mb-6">
              See hundreds of nail designs, client transformations, and more!
            </p>

            {/*
              <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61563443194436&tabs=timeline&width=380&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="380" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
            */}
            <div className="bg-gradient-to-br from-petal to-nude-50 rounded-2xl p-8 border-2 border-dashed border-nude-200 mx-auto max-w-sm">
              <div className="text-nude-400 text-xs mb-3 font-semibold uppercase tracking-wider">
                Facebook Page Plugin
              </div>
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-3 bg-nude-200/60 rounded-full animate-pulse" style={{ width: `${80 - i * 10}%`, margin: "0 auto" }} />
                ))}
              </div>
              <p className="text-nude-400 text-xs mt-4">
                Paste your Facebook Page Plugin embed code here
              </p>
            </div>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 mt-6"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Visit our Facebook Page
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-rosegold-dark to-rosegold text-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-display text-3xl font-bold mb-3 italic">
            Ready to get your nails done?
          </h2>
          <p className="text-white/80 mb-6 text-sm">
            Limited slots available daily. Book yours now to secure your spot!
          </p>
          <Link
            href="/book"
            className="inline-block bg-white text-rosegold font-semibold px-8 py-4 rounded-full
                       transition-all duration-200 active:scale-95 hover:bg-nude-50 shadow-soft"
          >
            Book Na! 💅
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-nude-900 text-white py-8 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="font-display text-xl italic text-nude-100 mb-1">
            Nailed It by Chazi
          </p>
          <p className="text-nude-400 text-xs mb-4">
            Home-based nail salon · Professional nail services
          </p>
          <p className="text-nude-500 text-xs">
            © {new Date().getFullYear()} Nailed It by Chazi. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
