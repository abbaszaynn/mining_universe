"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "GOS has set a new standard for mining in Gilgit Baltistan. Very professional team.",
    by: "Dr. Aftab Hussain, Geological Survey of Pakistan",
    imgSrc: "https://i.pravatar.cc/150?img=52"
  },
  {
    tempId: 1,
    testimonial: "Working with GOS on the Shigar concession was a great experience. Everything was well structured.",
    by: "Eng. Karim Shah, Mining Consultant, Gilgit",
    imgSrc: "https://i.pravatar.cc/150?img=53"
  },
  {
    tempId: 2,
    testimonial: "Their geological reports are thorough and ready for investors. Impressive work from a GB operator.",
    by: "Hassan Raza, Pakistan Minerals Development Corp",
    imgSrc: "https://i.pravatar.cc/150?img=54"
  },
  {
    tempId: 3,
    testimonial: "The nephrite they source from Ghizer is top quality. Very reliable supplier.",
    by: "Ahmed Baig, Gemstone Trader, Peshawar",
    imgSrc: "https://i.pravatar.cc/150?img=55"
  },
  {
    tempId: 4,
    testimonial: "As someone from Skardu, it is inspiring to see locals building a company of this scale.",
    by: "Fatima Batool, Community Officer, Skardu",
    imgSrc: "https://i.pravatar.cc/150?img=56"
  },
  {
    tempId: 5,
    testimonial: "Their licensing and compliance framework across three divisions is very well built.",
    by: "Waqar Ali, GB Mines and Minerals Dept",
    imgSrc: "https://i.pravatar.cc/150?img=57"
  },
  {
    tempId: 6,
    testimonial: "I have evaluated many mining ventures in Pakistan. GOS stands out for transparency.",
    by: "Prof. Tariq Mahmood, UET Lahore",
    imgSrc: "https://i.pravatar.cc/150?img=58"
  },
  {
    tempId: 7,
    testimonial: "Their copper samples from Kharmang were the most promising I have seen in years.",
    by: "Dr. Saeed Khan, PCSIR Labs, Islamabad",
    imgSrc: "https://i.pravatar.cc/150?img=59"
  },
  {
    tempId: 8,
    testimonial: "Working with GOS gave us direct access to licensed mineral sources. Clean supply chain.",
    by: "Rashid Mehmood, Pak Minerals Trading, Karachi",
    imgSrc: "https://i.pravatar.cc/150?img=60"
  },
  {
    tempId: 9,
    testimonial: "The team knows every valley in Ghizer and Gilgit. Their site selection is excellent.",
    by: "Imran Haider, Field Geologist, GB",
    imgSrc: "https://i.pravatar.cc/150?img=61"
  },
  {
    tempId: 10,
    testimonial: "GOS is exactly what GB's mining sector needed. Locally rooted, professionally run.",
    by: "Manzoor Hussain, GB Chamber of Commerce",
    imgSrc: "https://i.pravatar.cc/150?img=62"
  },
  {
    tempId: 11,
    testimonial: "Their end to end approach removes the uncertainty that usually holds investors back.",
    by: "Nadia Ashraf, Frontier Capital, Islamabad",
    imgSrc: "https://i.pravatar.cc/150?img=63"
  },
  {
    tempId: 12,
    testimonial: "The granite from their Gupis quarry is premium grade. We have placed repeat orders.",
    by: "Bilal Qureshi, Pak Stone Industries, Rawalpindi",
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
    <div className="flex flex-col h-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(',')[0]}`}
        className="mb-4 h-14 w-12 bg-gray-200 object-cover object-top shrink-0"
        style={{
          boxShadow: isCenter ? "3px 3px 0px rgba(255,255,255,0.2)" : "3px 3px 0px rgba(0,0,0,0.1)"
        }}
      />
      <h3 className={cn(
        "text-sm sm:text-base font-medium flex-1",
        isCenter ? "text-bone-100" : "text-graphite-950"
      )}>
        &quot;{testimonial.testimonial}&quot;
      </h3>
      <p className={cn(
        "mt-3 text-xs italic",
        isCenter ? "text-bone-300" : "text-graphite-600"
      )}>
        - {testimonial.by}
      </p>
    </div>
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
