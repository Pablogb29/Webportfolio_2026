"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Calendar, Shield, AlertTriangle, Search, FileText, ExternalLink, X } from "lucide-react";

const metadata = {
  title: "Booking Rental Scam: Phishing & OSINT Takedown (Real Case)",
  date: "2025-09-18",
  tags: ["Phishing", "OSINT", "Incident Response", "Fraud", "Web Security"],
  role: "Investigation & Reporting",
  status: "Prevented financial loss",
};

export default function BookingPhishingCaseStudy() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };
    if (selectedImage) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  return (
    <main className="min-h-screen pt-20">
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="mb-6">
            <a
              href="/projects"
              className="inline-flex items-center gap-2 text-purple-accent hover:text-purple-accent/80 transition-colors text-sm mb-6"
            >
              ← Back to Projects
            </a>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-light mb-6">
            {metadata.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-light/80">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{metadata.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={16} />
              <span>{metadata.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-green-400" />
              <span className="text-green-400">{metadata.status}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {metadata.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-cyber-purple/20 text-purple-accent text-xs rounded border border-cyber-purple/30"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="bg-container-alt border border-accent/20 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-light/80 italic">
              <strong className="text-purple-accent">Disclaimer:</strong> Sensitive identifiers have been redacted. This content is published strictly for educational and professional purposes.
            </p>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative w-full mb-12"
          >
            <div 
              className="relative w-full aspect-video rounded-xl overflow-hidden bg-container-alt border-2 border-cyber-purple/30 shadow-[0_0_30px_rgba(147,51,234,0.2),0_0_60px_rgba(147,51,234,0.1)] group cursor-pointer"
              onClick={() => setSelectedImage("/case-studies/booking-phishing/fig-01.png")}
            >
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/5 via-transparent to-purple-accent/5 z-10 pointer-events-none" />
              
              {/* Image */}
              <Image
                src="/case-studies/booking-phishing/fig-01.png"
                alt="Rental Scam Investigation Overview - Booking Phishing Case Study"
                fill
                className="object-contain group-hover:scale-[1.02] transition-transform duration-500"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"
                onError={(e) => {
                  // Fallback if image doesn't exist yet
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement?.parentElement;
                  if (parent && !parent.querySelector('.fallback-text')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'fallback-text absolute inset-0 flex items-center justify-center text-gray-light/60 text-center p-8 z-20';
                    fallback.textContent = 'Hero image will be displayed here once extracted from PDF';
                    parent.appendChild(fallback);
                  }
                }}
              />
              
              {/* Corner accent decorations */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-purple-accent/40 rounded-tl-xl z-10 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-purple-accent/40 rounded-br-xl z-10 pointer-events-none" />
              
              {/* Click hint overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center z-20 pointer-events-none">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm font-medium">
                  Click to enlarge
                </div>
              </div>
            </div>
            
            {/* Caption */}
            <p className="text-center text-sm text-gray-light/60 mt-4 font-mono">
              Figure 1: Rental Scam Investigation Overview
            </p>
          </motion.div>
        </motion.header>

        {/* Executive Summary */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-light mb-4 flex items-center gap-3">
            <FileText className="text-purple-accent" size={32} />
            Executive Summary
          </h2>
          <div className="w-20 h-1 bg-cyber-purple mb-6" />
          <div className="bg-container-alt rounded-lg p-6 border border-accent/20">
            <p className="text-gray-light/90 leading-relaxed text-lg text-justify">
              In September 2025, a sophisticated rental scam targeting expatriates in Luxembourg was identified and investigated through OSINT techniques. The threat actor impersonated legitimate property owners on Facebook, directing victims to a phishing website that cloned Booking.com&apos;s interface. Through systematic domain analysis, infrastructure investigation, and behavioral analysis, the attack vector was mapped and reported to INCIBE and local law enforcement. This case study documents the investigation methodology, technical findings, and lessons learned from preventing potential financial losses.
            </p>
          </div>
        </motion.section>

        {/* Context & Threat Model */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-light mb-4 flex items-center gap-3">
            <AlertTriangle className="text-purple-accent" size={32} />
            Context & Threat Model
          </h2>
          <div className="w-20 h-1 bg-cyber-purple mb-6" />
          
          <div className="space-y-6 text-gray-light/90 leading-relaxed">
            <div>
              <h3 className="text-xl font-semibold text-gray-light mb-3">Rental Scam via Facebook</h3>
              <p className="text-justify">
                The threat actor leveraged Facebook groups dedicated to housing in Luxembourg, posting attractive rental listings with below-market prices. These posts targeted expatriates and international workers seeking accommodation, exploiting their urgency and potential lack of local knowledge.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-light mb-3">Identity Impersonation</h3>
              <p className="text-justify">
                The scammer created Facebook profiles impersonating legitimate property owners, using stolen or fabricated photos and minimal profile information. These profiles appeared authentic at first glance but lacked the depth and history of genuine accounts.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-light mb-3">Booking.com Brand Abuse</h3>
              <p className="text-justify">
                To add credibility, the threat actor directed victims to a phishing website that closely mimicked Booking.com&apos;s interface. This brand abuse exploited trust in a well-known platform, making the scam appear legitimate to unsuspecting victims.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Incident Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-light mb-4 flex items-center gap-3">
            <Calendar className="text-purple-accent" size={32} />
            Incident Timeline
          </h2>
          <div className="w-20 h-1 bg-cyber-purple mb-6" />
          
          <div className="bg-container-alt rounded-lg p-6 border border-accent/20">
            <ul className="space-y-4 text-gray-light/90">
              <li className="flex gap-4">
                <span className="text-purple-accent font-mono font-semibold min-w-[100px]">Sep 10</span>
                <span>Initial Facebook post detected in Luxembourg housing group</span>
              </li>
              <li className="flex gap-4">
                <span className="text-purple-accent font-mono font-semibold min-w-[100px]">Sep 11</span>
                <span>Red flags identified: suspicious profile, disabled comments, random Gmail address</span>
              </li>
              <li className="flex gap-4">
                <span className="text-purple-accent font-mono font-semibold min-w-[100px]">Sep 12</span>
                <span>Broken Booking.com link analyzed; secondary email pivot discovered</span>
              </li>
              <li className="flex gap-4">
                <span className="text-purple-accent font-mono font-semibold min-w-[100px]">Sep 13</span>
                <span>Domain analysis: e-ffiliate[.]express identified; WHOIS and infrastructure investigation</span>
              </li>
              <li className="flex gap-4">
                <span className="text-purple-accent font-mono font-semibold min-w-[100px]">Sep 14</span>
                <span>Phishing website behavior documented; payment phase analysis completed</span>
              </li>
              <li className="flex gap-4">
                <span className="text-purple-accent font-mono font-semibold min-w-[100px]">Sep 15</span>
                <span>Post-24h behavior observed: attempted executable download; report submitted to INCIBE</span>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Early Red Flags */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-light mb-4 flex items-center gap-3">
            <AlertTriangle className="text-purple-accent" size={32} />
            Early Red Flags
          </h2>
          <div className="w-20 h-1 bg-cyber-purple mb-6" />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-container-alt rounded-lg p-6 border border-accent/20">
              <h3 className="text-lg font-semibold text-gray-light mb-3">Suspicious Facebook Profile</h3>
              <p className="text-gray-light/80 text-sm text-justify">
                Profile contained minimal information, recent creation date, and lacked mutual connections or activity history typical of legitimate property owners.
              </p>
            </div>

            <div className="bg-container-alt rounded-lg p-6 border border-accent/20">
              <h3 className="text-lg font-semibold text-gray-light mb-3">Comments Disabled</h3>
              <p className="text-gray-light/80 text-sm text-justify">
                The threat actor disabled comments on posts to prevent public warnings and questions from other group members who might recognize the scam.
              </p>
            </div>

            <div className="bg-container-alt rounded-lg p-6 border border-accent/20">
              <h3 className="text-lg font-semibold text-gray-light mb-3">Random Gmail Address</h3>
              <p className="text-gray-light/80 text-sm text-justify">
                Contact email used a generic Gmail account with random characters, inconsistent with professional property management practices.
              </p>
            </div>

            <div className="bg-container-alt rounded-lg p-6 border border-accent/20">
              <h3 className="text-lg font-semibold text-gray-light mb-3">Refusal to Provide Phone Number</h3>
              <p className="text-gray-light/80 text-sm text-justify">
                When requested, the threat actor refused to provide a phone number or schedule a property viewing, insisting on online-only communication and payment.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Technical Analysis */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-light mb-4 flex items-center gap-3">
            <Search className="text-purple-accent" size={32} />
            Technical Analysis
          </h2>
          <div className="w-20 h-1 bg-cyber-purple mb-6" />
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-light mb-3">Broken Booking.com Link as Trigger</h3>
              <p className="text-gray-light/90 leading-relaxed mb-4 text-justify">
                The initial link provided appeared to be a Booking.com URL but was malformed or broken. This served as a pretext to redirect victims to a secondary communication channel, where the threat actor could provide the &quot;correct&quot; link to the phishing website.
              </p>
              <div className="bg-container-alt rounded-lg p-4 border border-accent/20 font-mono text-sm text-gray-light/80">
                <code>booking[.]com/invalid-link-redirect</code>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-light mb-3">Secondary Email Pivot</h3>
              <p className="text-gray-light/90 leading-relaxed mb-4 text-justify">
                When the initial link failed, the threat actor provided a secondary email address and directed victims to contact them directly. This email was used to send the phishing link, bypassing Facebook&apos;s link scanning mechanisms.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-light mb-3">Domain Analysis: e-ffiliate[.]express</h3>
              <p className="text-gray-light/90 leading-relaxed mb-4 text-justify">
                The phishing domain e-ffiliate[.]express was identified through email analysis. Key findings:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-light/90 ml-4 mb-4">
                <li>Domain registered less than 30 days before the incident</li>
                <li>No historical reputation or legitimate use</li>
                <li>Typo-squatting pattern attempting to mimic legitimate affiliate domains</li>
                <li>Cloudflare CDN usage to obfuscate origin infrastructure</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-light mb-3">WHOIS / Infrastructure Indicators</h3>
              <p className="text-gray-light/90 leading-relaxed mb-4 text-justify">
                WHOIS data revealed:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-light/90 ml-4 mb-4">
                <li>Privacy-protected registration (common for malicious domains)</li>
                <li>Recent creation date indicating opportunistic registration</li>
                <li>Cloudflare nameservers used for anonymity and DDoS protection</li>
                <li>No associated SSL certificate history or legitimate services</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-light mb-3">Phishing Website Behavior</h3>
              <p className="text-gray-light/90 leading-relaxed mb-4">
                Analysis of the phishing website revealed:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-light/90 ml-4 mb-4">
                <li>Static clone of Booking.com interface with minor modifications</li>
                <li>Broken navigation links (non-functional menu items)</li>
                <li>No actual booking functionality—form submissions redirected to payment collection</li>
                <li>SSL certificate issued by free CA, inconsistent with Booking.com&apos;s infrastructure</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-light mb-3">Payment Phase Analysis</h3>
              <p className="text-gray-light/90 leading-relaxed mb-4">
                The payment collection mechanism followed a classic mule account pattern:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-light/90 ml-4 mb-4">
                <li>Victims instructed to transfer funds via bank transfer (not credit card)</li>
                <li>IBAN provided belonged to a mule account (last 4 digits: XXXX)</li>
                <li>Urgency tactics: &quot;Limited availability&quot;, &quot;Multiple interested parties&quot;</li>
                <li>No receipt or booking confirmation provided after payment</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-light mb-3">Post-24h Behavior</h3>
              <p className="text-gray-light/90 leading-relaxed mb-4">
                After 24 hours, the phishing website attempted to download an executable file to the victim&apos;s device. This indicates potential malware distribution as a secondary attack vector, likely for credential theft or remote access.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Mitigations & Lessons Learned */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-light mb-4 flex items-center gap-3">
            <Shield className="text-purple-accent" size={32} />
            Mitigations & Lessons Learned
          </h2>
          <div className="w-20 h-1 bg-cyber-purple mb-6" />
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-light mb-3">Practical Checklist</h3>
              <div className="bg-container-alt rounded-lg p-6 border border-accent/20">
                <ul className="space-y-3 text-gray-light/90">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-accent mt-1">✓</span>
                    <span>Verify property ownership through official registries or property management companies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-accent mt-1">✓</span>
                    <span>Request in-person property viewing before any payment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-accent mt-1">✓</span>
                    <span>Verify domain authenticity—check for typos, recent registration dates, and SSL certificate details</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-accent mt-1">✓</span>
                    <span>Be suspicious of below-market prices and urgency tactics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-accent mt-1">✓</span>
                    <span>Never transfer funds via bank transfer for rental deposits without verified contracts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-accent mt-1">✓</span>
                    <span>Check social media profiles for authenticity: mutual connections, posting history, profile completeness</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-light mb-3">Reporting & Escalation</h3>
              <p className="text-gray-light/90 leading-relaxed mb-4">
                The incident was reported to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-light/90 ml-4">
                <li><strong>INCIBE</strong> (Instituto Nacional de Ciberseguridad): Phishing domain and infrastructure details</li>
                <li><strong>Local Law Enforcement</strong>: Fraud report with evidence documentation</li>
                <li><strong>Facebook Security</strong>: Impersonation and scam account reporting</li>
                <li><strong>Cloudflare Abuse</strong>: Malicious domain hosting notification</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Evidence Gallery */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-light mb-4 flex items-center gap-3">
            <FileText className="text-purple-accent" size={32} />
            Evidence Gallery
          </h2>
          <div className="w-20 h-1 bg-cyber-purple mb-6" />
          
          <div className="grid md:grid-cols-2 gap-6">
            {[2, 3, 4, 5, 6].map((figNum) => {
              const imageSrc = `/case-studies/booking-phishing/fig-0${figNum}.png`;
              const figureTitles: Record<number, string> = {
                2: "Facebook Rental Post - Suspicious Profile & Apartment Listing",
                3: "Phishing Email - Broken Booking.com Link Redirect",
                4: "Phishing Website Infrastructure - Cloudflare CDN & Network Status",
                5: "Domain Analysis - e-ffiliate.express WHOIS & Threat Intelligence",
                6: "Payment Collection Form - Bank Transfer Details (IBAN/SWIFT)"
              };
              
              return (
                <div 
                  key={figNum} 
                  className="bg-container-alt rounded-lg overflow-hidden border border-accent/20 group cursor-pointer hover:border-purple-accent/40 transition-colors"
                  onClick={() => setSelectedImage(imageSrc)}
                >
                  <div className="relative w-full h-48 bg-container flex items-center justify-center overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={`Figure ${figNum}: ${figureTitles[figNum]}`}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.fallback-text')) {
                          const fallback = document.createElement('div');
                          fallback.className = 'fallback-text text-gray-light/60 text-xs text-center p-4';
                          fallback.textContent = `Figure ${figNum} placeholder - Extract from PDF`;
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                    {/* Click hint overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded text-white text-xs font-medium">
                        Click to enlarge
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-light/80 font-mono">
                      Figure {figNum}: {figureTitles[figNum]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Footer Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 pt-8 border-t border-accent/20"
        >
          <a
            href="/projects"
            className="inline-flex items-center gap-2 text-purple-accent hover:text-purple-accent/80 transition-colors"
          >
            ← Back to Projects
          </a>
        </motion.div>
      </article>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-60 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors backdrop-blur-sm border border-white/20"
                aria-label="Close image"
              >
                <X size={24} />
              </button>

              {/* Image Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={selectedImage}
                    alt="Enlarged evidence image"
                    fill
                    className="object-contain"
                    sizes="90vw"
                    priority
                  />
                </div>
              </motion.div>

              {/* Instructions */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm">
                Press ESC or click outside to close
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

