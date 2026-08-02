"use client";

import Image from "next/image";

export function VideoSection() {
  return (
    <section className="relative w-full bg-bone-100 px-5 py-12 md:px-10 md:py-24">
      {/* Container matching Synthesis Capital's layout */}
      <div className="relative mx-auto flex min-h-[600px] w-full max-w-[105rem] flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-graphite-950 px-6 py-20 text-center shadow-2xl md:px-20">
        
        {/* Background YouTube Video */}
        <div className="absolute inset-0 z-0 overflow-hidden opacity-60">
          <iframe
            className="pointer-events-none absolute left-1/2 top-1/2 h-[300vw] w-[300vw] -translate-x-1/2 -translate-y-1/2 md:h-[150vw] md:w-[150vw]"
            src="https://www.youtube.com/embed/hxyM449uJrs?autoplay=1&mute=1&loop=1&playlist=hxyM449uJrs&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3"
            title="Background Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Overlay Content */}
        <div className="relative z-10 flex max-w-3xl flex-col items-center">
          <div className="mb-8 overflow-hidden rounded-full border-4 border-bone-100/20">
            {/* Small random image placeholder as requested */}
            <Image
              src="/images/commodities/gold.png" // Random image from project
              alt="Highlight"
              width={80}
              height={80}
              className="h-20 w-20 object-cover"
            />
          </div>
          
          <h2 className="mb-6 text-[clamp(2.5rem,4vw,4rem)] leading-[1.05] font-medium tracking-[-0.035em] text-bone-50 uppercase">
            INVESTMENT OPPORTUNITY
          </h2>
          
          <p className="mb-10 text-lg leading-relaxed text-bone-100/80 md:text-xl">
            Connect with us to explore and mine in the north. Partner with GBMINES to unlock the unparalleled potential of sustainable, high-yield extraction. This is the future.
          </p>

          <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-none bg-bone-100/10 px-5 py-4 text-bone-50 placeholder-bone-100/50 backdrop-blur-md transition-colors focus:bg-bone-100/20 focus:outline-none focus:ring-2 focus:ring-copper-500"
              required
            />
            <button
              type="submit"
              className="shrink-0 bg-copper-600 px-8 py-4 font-medium text-bone-50 transition-colors hover:bg-copper-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
