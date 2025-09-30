"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function HeroCarousel() {
  useEffect(() => {
    // Initialize carousel if using a library like Preline
    // For now, we'll use basic carousel functionality
    const initCarousel = () => {
      const carousel = document.querySelector('[data-carousel]');
      if (!carousel) return;
      
      const slides = carousel.querySelectorAll('.carousel-slide');
      const prevBtn = carousel.querySelector('.carousel-prev');
      const nextBtn = carousel.querySelector('.carousel-next');
      const pagination = carousel.querySelector('.carousel-pagination');
      
      let currentSlide = 1; // Start with second slide (marked as active)
      
      const showSlide = (index: number) => {
        slides.forEach((slide, i) => {
          slide.classList.toggle('active', i === index);
        });
        
        // Update pagination dots
        const dots = pagination?.querySelectorAll('.carousel-box');
        dots?.forEach((dot, i) => {
          dot.classList.toggle('carousel-active', i === index);
        });
        
        // Update button states
        if (prevBtn) prevBtn.classList.toggle('carousel-disabled', index === 0);
        if (nextBtn) nextBtn.classList.toggle('carousel-disabled', index === slides.length - 1);
      };
      
      // Create pagination dots
      if (pagination && slides.length > 0) {
        pagination.innerHTML = '';
        slides.forEach((_, i) => {
          const dot = document.createElement('button');
          dot.className = 'carousel-box w-2 h-2 rounded-full bg-black/20 dark:bg-white/20 transition-colors';
          if (i === currentSlide) dot.classList.add('carousel-active', '!bg-black', 'dark:!bg-white');
          dot.onclick = () => {
            currentSlide = i;
            showSlide(currentSlide);
          };
          pagination.appendChild(dot);
        });
      }
      
      prevBtn?.addEventListener('click', () => {
        if (currentSlide > 0) {
          currentSlide--;
          showSlide(currentSlide);
        }
      });
      
      nextBtn?.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
          currentSlide++;
          showSlide(currentSlide);
        }
      });
      
      // Make carousel visible
      const body = carousel.querySelector('.carousel-body');
      if (body) body.classList.remove('opacity-0');
    };
    
    initCarousel();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div
        data-carousel='{
          "loadingClasses": "opacity-0",
          "dotsItemClasses": "carousel-box carousel-active:bg-primary"
        }' 
        className="relative w-full"
      >
        <div className="carousel h-96 md:h-[32rem] rounded-2xl overflow-hidden">
          <div className="carousel-body h-full opacity-0">
          <div className="carousel-slide">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 flex h-full justify-center items-center p-6">
              <div className="text-center max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Professional Walkie Rentals</h2>
                <p className="text-lg md:text-xl text-black/70 dark:text-white/70 mb-6">
                  Reliable two-way radios for events, productions, and crews
                </p>
                <Link href="/rentals" className="inline-block rounded bg-[#5cb85c] hover:bg-[#4cae4c] text-white px-8 py-3 text-sm font-semibold uppercase tracking-wide transition-colors">
                  Browse Rentals
                </Link>
              </div>
            </div>
          </div>
          <div className="carousel-slide active">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-900 flex h-full justify-center items-center p-6">
              <div className="text-center max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Curated Rental Packages</h2>
                <p className="text-lg md:text-xl text-black/70 dark:text-white/70 mb-6">
                  Pre-configured bundles for small events to large productions
                </p>
                <Link href="/packages" className="inline-block rounded bg-[#5cb85c] hover:bg-[#4cae4c] text-white px-8 py-3 text-sm font-semibold uppercase tracking-wide transition-colors">
                  View Packages
                </Link>
              </div>
            </div>
          </div>
          <div className="carousel-slide">
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-800 dark:to-gray-900 flex h-full justify-center items-center p-6">
              <div className="text-center max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Accessories Available</h2>
                <p className="text-lg md:text-xl text-black/70 dark:text-white/70 mb-6">
                  Earpieces, belt clips, and more for purchase
                </p>
                <Link href="/accessories" className="inline-block rounded bg-[#5cb85c] hover:bg-[#4cae4c] text-white px-8 py-3 text-sm font-semibold uppercase tracking-wide transition-colors">
                  Shop Accessories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

        <button type="button" className="carousel-prev absolute top-1/2 -translate-y-1/2 start-5 max-sm:start-3 carousel-disabled:opacity-50 w-10 h-10 bg-white dark:bg-gray-800 flex items-center justify-center rounded-full shadow-lg">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="sr-only">Previous</span>
      </button>
        <button type="button" className="carousel-next absolute top-1/2 -translate-y-1/2 end-5 max-sm:end-3 carousel-disabled:opacity-50 w-10 h-10 bg-white dark:bg-gray-800 flex items-center justify-center rounded-full shadow-lg">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="sr-only">Next</span>
      </button>

        <div className="carousel-pagination absolute bottom-3 end-0 start-0 flex justify-center gap-3"></div>
      </div>
    </div>
  );
}
