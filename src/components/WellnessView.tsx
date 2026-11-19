import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Home,
  BookOpen,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Phone,
  ChevronLeft,
  ChevronRight,
  X,
  Share2,
  Check,
} from 'lucide-react';
import { WELLNESS_ARTICLES, WellnessArticle, ArticleCategory } from '../data/wellnessArticles';
import { WELLNESS_FACTS } from '../data/wellnessFacts';
import { soundEngine } from '../utils/audio';

interface WellnessViewProps {
  currentPath: string; // '/learn' or '/learn/<slug>'
  onNavigate: (path: string) => void;
  onClose: () => void;
}

export const WellnessView: React.FC<WellnessViewProps> = ({
  currentPath,
  onNavigate,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copied, setCopied] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const isHub = currentPath === '/learn' || currentPath === '/learn/';
  const articleSlug = currentPath.replace(/^\/learn\/?/, '');
  const activeArticle = WELLNESS_ARTICLES.find((a) => a.slug === articleSlug);

  // Scroll to top whenever path changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  // Handle ESC key to exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const categories: ('All' | ArticleCategory)[] = [
    'All',
    'Nervous System',
    'Sleep & Focus',
    'Emotional Health',
    'Mind-Body',
  ];

  const filteredArticles = selectedCategory === 'All'
    ? WELLNESS_ARTICLES
    : WELLNESS_ARTICLES.filter((a) => a.category === selectedCategory);

  const handleCopyLink = () => {
    soundEngine.playScrubTick();
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextFact = () => {
    soundEngine.playScrubTick();
    setCurrentFactIndex((prev) => (prev + 1) % WELLNESS_FACTS.length);
  };

  const prevFact = () => {
    soundEngine.playScrubTick();
    setCurrentFactIndex((prev) => (prev - 1 + WELLNESS_FACTS.length) % WELLNESS_FACTS.length);
  };

  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto bg-pop-cream/95 backdrop-blur-2xl text-slate-900 font-sans selection:bg-pop-lime selection:text-pop-forest">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b-2 border-slate-900/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono font-bold text-slate-600 truncate">
            <button
              onClick={() => {
                soundEngine.playScrubTick();
                onClose();
              }}
              data-cursor="pointer"
              className="flex items-center gap-1 hover:text-pop-forest transition-colors text-slate-800"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span>/</span>
            {isHub ? (
              <span className="text-slate-900">Wellness Library</span>
            ) : (
              <>
                <button
                  onClick={() => {
                    soundEngine.playScrubTick();
                    onNavigate('/learn');
                  }}
                  data-cursor="pointer"
                  className="hover:text-pop-forest transition-colors text-slate-800"
                >
                  Learn
                </button>
                <span>/</span>
                <span className="text-slate-900 truncate max-w-[180px] sm:max-w-xs">
                  {activeArticle?.title}
                </span>
              </>
            )}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {!isHub && (
              <button
                onClick={handleCopyLink}
                data-cursor="pointer"
                title="Copy Guide Link"
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              </button>
            )}
            <button
              onClick={() => {
                soundEngine.playScrubTick();
                onClose();
              }}
              data-cursor="pointer"
              aria-label="Close view and return to home"
              className="p-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {isHub ? (
          /* ======================================================== */
          /* WELLNESS LIBRARY HUB (/learn)                            */
          /* ======================================================== */
          <div>
            {/* Hero Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pop-lime text-pop-forest text-xs font-mono font-bold uppercase mb-4 border-2 border-slate-900 shadow-cartoon-sm">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Wellness Library &amp; Clinical Guides</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-sans font-extrabold text-slate-900 tracking-tight mb-4">
                The Science of Presence &amp; Calm
              </h1>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                Explore science-backed clinical guides on anxiety, insomnia, burnout, doomscrolling, trauma recovery, and vagal breathwork designed for daily calm.
              </p>
            </div>

            {/* Did You Know? Strip */}
            <div className="bg-white rounded-[28px] p-6 sm:p-8 border-4 border-slate-900 shadow-cartoon mb-12">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-pop-forest uppercase">
                  <span>{WELLNESS_FACTS[currentFactIndex].icon}</span>
                  <span>Mindful Science Fact {currentFactIndex + 1} of {WELLNESS_FACTS.length}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={prevFact}
                    aria-label="Previous fact"
                    className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={nextFact}
                    aria-label="Next fact"
                    className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <h3 className="font-extrabold text-base text-slate-900 mb-1">
                {WELLNESS_FACTS[currentFactIndex].title}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {WELLNESS_FACTS[currentFactIndex].fact}
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    soundEngine.playScrubTick();
                    setSelectedCategory(cat);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all border-2 border-slate-900 ${
                    selectedCategory === cat
                      ? 'bg-slate-950 text-white shadow-cartoon transform -translate-y-0.5'
                      : 'bg-white text-slate-700 hover:bg-slate-100 shadow-cartoon-sm'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Articles List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {filteredArticles.map((article) => (
                <article
                  key={article.slug}
                  className="group bg-white rounded-[28px] p-6 border-4 border-slate-900 shadow-cartoon hover:shadow-cartoon-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
                        {article.category}
                      </span>
                      <span>{article.readTime}</span>
                    </div>

                    <h2 className="text-xl font-sans font-extrabold text-slate-900 mb-2 leading-snug group-hover:text-pop-forest transition-colors">
                      <button
                        onClick={() => {
                          soundEngine.playScrubTick();
                          onNavigate(article.path);
                        }}
                        className="text-left focus:outline-none"
                      >
                        <span className="mr-2 select-none">{article.icon}</span>
                        {article.title}
                      </button>
                    </h2>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4 font-normal">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-pop-forest truncate max-w-[200px]">
                      ✨ {article.instilllFeature.name}
                    </span>
                    <button
                      onClick={() => {
                        soundEngine.playScrubTick();
                        onNavigate(article.path);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-mono font-bold hover:bg-pop-forest transition-colors"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : activeArticle ? (
          /* ======================================================== */
          /* INDIVIDUAL ARTICLE PAGE (/learn/<slug>)                  */
          /* ======================================================== */
          <article className="bg-white/95 backdrop-blur-xl rounded-[36px] p-6 sm:p-12 border-4 border-slate-900 shadow-cartoon text-slate-900">
            {/* Article Top Nav Controls */}
            <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b-2 border-slate-100">
              <button
                onClick={() => {
                  soundEngine.playScrubTick();
                  onNavigate('/learn');
                }}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-700 hover:text-pop-forest transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Wellness Library</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                <span>{activeArticle.readTime}</span>
              </div>
            </div>

            {/* Category Pill & Metadata */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="px-3 py-1 rounded-full bg-pop-lime text-pop-forest text-xs font-mono font-bold border border-pop-forest/20 shadow-cartoon-sm">
                {activeArticle.category}
              </span>
              <span className="text-xs font-mono text-slate-500">
                Updated {activeArticle.lastUpdated}
              </span>
            </div>

            {/* Title & Lead */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              <span className="mr-3 select-none">{activeArticle.icon}</span>
              {activeArticle.title}
            </h1>

            <p className="text-base sm:text-xl text-slate-700 leading-relaxed font-medium mb-10 pb-8 border-b-2 border-slate-100">
              {activeArticle.lead}
            </p>

            {/* In-Article Fun Fact Callout */}
            <div className="my-10 p-6 sm:p-8 rounded-[28px] bg-amber-50/80 border-4 border-amber-300 shadow-cartoon relative overflow-hidden">
              <div className="flex items-start gap-3">
                <span className="text-3xl select-none">💡</span>
                <div>
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-800 mb-1">
                    Mindful Science • Fun Fact
                  </div>
                  <p className="text-sm sm:text-base text-amber-950 leading-relaxed font-semibold">
                    {activeArticle.funFactCallout}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Article Body Sections */}
            <div className="space-y-10 my-10">
              {activeArticle.sections.map((section, idx) => (
                <section key={idx} className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-sans font-extrabold text-slate-900 tracking-tight">
                    {section.heading}
                  </h2>

                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                      {p}
                    </p>
                  ))}

                  {section.subpoints && (
                    <div className="grid grid-cols-1 gap-3.5 pt-2">
                      {section.subpoints.map((pt, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200/80 shadow-sm"
                        >
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-pop-forest" />
                            {pt.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-4 font-normal">
                            {pt.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Try This in instilll CTA Card */}
            <div className="my-12 p-6 sm:p-8 rounded-[32px] bg-pop-forest text-white border-4 border-slate-900 shadow-cartoon flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-2 max-w-lg">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pop-lime text-pop-forest text-xs font-mono font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Try This in instilll</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-sans font-extrabold text-white">
                  {activeArticle.instilllFeature.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {activeArticle.instilllFeature.description}
                </p>
              </div>

              <a
                href={activeArticle.instilllFeature.href}
                onClick={(e) => {
                  e.preventDefault();
                  soundEngine.playScrubTick();
                  onClose();
                  const targetId = activeArticle.instilllFeature.href.replace('/#', '');
                  const el = document.getElementById(targetId);
                  if (el) {
                    setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
                  }
                }}
                className="px-6 py-3 rounded-full bg-pop-lime text-pop-forest hover:bg-white font-mono font-bold text-xs sm:text-sm transition-all shadow-cartoon-sm flex-shrink-0 flex items-center gap-2"
              >
                <span>Launch Tool</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Related Guides */}
            {activeArticle.relatedArticleSlugs.length > 0 && (
              <div className="my-12 pt-10 border-t-2 border-slate-100">
                <h3 className="text-base sm:text-lg font-sans font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-pop-forest" />
                  <span>Related Wellness Guides</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {activeArticle.relatedArticleSlugs.map((slug) => {
                    const related = WELLNESS_ARTICLES.find((a) => a.slug === slug);
                    if (!related) return null;
                    return (
                      <button
                        key={slug}
                        onClick={() => {
                          soundEngine.playScrubTick();
                          onNavigate(related.path);
                        }}
                        className="text-left p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border-2 border-slate-200/80 transition-all group flex flex-col justify-between"
                      >
                        <div className="text-xs font-bold text-slate-900 group-hover:text-pop-forest line-clamp-2 mb-2">
                          <span className="mr-1">{related.icon}</span>
                          {related.title}
                        </div>
                        <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                          <span>Read</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </article>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Guide Not Found</h2>
            <button
              onClick={() => onNavigate('/learn')}
              className="px-6 py-3 rounded-full bg-slate-900 text-white font-mono text-sm font-bold"
            >
              Return to Wellness Library
            </button>
          </div>
        )}

        {/* Standard Medical & Educational Disclaimer + 988 Lifeline Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-[28px] bg-rose-50/90 border-4 border-rose-300 shadow-cartoon text-slate-900">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-rose-200/80 text-rose-800 flex-shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-rose-900">
                Medical &amp; Educational Disclaimer
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                This guide is for educational and wellness purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified physician or licensed therapist with any questions regarding mental health conditions.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-xs font-bold text-rose-800">
                  Immediate 24/7 Crisis Support:
                </span>
                <a
                  href="tel:988"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-600 text-white text-xs font-mono font-bold hover:bg-rose-700 transition-colors shadow-sm w-fit"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call or Text 988 (US &amp; Canada)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
