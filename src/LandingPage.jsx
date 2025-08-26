import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Rocket,
  Sparkles,
  ShieldCheck,
  Gauge,
  Zap,
  Star,
  Quote,
  Twitter,
  Github,
  Linkedin,
  Check,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardHover = {
  hover: { y: -6, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } },
};

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`scroll-mt-24 ${className}`}>{children}</section>
);

const useNavbarScrollBackground = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
};

const Navbar = () => {
  const scrolled = useNavbarScrollBackground();
  const navigate = useNavigate()

  const handleSmoothScroll = (e, selector) => {
    e.preventDefault();
    const target = document.querySelector(selector);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`mx-auto mt-4 w-[94%] max-w-7xl rounded-2xl backdrop-blur supports-[backdrop-filter]:bg-white/50 transition-colors duration-300 shadow-lg border ${
          scrolled
            ? "bg-white/60 dark:bg-zinc-900/60 border-zinc-200/50 dark:border-zinc-800"
            : "bg-white/40 dark:bg-zinc-900/40 border-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <a href="#hero" onClick={(e) => handleSmoothScroll(e, "#hero")} className="flex items-center gap-2">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-rose-500 text-white shadow">
              <Sparkles size={18} />
            </div>
            <span className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">NovaUI</span>
          </a>

          <div className="hidden gap-6 md:flex">
            {[
              { href: "#features", label: "Features" },
              { href: "#pricing", label: "Pricing" },
              { href: "#testimonials", label: "Testimonials" },
              { href: "#faq", label: "FAQ" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-zinc-800 hover:text-zinc-900 dark:text-zinc-100 md:inline"
            >
              Sign in
            </Link>
            <a
              href="#pricing"
              onClick={(e) => handleSmoothScroll(e, "#pricing")}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started
              <Rocket size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </motion.nav>
    </div>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const translateY = useTransform(scrollYProgress, [0, 1], ["0px", "-120px"]);
  const opacityBg = useTransform(scrollYProgress, [0, 1], [1, 0.7]);

  return (
    <Section id="hero" className="relative overflow-hidden pt-28">
      <div ref={ref} className="relative isolate">
        <motion.div
          style={{ y: translateY, opacity: opacityBg }}
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 aspect-[1/1] w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/30 via-fuchsia-500/30 to-rose-500/30 blur-3xl"
        />

        <div className="mx-auto max-w-7xl px-4 py-28 sm:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={containerVariants}
            className="mx-auto flex max-w-3xl flex-col items-center text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-xs font-semibold text-zinc-700 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300">
              <ShieldCheck size={14} /> Trusted by teams worldwide
            </span>

            <h1 className="mt-6 bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-900 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent dark:from-white dark:via-zinc-100 dark:to-white sm:text-6xl">
              Build delightful experiences, faster
            </h1>
            <p className="mt-5 max-w-2xl text-balance text-lg text-zinc-600 dark:text-zinc-300">
              NovaUI is a modern component toolkit that combines beautiful design, fluid animations, and production-grade code.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3 text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95 dark:bg-white dark:text-zinc-900"
              >
                Start for Free
                <Zap size={18} className="transition-transform group-hover:-rotate-12" />
              </a>
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#features")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 rounded-2xl border border-zinc-300 bg-white px-6 py-3 text-zinc-800 shadow-sm hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              >
                Explore Features
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto mt-14 w-full max-w-5xl rounded-2xl border border-zinc-200 bg-white/70 p-3 shadow-2xl backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70"
          >
            <div className="rounded-xl bg-gradient-to-tr from-indigo-600/10 via-fuchsia-600/10 to-rose-600/10 p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {[
                  { icon: Gauge, title: "Performance", desc: "Optimized, fast, and reliable" },
                  { icon: ShieldCheck, title: "Security", desc: "Enterprise-grade best practices" },
                  { icon: Sparkles, title: "Design", desc: "Polished UX with motion" },
                ].map((f) => (
                  <div key={f.title} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 text-white">
                        <f.icon size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900 dark:text-zinc-100">{f.title}</p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">{f.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

const Features = () => {
  const features = useMemo(
    () => [
      {
        icon: Sparkles,
        title: "Beautiful by default",
        desc: "Thoughtful defaults with rounded corners, soft shadows, and delightful motion.",
      },
      {
        icon: ShieldCheck,
        title: "Secure foundations",
        desc: "Built with best practices and a focus on accessibility and reliability.",
      },
      {
        icon: Gauge,
        title: "Fast performance",
        desc: "Lightweight components designed for speed on every device.",
      },
      {
        icon: Zap,
        title: "Developer friendly",
        desc: "Composable APIs with clear conventions for rapid development.",
      },
    ],
    []
  );

  return (
    <Section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">Features</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">
            Everything you need to ship polished experiences with confidence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <motion.div
              key={f.title}
              whileHover="hover"
              variants={cardHover}
              className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 text-white shadow">
                <f.icon size={20} />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{f.title}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "$0",
      period: "/mo",
      popular: false,
      features: ["Unlimited projects", "Community support", "MIT License"],
    },
    {
      name: "Pro",
      price: "$19",
      period: "/mo",
      popular: true,
      features: ["Everything in Basic", "Priority support", "Advanced components"],
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      popular: false,
      features: ["SLA & SSO", "Onboarding & training", "Dedicated solutions"],
    },
  ];

  return (
    <Section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">Pricing</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">Simple, transparent pricing for teams of all sizes.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              whileHover="hover"
              variants={cardHover}
              className={`relative rounded-2xl border bg-white p-6 shadow-lg transition-colors dark:bg-zinc-900 ${
                plan.popular
                  ? "border-indigo-300 dark:border-indigo-700"
                  : "border-zinc-200 dark:border-zinc-800"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 right-6 rounded-full bg-gradient-to-tr from-indigo-600 to-fuchsia-500 px-3 py-1 text-xs font-semibold text-white shadow">
                  Recommended
                </span>
              )}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{plan.name}</h3>
                <Star className={plan.popular ? "text-indigo-500" : "text-zinc-400"} size={18} />
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">{plan.price}</span>
                <span className="text-zinc-500 dark:text-zinc-400">{plan.period}</span>
              </div>
              <ul className="mt-5 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <Check size={16} className="mt-0.5 text-indigo-500" /> {f}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold shadow transition-transform hover:scale-[1.01] active:scale-95 ${
                  plan.popular
                    ? "bg-gradient-to-tr from-indigo-600 to-fuchsia-500 text-white"
                    : "border border-zinc-300 bg-white text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                }`}
              >
                Choose {plan.name}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const Testimonials = () => {
  const items = [
    {
      name: "Ava Thompson",
      role: "Product Designer",
      quote: "The motion and polish are on another level. Our users noticed immediately.",
    },
    {
      name: "Liam Carter",
      role: "Frontend Engineer",
      quote: "Dropping this into our stack was effortless. The defaults are spot on.",
    },
    {
      name: "Sophia Nguyen",
      role: "CTO",
      quote: "Exactly what we needed to move faster without sacrificing quality.",
    },
  ];

  const avatarFor = (name) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-fuchsia-500 text-white text-sm font-bold">
        {initials}
      </div>
    );
  };

  return (
    <Section id="testimonials" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">Loved by teams</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">Feedback from builders using NovaUI in production.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((t, idx) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: "easeOut" }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <Quote size={20} className="text-zinc-400" />
              <p className="mt-3 text-zinc-700 dark:text-zinc-300">{t.quote}</p>
              <div className="mt-5 flex items-center gap-3">
                {avatarFor(t.name)}
                <div>
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">{t.name}</div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">{t.role}</div>
                </div>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </Section>
  );
};

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-4 text-left"
      >
        <span className="font-medium text-zinc-900 dark:text-zinc-100">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="px-4"
      >
        <div className="pb-4 text-sm text-zinc-700 dark:text-zinc-300">{a}</div>
      </motion.div>
    </div>
  );
};

const FAQ = () => {
  const items = [
    {
      q: "Is NovaUI free to use?",
      a: "Yes. The Basic plan is free forever. Upgrade to Pro for advanced components and priority support.",
    },
    { q: "Does it support dark mode?", a: "Absolutely. NovaUI is dark-mode ready out of the box." },
    {
      q: "Can I use it in commercial projects?",
      a: "Yes. NovaUI is production-ready and can be used in commercial applications.",
    },
    {
      q: "Which libraries does it use?",
      a: "It uses TailwindCSS for styling, Framer Motion for animations, and lucide-react for icons.",
    },
  ];

  return (
    <Section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">FAQ</h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">Answers to common questions.</p>
        </motion.div>

        <div className="space-y-3">
          {items.map((i) => (
            <FAQItem key={i.q} q={i.q} a={i.a} />
          ))}
        </div>
      </div>
    </Section>
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 bg-white/70 py-10 dark:border-zinc-800 dark:bg-zinc-900/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-rose-500 text-white shadow">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="font-semibold text-zinc-900 dark:text-zinc-100">NovaUI</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Build delightful experiences.</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a href="#features" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
            Features
          </a>
          <a href="#pricing" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
            Pricing
          </a>
          <a href="#faq" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
            FAQ
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
            <Twitter size={18} />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
            <Linkedin size={18} />
          </a>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-zinc-500 dark:text-zinc-500">
        © {new Date().getFullYear()} NovaUI. All rights reserved.
      </div>
    </footer>
  );
};

export default function LandingPage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-50 text-zinc-900 antialiased dark:from-zinc-950 dark:to-zinc-900 dark:text-zinc-100">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}


