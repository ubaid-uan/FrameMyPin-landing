import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { 
  Check, X, Link as LinkIcon, Sparkles, Box, Layout, 
  Calendar, BarChart, ChevronRight, Twitter, Instagram 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PinCardsScene } from './components/PinCardsScene';
import { Analytics } from '@vercel/analytics/react';

// ----------------------------------------------------------------------
// REUSABLE COMPONENTS
// ----------------------------------------------------------------------

const Logo = () => (
  <div className="flex items-center gap-3 relative z-50">
    <div className="relative flex flex-col w-6 h-6 shadow-[0_0_15px_rgba(227,0,15,0.4)]">
      <div className="w-full h-1/2 bg-[#E3000F] rounded-t-sm"></div>
      <div className="w-full h-1/2 bg-white rounded-b-sm"></div>
    </div>
    <span className="font-display font-normal tracking-wide text-2xl text-white uppercase mt-1">
      FrameMyPin
    </span>
  </div>
);

const LogoMark = ({ className = "w-6 h-6" }: { className?: string }) => (
  <div className={`relative flex flex-col ${className}`}>
    <div className="w-full h-1/2 bg-brand-red rounded-t-sm"></div>
    <div className="w-full h-1/2 bg-white/20 rounded-b-sm"></div>
  </div>
);

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D11139', '#ffffff', '#1A1618']
      });
      setEmail('');
    }, 1200);
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="px-6 py-4 rounded-xl bg-white/5 border border-brand-red/30 backdrop-blur-md"
      >
        <p className="font-display font-medium text-brand-red flex items-center gap-2">
          <LogoMark className="w-4 h-4" />
          You're on the list! Keep an eye on your inbox.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="w-full relative bg-brand-muted/50 border border-white/10 px-5 py-3.5 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-brand-red transition-colors font-body shadow-inner"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="relative whitespace-nowrap bg-brand-red text-white font-display font-medium px-8 py-3.5 rounded-xl transition-all hover:bg-brand-red/90 disabled:opacity-70 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(209,17,57,0.2)] hover:shadow-[0_0_30px_rgba(209,17,57,0.4)]"
      >
        {status === 'loading' ? 'Joining...' : 'Get Early Access'}
      </button>
    </form>
  );
};

// ----------------------------------------------------------------------
// SECTIONS
// ----------------------------------------------------------------------

const Navbar = () => (
  <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
    <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5">
      <Logo />
      <div className="flex items-center gap-6">
        <div className="hidden md:flex gap-6">
          <a href="#features" className="text-sm font-body text-white/50 hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-body text-white/50 hover:text-white transition-colors">How It Works</a>
          <a href="#pricing" className="text-sm font-body text-white/50 hover:text-white transition-colors">Pricing</a>
        </div>
        <a href="#waitlist" className="text-sm font-medium text-white bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-lg transition-colors border border-white/10 flex items-center gap-2">
          Join Waitlist <ChevronRight size={16} />
        </a>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="pt-40 pb-24 lg:min-h-[85vh] flex flex-col justify-center">
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      className="max-w-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <LogoMark className="w-5 h-5" />
        <span className="font-body text-brand-red font-bold uppercase tracking-widest text-xs">
          The Pinterest Growth Tool Creators Actually Needed
        </span>
      </div>
      
      <h1 className="font-display text-6xl sm:text-7xl lg:text-[100px] font-normal leading-[0.9] tracking-normal mb-8 uppercase text-white shadow-black/50 drop-shadow-lg">
        Your Website.<br/>
        Your Ideas.<br/>
        Infinite Pins.
      </h1>
      
      <p className="font-body text-lg md:text-xl text-white/60 mb-10 leading-relaxed font-light">
        Stop spending Sunday nights in Canva.<br/>
        FrameMyPin turns your URLs and ideas into scroll-stopping Pinterest pins—designed, written, and scheduled by AI. In seconds.
      </p>

      <div className="flex flex-col gap-4 mb-6 relative z-20">
        <EmailForm />
      </div>

      <div className="flex flex-col gap-1 mt-4">
        <p className="text-sm font-body text-white/60">
          <span className="text-white font-medium">⚡ 847 creators</span> already on the waitlist · Free forever plan coming
        </p>
      </div>
    </motion.div>
  </section>
);

const PainSection = () => (
  <section className="py-24 border-t border-white/5 relative">
    <div className="max-w-xl">
      <div className="mb-12">
        <span className="font-body font-bold uppercase tracking-widest text-xs mb-4 block text-white/40">
          SOUND FAMILIAR?
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-normal leading-[0.95] uppercase">
          Pinterest Could Be Your #1 Traffic Source.<br/>
          <span className="text-white/40">But Who Has Time For That?</span>
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        <div className="p-6 bg-brand-muted/40 border border-white/5 rounded-xl">
          <p className="font-body text-white/80 leading-relaxed text-sm">"I spend 3 hours a week just making pins and my traffic barely budges."</p>
        </div>
        <div className="p-6 bg-brand-muted/40 border border-white/5 rounded-xl">
          <p className="font-body text-white/80 leading-relaxed text-sm">"Tailwind is $50/month and I still have to design everything myself."</p>
        </div>
        <div className="p-6 bg-brand-muted/40 border border-white/5 rounded-xl">
          <p className="font-body text-white/80 leading-relaxed text-sm">"I know I need to post 5x a day but I can barely manage 5x a week."</p>
        </div>
        <div className="p-6 bg-brand-muted/40 border border-white/5 rounded-xl">
          <p className="font-body text-white/80 leading-relaxed text-sm">"I've got 200 blog posts sitting there. None of them have Pinterest pins."</p>
        </div>
      </div>

      <div>
        <p className="font-body text-lg text-white/60 font-light">
          You're not lazy. You're just doing it the hardest possible way. <br/>
          <span className="text-brand-red font-medium mt-2 inline-block">There's a better one. &darr;</span>
        </p>
      </div>
    </div>
  </section>
);

const ProductIntro = () => (
  <section className="py-32 relative">
    <div className="max-w-xl">
      <div className="mb-16">
        <LogoMark className="w-6 h-6 mb-6" />
        <span className="font-body font-bold uppercase tracking-widest text-xs mb-4 block text-brand-red">
          INTRODUCING FRAMEMYPIN
        </span>
        <h2 className="font-display text-5xl sm:text-6xl font-normal mb-6 leading-[0.95] uppercase">
          Three Ways to Generate Pins.<br/>
          <span className="text-white/40">Zero Time Wasted.</span>
        </h2>
      </div>

      <div className="space-y-12">
        
        {/* Method 1 */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="p-8 pb-10 border border-white/10 rounded-2xl bg-[#131012]">
            <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-6">
              <span className="font-display text-4xl text-brand-red">01</span>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>
            <h3 className="font-display text-2xl font-medium tracking-wide mb-4 text-white">
              Article Image + Text Overlay
            </h3>
            <div className="space-y-4 font-body text-white/60 font-light leading-relaxed mb-6">
              <p>Drop your URL. We extract the best images from your page and apply high-converting text overlays and headlines intelligently.</p>
              <p className="font-medium text-white/80">Ready to post. Done in 8 seconds.</p>
            </div>
          </div>
        </motion.div>

        {/* Method 2 */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <div className="p-8 pb-10 border border-white/10 rounded-2xl bg-[#131012]">
            <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-6">
              <span className="font-display text-4xl text-white/40">02</span>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>
            <h3 className="font-display text-2xl font-medium tracking-wide mb-4 text-white">
              Generate AI Pins From URL
            </h3>
            <div className="space-y-4 font-body text-white/60 font-light leading-relaxed mb-6">
              <p>Want fresh visuals? We read your article and generate 100% original, aesthetic lifestyle images that match the context.</p>
              <p>Build an entire Pinterest presence from one single URL.</p>
            </div>
          </div>
        </motion.div>

        {/* Method 3 */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <div className="p-8 pb-10 border border-brand-red/30 rounded-2xl bg-brand-red/[0.02]">
            <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-6">
              <span className="font-display text-4xl text-brand-red">03</span>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>
            <h3 className="font-display text-2xl font-medium tracking-wide mb-4 text-white">
              Pins with Product Images
            </h3>
            <div className="space-y-4 font-body text-white/60 font-light leading-relaxed mb-6">
              <p>Upload a product image. We generate stunning lifestyle AI pins featuring your product seamlessly integrated into the scene.</p>
              <p className="font-medium text-white/80">Perfect for Shopify & Etsy sellers.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 border-y border-white/5">
    <div className="max-w-xl">
      <div className="mb-16">
        <h2 className="font-display text-4xl sm:text-5xl font-normal mb-4 leading-[0.95] uppercase">
          From Zero to Pinning in 3 Minutes.<br/>
          <span className="text-white/40">Not 3 Hours.</span>
        </h2>
      </div>

      <div className="space-y-10">
        <div className="flex gap-6">
          <div className="mt-1 font-display text-xl text-white/40">01</div>
          <div>
            <h3 className="font-display text-xl font-medium mb-2">Connect</h3>
            <p className="font-body text-white/50 font-light">Link your Pinterest account. Takes 30 seconds, works instantly.</p>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="mt-1 font-display text-xl text-white/40">02</div>
          <div>
            <h3 className="font-display text-xl font-medium mb-2">Create</h3>
            <p className="font-body text-white/50 font-light">Paste a URL, describe your niche, or upload a product. Hit generate.</p>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="mt-1 font-display text-xl text-brand-red">03</div>
          <div>
            <h3 className="font-display text-xl font-medium mb-2">Grow</h3>
            <p className="font-body text-white/50 font-light">Approve, schedule, and let FrameMyPin post automatically.</p>
            <p className="text-brand-red text-sm font-medium mt-3 italic">"While you sleep, your pins are working."</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Features = () => {
  const feats = [
    { icon: <Layout size={20} />, title: "AI Pin Designer", desc: "No Canva templates. Just type or paste, and get a pin that actually looks good." },
    { icon: <LinkIcon size={20} />, title: "URL Intelligence", desc: "We read your page like a human. Pull images, understand context, generate copy." },
    { icon: <Sparkles size={20} />, title: "AI Copywriter", desc: "Bold headlines, keyword-rich descriptions, and CTAs. Automatically." },
    { icon: <Calendar size={20} />, title: "Smart Scheduling", desc: "Post 5x/day without thinking. We avoid Pinterest's spam filters." },
    { icon: <BarChart size={20} />, title: "See What Works", desc: "Know which pins are driving clicks before you double down with built-in analytics." },
    { icon: <Box size={20} />, title: "Bulk Generation", desc: "Turn 200 old blog posts into 1,000 fresh pins in one afternoon." }
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-xl">
        <div className="mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-normal mb-4 leading-[0.95] uppercase">Everything Tailwind Isn't.</h2>
          <p className="font-body text-lg text-white/50 font-light">
            Built from scratch for 2026 Pinterest. No bloat. No massive bills.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
          {feats.map((feat, i) => (
            <div key={i}>
              <div className="mb-4 text-white/80">{feat.icon}</div>
              <h3 className="font-display text-lg font-medium mb-2">{feat.title}</h3>
              <p className="font-body text-white/50 font-light text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VsCompetitors = () => (
  <section id="pricing" className="py-32 bg-brand-muted/30 border-t border-white/5 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <LogoMark className="mx-auto w-6 h-6 mb-6" />
        <h2 className="font-display text-5xl sm:text-6xl font-normal mb-6 uppercase">Why Not Just Use Tailwind?</h2>
        <p className="font-body text-white/50">Stop paying for bloated software that forces you to do the design work yourself.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-20">
        
        {/* Tailwind Card */}
        <div className="bg-[#211E1F] border border-white/10 rounded-2xl flex flex-col p-8">
          <div className="text-center mb-6 pb-6 border-b border-white/5">
            <h3 className="font-display text-xl text-white font-medium mb-1">Tailwind</h3>
            <p className="font-body text-white/50">$17.99/mo</p>
          </div>
          <div className="flex flex-col gap-4">
            {['Free plan', 'Learn from analytics', 'Context-based AI pin generation', 'Generate pins with product images'].map((txt, i) => (
              <div key={i} className="flex gap-3">
                <X className="w-5 h-5 text-white/30 shrink-0 mt-0.5" />
                <span className="font-body text-sm text-white/50">{txt}</span>
              </div>
            ))}
            <div className="flex gap-3">
              <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="font-body text-sm text-white/80">Scheduling</span>
            </div>
          </div>
        </div>

        {/* BlogToPin Card */}
        <div className="bg-[#211E1F] border border-white/10 rounded-2xl flex flex-col p-8">
          <div className="text-center mb-6 pb-6 border-b border-white/5">
            <h3 className="font-display text-xl text-white font-medium mb-1">BlogToPin</h3>
            <p className="font-body text-white/50">$25/mo</p>
          </div>
          <div className="flex flex-col gap-4">
            {['Free plan', 'Learn from analytics'].map((txt, i) => (
              <div key={i} className="flex gap-3">
                <X className="w-5 h-5 text-white/30 shrink-0 mt-0.5" />
                <span className="font-body text-sm text-white/50">{txt}</span>
              </div>
            ))}
            {['Context-based AI pin generation', 'Generate pins with product images', 'Scheduling'].map((txt, i) => (
              <div key={i} className="flex gap-3">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-body text-sm text-white/80">{txt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pin Generator Card */}
        <div className="bg-[#211E1F] border border-white/10 rounded-2xl flex flex-col p-8">
          <div className="text-center mb-6 pb-6 border-b border-white/5">
            <h3 className="font-display text-xl text-white font-medium mb-1">Pin Generator</h3>
            <p className="font-body text-white/50">$29/mo</p>
          </div>
          <div className="flex flex-col gap-4">
            {['Free plan', 'Learn from analytics'].map((txt, i) => (
              <div key={i} className="flex gap-3">
                <X className="w-5 h-5 text-white/30 shrink-0 mt-0.5" />
                <span className="font-body text-sm text-white/50">{txt}</span>
              </div>
            ))}
            {['Context-based AI pin generation', 'Generate pins with product images', 'Scheduling'].map((txt, i) => (
              <div key={i} className="flex gap-3">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="font-body text-sm text-white/80">{txt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FrameMyPin Card */}
        <div className="bg-[#211E1F] border-2 border-brand-red rounded-2xl flex flex-col p-8 relative shadow-2xl shadow-brand-red/10 scale-105 z-10">
          <div className="absolute -top-4 w-full left-0 flex justify-center">
            <div className="bg-brand-red text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg shadow-brand-red/40">
              ⭐ Best for you
            </div>
          </div>
          <div className="text-center mb-6 pb-6 border-b border-white/5 mt-2">
            <h3 className="font-display text-2xl text-white font-bold mb-1">FrameMyPin</h3>
            <p className="font-body text-white/80">Free to start</p>
          </div>
          <div className="flex flex-col gap-4">
            {['Free plan', 'Learn from analytics', 'Context-based AI pin generation', 'Generate pins with product images', 'Scheduling'].map((txt, i) => (
              <div key={i} className="flex gap-3">
                <Check className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <span className="font-body text-sm text-white/90 font-medium">{txt}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="text-center mt-12">
        <p className="font-body text-sm text-white/40">Pricing accurate as of May 2026 · Annual plans may vary</p>
      </div>
    </div>
  </section>
);

const WhoItsFor = () => (
  <section className="py-24 border-t border-white/5 max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-12 gap-16 items-center">
    <div className="lg:col-span-5">
      <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-6 leading-tight">
        FrameMyPin Is Built For You If...
      </h2>
      <p className="font-body text-white/50 leading-relaxed">If you want Pinterest to be your #1 traffic source but don't have hours to dedicate to designing and writing content manually.</p>
    </div>
    <div className="lg:col-span-7 space-y-4">
      {[
        "You're a blogger who got hit by Google's algorithm and needs a new traffic source — fast.",
        "You run an Etsy shop or Shopify store and know Pinterest buyers actually buy.",
        "You're a content creator who wants to build a Pinterest presence without a website or blog.",
        "You've tried Tailwind, found it too expensive, and gone back to doing everything manually.",
        "You have a stack of old blog posts that deserve way more traffic than they're getting."
      ].map((point, i) => (
        <div key={i} className="flex gap-4 items-start p-5 bg-white/[0.02] rounded-xl border border-white/5 hover:border-white/10 transition-colors">
          <Check className="text-brand-red shrink-0 w-5 h-5 mt-0.5" />
          <p className="font-body text-white/70 font-light leading-relaxed">{point}</p>
        </div>
      ))}
    </div>
  </section>
);

const FooterCTA = () => (
  <section id="waitlist" className="py-32 text-center border-t border-white/5 bg-[#140E10]">
    <div className="max-w-3xl mx-auto px-6 relative z-10">
      <LogoMark className="mx-auto w-8 h-8 mb-8" />
      <h2 className="font-display text-5xl sm:text-6xl font-semibold mb-6 uppercase tracking-tight leading-[1.1]">
        Pinterest Is The Most <br/> Underused Traffic Source <br/> In 2026.
      </h2>
      <p className="font-display text-3xl text-brand-red mb-10">Don't Miss Your Window.</p>
      
      <p className="font-body text-lg text-white/60 font-light mb-12 max-w-xl mx-auto leading-relaxed">
        Bloggers who lost Google traffic are flocking to Pinterest.<br/>
        Creators who automate it early are winning.<br/>
        FrameMyPin is how you get ahead before everyone else figures it out.
      </p>
      
      <div className="flex justify-center mb-8">
        <EmailForm />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 font-body text-sm text-white/40 mb-10">
        <span className="flex items-center gap-2"><Check size={16} className="text-brand-red"/> Free plan available</span>
        <span className="flex items-center gap-2"><Check size={16} className="text-brand-red"/> Early access gets 40% discount</span>
        <span className="flex items-center gap-2"><Check size={16} className="text-brand-red"/> No spam.</span>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-white/5 py-12 text-center md:text-left bg-[#0A0708]">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex flex-col gap-2">
        <Logo />
        <p className="font-body text-sm text-white/30 max-w-sm mt-3">
          Turn any URL or idea into a Pinterest pin. Automatically. Designed for 2026.
        </p>
      </div>
      <div className="flex gap-4">
        <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"><Twitter size={18}/></a>
        <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"><Instagram size={18}/></a>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between text-xs font-body text-white/30">
      <p>© 2026 FrameMyPin. All rights reserved.</p>
      <div className="flex gap-6 mt-4 md:mt-0">
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
      </div>
    </div>
  </footer>
);

// ----------------------------------------------------------------------
// MAIN APP COMPONENT
// ----------------------------------------------------------------------

export default function App() {
  return (
    <div className="min-h-screen bg-brand-bg text-white selection:bg-brand-red selection:text-white scroll-smooth relative">
      
      {/* FULLSCREEN 3D CANVAS BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 40 }}
          gl={{ 
            antialias: true, 
            toneMapping: THREE.ACESFilmicToneMapping, 
            toneMappingExposure: 1.2, 
            alpha: true 
          }}
          shadows={{ type: THREE.PCFSoftShadowMap }}
        >
          <PinCardsScene />
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col w-full">
        <Navbar />
        
        <main className="w-full max-w-7xl mx-auto px-6 flex flex-col relative z-10 pointer-events-none">
          <div className="flex flex-col relative z-20 pointer-events-auto w-full md:w-1/2 lg:w-5/12">
            {/* Sections will have their own max-width constraints */}
            <Hero />
            <PainSection />
            <ProductIntro />
            <HowItWorks />
            <Features />
          </div>
        </main>

        {/* Full width sections */}
        <div className="w-full relative z-20 pointer-events-auto bg-brand-bg/80 backdrop-blur-md">
          <VsCompetitors />
          <WhoItsFor />
          <FooterCTA />
          <Footer />
        </div>
      </div>

      <Analytics />
    </div>
  );
}
