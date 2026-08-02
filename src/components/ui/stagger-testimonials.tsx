"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "Game of Stones has brought a level of professionalism to mining in GB that we haven't seen before. Their documentation and compliance set a new standard.",
    by: "Dr. Aftab Hussain, Geologist at Geological Survey of Pakistan",
    imgSrc: "https://i.pravatar.cc/150?img=52"
  },
  {
    tempId: 1,
    testimonial: "Working with GOS on the Shigar copper concession showed me how structured, transparent mineral exploration should be done in this region.",
    by: "Eng. Karim Shah, Mining Consultant, Gilgit",
    imgSrc: "https://i.pravatar.cc/150?img=53"
  },
  {
    tempId: 2,
    testimonial: "Their geological reports are thorough and investor-ready. It's rare to see this quality of documentation from a Gilgit-Baltistan based operator.",
    by: "Hassan Raza, Investment Analyst at Pakistan Minerals Development Corp",
    imgSrc: "https://i.pravatar.cc/150?img=54"
  },
  {
    tempId: 3,
    testimonial: "GOS is bridging the gap between untapped mineral reserves and real market access. The nephrite they source from Ghizer is exceptional quality.",
    by: "Ahmed Baig, Gemstone Trader, Peshawar",
    imgSrc: "https://i.pravatar.cc/150?img=55"
  },
  {
    tempId: 4,
    testimonial: "As someone from Skardu, it's inspiring to see locals building a mining company of this scale. They know the land and they respect it.",
    by: "Fatima Batool, Community Development Officer, Skardu",
    imgSrc: "https://i.pravatar.cc/150?img=56"
  },
  {
    tempId: 5,
    testimonial: "The regulatory compliance and licensing framework GOS has built across three divisions is impressive. This is how responsible mining starts.",
    by: "Waqar Ali, Director at GB Mines & Minerals Dept",
    imgSrc: "https://i.pravatar.cc/150?img=57"
  },
  {
    tempId: 6,
    testimonial: "I've evaluated mining ventures across Pakistan. GOS stands out for their transparent approach to geological data and concession management.",
    by: "Prof. Tariq Mahmood, Mining Engineering, UET Lahore",
    imgSrc: "https://i.pravatar.cc/150?img=58"
  },
  {
    tempId: 7,
    testimonial: "Their copper and polymetallic ore samples from Kharmang were the most promising specimens I've analysed from the Karakoram belt in years.",
    by: "Dr. Saeed Khan, Metallurgist at PCSIR Labs, Islamabad",
    imgSrc: "https://i.pravatar.cc/150?img=59"
  },
  {
    tempId: 8,
    testimonial: "Partnering with Game of Stones gave us direct access to verified, licensed mineral sources. No middlemen, no ambiguity — just clean supply.",
    by: "Rashid Mehmood, Export Manager at Pak Minerals Trading, Karachi",
    imgSrc: "https://i.pravatar.cc/150?img=60"
  },
  {
    tempId: 9,
    testimonial: "The team's knowledge of the terrain in Ghizer and Gilgit is unmatched. They grew up walking these valleys — and it shows in their site selection.",
    by: "Imran Haider, Field Geologist, Gilgit-Baltistan",
    imgSrc: "https://i.pravatar.cc/150?img=61"
  },
  {
    tempId: 10,
    testimonial: "GOS is exactly what Gilgit-Baltistan's mining sector needed — a professionally run, locally rooted operator with international ambitions.",
    by: "Manzoor Hussain, Secretary at GB Chamber of Commerce",
    imgSrc: "https://i.pravatar.cc/150?img=62"
  },
  {
    tempId: 11,
    testimonial: "From exploration to export readiness, their end-to-end approach removes the uncertainty that usually holds investors back from this region.",
    by: "Nadia Ashraf, Portfolio Manager at Frontier Capital, Islamabad",
    imgSrc: "https://i.pravatar.cc/150?img=63"
  },
  {
    tempId: 12,
    testimonial: "The granite and marble from their Gupis quarry in Ghizer is premium grade. We've already placed repeat orders for architectural projects.",
    by: "Bilal Qureshi, Director at Pak Stone Industries, Rawalpindi",
    imgSrc: "https://i.pravatar.cc/150?img=64"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter 
          ? "z-10 bg-graphite-950 text-bone-100 border-graphite-950" 
          : "z-0 bg-bone-100 text-graphite-950 border-graphite-300 hover:border-copper-500"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px rgba(0,0,0,0.1)" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className={cn(
          "absolute block origin-top-right rotate-45",
          isCenter ? "bg-bone-100" : "bg-graphite-300"
        )}
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(',')[0]}`}
        className="mb-4 h-14 w-12 bg-gray-200 object-cover object-top"
        style={{
          boxShadow: isCenter ? "3px 3px 0px rgba(255,255,255,0.2)" : "3px 3px 0px rgba(0,0,0,0.1)"
        }}
      />
      <h3 className={cn(
        "text-base sm:text-xl font-medium",
        isCenter ? "text-bone-100" : "text-graphite-950"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
        isCenter ? "text-bone-300" : "text-graphite-600"
      )}>
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-bone-100"
      style={{ height: 500 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-bone-100 border-2 border-graphite-300 text-graphite-950 hover:bg-graphite-950 hover:text-bone-100 hover:border-graphite-950",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bone-100"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-bone-100 border-2 border-graphite-300 text-graphite-950 hover:bg-graphite-950 hover:text-bone-100 hover:border-graphite-950",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bone-100"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
