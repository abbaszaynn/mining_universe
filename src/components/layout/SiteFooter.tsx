import Link from "next/link";
import { GridLines } from "@/components/ui/GridLines";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative flex w-full flex-col">
      {/* Top Section - Orange */}
      <div className="relative overflow-hidden bg-copper-600 px-5 pb-12 pt-16 text-bone-50 md:px-10 md:pb-16 md:pt-24">
        <GridLines tone="light" />
        
        <div className="relative z-10 mx-auto max-w-[105rem]">
          {/* Top Row: Logo & Nav Links */}
          <div className="mb-20 flex flex-col justify-between gap-16 md:mb-32 md:flex-row md:gap-24">
            
            {/* Logo / Small Type */}
            <div className="flex-1">
              <Link href="/" className="inline-block transition-opacity hover:opacity-80">
                <img src="/images/gbmines-logo.png" alt="GBMINES Logo" className="h-16 w-auto" />
              </Link>
            </div>

            {/* Nav Links */}
            <div className="flex shrink-0 flex-col gap-12 sm:flex-row sm:gap-24 md:mr-12">
              <div className="flex flex-col gap-4 text-lg">
                <Link href="/" className="transition-colors hover:text-bone-100/70">Home</Link>
                <Link href="/about" className="transition-colors hover:text-bone-100/70">About</Link>
                <Link href="/invest" className="transition-colors hover:text-bone-100/70">Invest</Link>
                <Link href="/markets" className="transition-colors hover:text-bone-100/70">Markets</Link>
                <Link href="/commodities" className="transition-colors hover:text-bone-100/70">Commodities</Link>
                <Link href="/map" className="transition-colors hover:text-bone-100/70">Interactive Map</Link>
                <Link href="/gallery" className="transition-colors hover:text-bone-100/70">Products Gallery</Link>
              </div>
              
              <div className="flex flex-col gap-4 text-lg">
                <Link href="/news" className="transition-colors hover:text-bone-100/70">Insights</Link>
                <Link href="/news" className="transition-colors hover:text-bone-100/70">Press & Media</Link>
                <Link href="/documents" className="transition-colors hover:text-bone-100/70">Corporate Documents</Link>
                <Link href="/faq" className="transition-colors hover:text-bone-100/70">FAQ</Link>
                <Link href="/contact" className="transition-colors hover:text-bone-100/70">Contact Us</Link>
              </div>
            </div>
          </div>

          <div className="pb-4 text-sm text-bone-50/70 uppercase">
            WEBSITE BY:{" "}
            <a 
              href="https://abbaszayn.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-medium transition-colors hover:text-bone-50 hover:underline underline-offset-4"
            >
              ZAIN ABBAS
            </a>
          </div>

          {/* Bottom Row: Contact & Legal */}
          <div className="flex flex-col justify-between gap-12 border-t border-bone-50/20 pt-12 md:flex-row md:items-end">
            
            {/* Contact Details */}
            <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
              <div>
                <p className="font-medium">Office</p>
                {/* Read from SITE.address, the canonical NAP, so the address
                    shown here can't drift from the PostalAddress emitted in
                    the Organization schema or from off-site listings. */}
                <p className="mt-2 max-w-[22ch] text-sm text-bone-50/70">
                  {SITE.address.street}
                  <br />
                  {SITE.address.region}, Pakistan
                </p>
              </div>
              <div>
                <p className="font-medium">Inquiries</p>
                <p className="mt-2 text-sm text-bone-50/70 leading-relaxed">
                  <a href="mailto:info@gbmines.com" className="transition-colors hover:text-bone-50 block">info@gbmines.com</a>
                  <a href="mailto:ir@gbmines.com" className="transition-colors hover:text-bone-50 block">ir@gbmines.com</a>
                  <a href="tel:+923169244827" className="transition-colors hover:text-bone-50 block mt-2">+92 316 9244827</a>
                  <a href="tel:+923555653738" className="transition-colors hover:text-bone-50 block">+92 355 5653738</a>
                </p>
              </div>
              <div>
                <p className="font-medium">Follow Us</p>
                <p className="mt-2 text-sm text-bone-50/70">
                  <a
                    href="https://www.linkedin.com/company/zircon-mines/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-bone-50"
                  >
                    LinkedIn
                  </a>
                </p>
              </div>
            </div>

            {/* Legal / Copyright */}
            <div className="flex flex-col items-start gap-3 text-xs text-bone-50/70 md:items-end md:text-right">
              <div className="flex gap-4 mb-2">
                <Link href="/privacy-policy" className="transition-colors hover:text-bone-50">Privacy Policy</Link>
                <Link href="/terms-of-service" className="transition-colors hover:text-bone-50">Terms of Service</Link>
                <Link href="/cookies" className="transition-colors hover:text-bone-50">Cookies Settings</Link>
              </div>
              <p>&copy; {new Date().getFullYear()} GBMINES. All rights reserved.</p>
              <p className="max-w-xs">
                Operations comply with all local and international mining regulations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Grey with single-line Huge Text */}
      <div className="relative flex items-center justify-center overflow-hidden bg-[#e6e8e6] px-5 py-8 md:px-10 md:py-12">
        <p
          aria-hidden="true"
          className="whitespace-nowrap text-[15vw] font-bold leading-[0.8] tracking-[-0.05em] text-[#d4d6d4] uppercase"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          GBMINES
        </p>
      </div>
    </footer>
  );
}
