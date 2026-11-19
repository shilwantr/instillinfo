import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, BookOpen, Clock, HeartHandshake } from 'lucide-react';
import { WELLNESS_ARTICLES, ArticleCategory, WellnessArticle } from '../data/wellnessArticles';
import { WELLNESS_FACTS } from '../data/wellnessFacts';
import { soundEngine } from '../utils/audio';

interface WellnessLibrarySectionProps {
  onNavigate?: (path: string) => void;
}

export const WellnessLibrarySection: React.FC<WellnessLibrarySectionProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

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

  const nextFact = () => {
    soundEngine.playScrubTick();
    setCurrentFactIndex((prev) => (prev + 1) % WELLNESS_FACTS.length);
  };

  const prevFact = () => {
    soundEngine.playScrubTick();
    setCurrentFactIndex((prev) => (prev - 1 + WELLNESS_FACTS.length) % WELLNESS_FACTS.length);
  };

  const handleArticleClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    soundEngine.playScrubTick();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState(null, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const currentFact = WELLNESS_FACTS[currentFactIndex];

  return (
    <section id="wellness-library" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Eyebrow & Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pop-lime text-pop-forest text-xs font-mono font-bold uppercase mb-4 border-2 border-slate-900 shadow-cartoon-sm">
          <span>📚 Mindful Library • Clinical &amp; Wellness Guides</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-sans font-extrabold text-slate-900 tracking-tight mb-4">
          Understand Your Nervous System
        </h2>
        <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
          Evidence-informed guides on anxiety, sleep, burnout, attention recovery, and somatic calm—paired directly with instilll&apos;s daily tools.
        </p>
      </div>

      {/* Part 2: Mindful Science • Fun Facts Interactive Card */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="relative bg-white/90 backdrop-blur-xl rounded-[32px] p-6 sm:p-8 border-4 border-slate-900 shadow-cartoon overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-4 border-b-2 border-slate-100">
            <div className="flex items-center gap-3">
              <span className="text-3xl select-none">{currentFact.icon}</span>
              <div>
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-pop-forest bg-pop-lime/40 px-2.5 py-0.5 rounded-full inline-block border border-pop-forest/20">
                  Did You Know? • Fact {currentFactIndex + 1} of {WELLNESS_FACTS.length}
                </div>
                <h3 className="text-lg sm:text-xl font-sans font-extrabold text-slate-900 mt-0.5">
                  {currentFact.title}
                </h3>
              </div>
            </div>

            {/* Prev / Next Controls */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={prevFact}
                aria-label="Previous mindful fun fact"
                data-cursor="pointer"
                className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors border border-slate-300 shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextFact}
                aria-label="Next mindful fun fact"
                data-cursor="pointer"
                className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors border border-slate-300 shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentFactIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal"
            >
              {currentFact.fact}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2.5 mb-12">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                soundEngine.playScrubTick();
                setSelectedCategory(cat);
              }}
              data-cursor="pointer"
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono font-bold transition-all border-2 border-slate-900 ${
                isActive
                  ? 'bg-slate-950 text-white shadow-cartoon transform -translate-y-0.5'
                  : 'bg-white text-slate-700 hover:bg-slate-100 shadow-cartoon-sm'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Article Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {filteredArticles.map((article: WellnessArticle) => (
          <article
            key={article.slug}
            className="group relative flex flex-col justify-between bg-white rounded-[28px] p-6 border-4 border-slate-900 shadow-cartoon hover:shadow-cartoon-lg transition-all transform hover:-translate-y-1"
          >
            <div>
              {/* Header tags: Category & Read Time */}
              <div className="flex items-center justify-between gap-2 mb-3 text-[11px] font-mono font-semibold text-slate-600">
                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>{article.readTime}</span>
                </span>
              </div>

              {/* Title & Icon */}
              <h3 className="text-lg font-sans font-extrabold text-slate-900 leading-snug mb-2 group-hover:text-pop-forest transition-colors">
                <a
                  href={article.path}
                  onClick={(e) => handleArticleClick(e, article.path)}
                  className="focus:outline-none"
                >
                  <span className="mr-1.5 select-none">{article.icon}</span>
                  {article.title}
                </a>
              </h3>

              {/* 1-sentence summary */}
              <p className="text-xs text-slate-600 leading-relaxed mb-4 font-normal">
                {article.summary}
              </p>
            </div>

            {/* Bottom: Feature badge & Read link */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="text-[11px] font-mono font-bold text-pop-forest bg-pop-lime/30 px-2.5 py-1 rounded-xl border border-pop-forest/20 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{article.instilllFeature.name}</span>
              </div>

              <a
                href={article.path}
                onClick={(e) => handleArticleClick(e, article.path)}
                data-cursor="pointer"
                className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-full bg-slate-900 text-white hover:bg-pop-forest text-xs font-mono font-bold transition-all shadow-sm group-hover:bg-pop-forest"
              >
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* View Full Library Hub Button */}
      <div className="text-center">
        <a
          href="/learn"
          onClick={(e) => handleArticleClick(e, '/learn')}
          data-cursor="pointer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-pop-lime text-pop-forest hover:bg-pop-forest hover:text-white font-mono font-bold text-sm sm:text-base border-4 border-slate-900 shadow-cartoon hover:shadow-cartoon-lg transition-all transform hover:-translate-y-1"
        >
          <BookOpen className="w-5 h-5" />
          <span>View Full Wellness Library ({WELLNESS_ARTICLES.length} Guides)</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};
