import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { WELLNESS_ARTICLES } from '../src/data/wellnessArticles.ts';
import { WELLNESS_FACTS } from '../src/data/wellnessFacts.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const learnDir = path.join(publicDir, 'learn');

const BASE_URL = 'https://www.instill.info';

// Common CSS Styles for Clean, Luxury Porcelain-and-Glass Aesthetic
const commonStyles = `
  :root {
    --bg-cream: #FAFBF8;
    --text-slate: #0F172A;
    --pop-lime: #D2F56C;
    --pop-forest: #0A4839;
    --pop-yellow: #FED668;
    --border-slate: rgba(15, 23, 42, 0.12);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background-color: var(--bg-cream);
    color: var(--text-slate);
    line-height: 1.6;
    padding: 24px 16px 64px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    -webkit-font-smoothing: antialiased;
  }
  .container {
    max-width: 860px;
    width: 100%;
    margin: 0 auto;
  }
  .brand-header {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    color: inherit;
    margin-bottom: 24px;
  }
  .brand-logo {
    width: 44px;
    height: 44px;
    border-radius: 9999px;
    border: 2px solid var(--pop-forest);
    overflow: hidden;
    background: #EDE9FE;
  }
  .brand-logo img { width: 100%; height: 100%; object-fit: cover; }
  .brand-name {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 22px;
    font-weight: 900;
    letter-spacing: -0.5px;
    display: inline-flex;
    align-items: baseline;
    color: var(--text-slate);
  }
  .brand-name .l1 { font-weight: 900; }
  .brand-name .l2 { font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-weight: 700; color: var(--pop-forest); transform: skewX(-6deg); }
  .brand-name .l3 { font-family: 'JetBrains Mono', monospace; font-weight: 900; color: #f59e0b; }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 9999px;
    background: var(--pop-lime);
    color: var(--pop-forest);
    font-size: 11px;
    font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 16px;
    border: 1px solid rgba(10, 72, 57, 0.2);
  }
  .breadcrumb-nav {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-family: 'JetBrains Mono', monospace;
    color: #64748B;
    margin-bottom: 24px;
  }
  .breadcrumb-nav a {
    color: #334155;
    text-decoration: none;
    font-weight: 600;
  }
  .breadcrumb-nav a:hover {
    color: var(--pop-forest);
  }
  .card-box {
    background: #FFFFFF;
    border-radius: 36px;
    border: 4px solid var(--text-slate);
    padding: 40px 32px;
    box-shadow: 6px 6px 0px rgba(15, 23, 42, 0.9);
    margin-bottom: 32px;
  }
  @media (max-width: 640px) {
    .card-box { padding: 24px 20px; border-radius: 28px; }
  }
  h1 { font-size: clamp(28px, 4.5vw, 44px); font-weight: 800; line-height: 1.15; margin-bottom: 16px; }
  h2 { font-size: clamp(20px, 3vw, 26px); font-weight: 800; line-height: 1.25; margin-top: 32px; margin-bottom: 12px; }
  h3 { font-size: 17px; font-weight: 700; margin-bottom: 6px; }
  .lead-para {
    font-size: clamp(16px, 2.2vw, 20px);
    color: #334155;
    line-height: 1.6;
    font-weight: 500;
    margin-bottom: 28px;
    padding-bottom: 24px;
    border-bottom: 2px solid #F1F5F9;
  }
  p { font-size: 15px; color: #475569; margin-bottom: 16px; line-height: 1.7; }
  .subpoint-card {
    background: #F8FAFC;
    border: 2px solid #E2E8F0;
    border-radius: 20px;
    padding: 18px 20px;
    margin-bottom: 12px;
  }
  .subpoint-card h3 { color: var(--text-slate); display: flex; items-center: center; gap: 8px; }
  .subpoint-card p { font-size: 14px; margin-bottom: 0; }
  .fact-callout {
    background: #FEF3C7;
    border: 3px solid #F59E0B;
    border-radius: 24px;
    padding: 24px;
    margin: 32px 0;
    box-shadow: 4px 4px 0px rgba(245, 158, 11, 0.4);
  }
  .fact-callout .fact-title {
    font-size: 11px;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 800;
    text-transform: uppercase;
    color: #92400E;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .fact-callout .fact-body {
    font-size: 15px;
    font-weight: 600;
    color: #78350F;
    line-height: 1.6;
  }
  .cta-tool-box {
    background: var(--pop-forest);
    color: #FFFFFF;
    border-radius: 28px;
    border: 4px solid var(--text-slate);
    padding: 32px;
    margin: 40px 0;
    box-shadow: 5px 5px 0px rgba(15, 23, 42, 0.9);
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  @media (min-width: 640px) {
    .cta-tool-box { flex-direction: row; align-items: center; justify-content: space-between; }
  }
  .cta-tool-box h3 { font-size: 22px; color: #FFFFFF; margin-bottom: 6px; }
  .cta-tool-box p { font-size: 14px; color: #E2E8F0; margin-bottom: 0; }
  .btn-launch {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    background: var(--pop-lime);
    color: var(--pop-forest);
    font-weight: 800;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    border-radius: 9999px;
    text-decoration: none;
    border: 2px solid var(--pop-forest);
    white-space: nowrap;
    box-shadow: 3px 3px 0px rgba(10, 72, 57, 0.3);
    transition: transform 0.15s ease;
  }
  .btn-launch:hover { transform: translate(-2px, -2px); }
  .related-section {
    margin-top: 40px;
    padding-top: 32px;
    border-top: 2px solid #F1F5F9;
  }
  .related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    margin-top: 16px;
  }
  .related-card {
    background: #F8FAFC;
    border: 2px solid #E2E8F0;
    border-radius: 18px;
    padding: 16px;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.15s ease;
  }
  .related-card:hover {
    border-color: var(--pop-forest);
    transform: translateY(-2px);
  }
  .related-card .title { font-size: 13px; font-weight: 700; margin-bottom: 8px; }
  .related-card .link-text { font-size: 11px; font-family: 'JetBrains Mono', monospace; color: var(--pop-forest); font-weight: 700; }
  .disclaimer-banner {
    background: #FFF1F2;
    border: 4px solid #FDA4AF;
    border-radius: 28px;
    padding: 24px;
    box-shadow: 4px 4px 0px rgba(253, 164, 175, 0.6);
    margin-top: 32px;
  }
  .disclaimer-banner .title {
    font-size: 11px;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 800;
    color: #9F1239;
    text-transform: uppercase;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .disclaimer-banner p { font-size: 13px; color: #4C0519; margin-bottom: 12px; }
  .btn-lifeline {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    border-radius: 9999px;
    background: #E11D48;
    color: #FFFFFF;
    font-size: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    text-decoration: none;
  }
  .footer {
    text-align: center;
    margin-top: 48px;
    font-size: 12px;
    color: #94A3B8;
    font-family: 'JetBrains Mono', monospace;
  }
  .hub-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin: 32px 0;
  }
  .hub-article-card {
    background: #FFFFFF;
    border-radius: 28px;
    border: 4px solid var(--text-slate);
    padding: 24px;
    box-shadow: 5px 5px 0px rgba(15, 23, 42, 0.9);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-decoration: none;
    color: inherit;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .hub-article-card:hover {
    transform: translateY(-3px);
    box-shadow: 7px 7px 0px rgba(15, 23, 42, 0.9);
  }
  .hub-article-card .tag-row {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    font-family: 'JetBrains Mono', monospace;
    color: #64748B;
    margin-bottom: 12px;
  }
  .hub-article-card h2 {
    font-size: 18px;
    font-weight: 800;
    line-height: 1.3;
    margin: 0 0 8px 0;
    color: var(--text-slate);
  }
  .hub-article-card p {
    font-size: 13px;
    color: #64748B;
    margin-bottom: 16px;
    line-height: 1.5;
  }
  .hub-article-card .bottom-row {
    padding-top: 12px;
    border-top: 1px solid #F1F5F9;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .hub-article-card .feature-tag {
    font-size: 11px;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    color: var(--pop-forest);
  }
  .hub-article-card .read-btn {
    padding: 6px 14px;
    background: var(--text-slate);
    color: #FFFFFF;
    border-radius: 9999px;
    font-size: 11px;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
  }
`;

// Helper: Generate Article Page HTML
function generateArticleHtml(article) {
  const canonicalUrl = `${BASE_URL}/learn/${article.slug}`;

  const relatedArticles = article.relatedArticleSlugs
    .map((slug) => WELLNESS_ARTICLES.find((a) => a.slug === slug))
    .filter(Boolean);

  const sectionsHtml = article.sections
    .map((section) => {
      const paras = section.paragraphs.map((p) => `<p>${p}</p>`).join('');
      const subpoints = section.subpoints
        ? `<div class="subpoints-grid">${section.subpoints
            .map(
              (pt) => `
          <div class="subpoint-card">
            <h3><span>•</span> ${pt.title}</h3>
            <p>${pt.desc}</p>
          </div>
        `
            )
            .join('')}</div>`
        : '';
      return `
        <section class="article-section">
          <h2>${section.heading}</h2>
          ${paras}
          ${subpoints}
        </section>
      `;
    })
    .join('');

  const relatedHtml = relatedArticles.length
    ? `
      <div class="related-section">
        <h3>Related Wellness Guides</h3>
        <div class="related-grid">
          ${relatedArticles
            .map(
              (rel) => `
            <a href="/learn/${rel.slug}" class="related-card">
              <div class="title">${rel.icon} ${rel.title}</div>
              <div class="link-text">Read Guide &rarr;</div>
            </a>
          `
            )
            .join('')}
        </div>
      </div>
    `
    : '';

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    
    <!-- Primary SEO Meta Tags -->
    <title>${article.metaTitle}</title>
    <meta name="title" content="${article.metaTitle}" />
    <meta name="description" content="${article.metaDesc}" />
    <meta name="keywords" content="${article.keywords}" />
    <meta name="author" content="instilll Systems" />
    <meta name="publisher" content="instilll" />
    <meta name="category" content="Health &amp; Fitness, Mental Wellness" />

    <!-- Crawlers & Canonical -->
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="en" href="${canonicalUrl}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:site_name" content="instilll" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${article.metaTitle}" />
    <meta property="og:description" content="${article.metaDesc}" />
    <meta property="og:image" content="${BASE_URL}/assets/logo.png" />
    <meta property="og:image:width" content="1024" />
    <meta property="og:image:height" content="1024" />
    <meta property="og:locale" content="en_US" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@instilllapp" />
    <meta name="twitter:title" content="${article.metaTitle}" />
    <meta name="twitter:description" content="${article.metaDesc}" />
    <meta name="twitter:image" content="${BASE_URL}/assets/logo.png" />

    <!-- Favicon & Theming -->
    <meta name="theme-color" content="#FAFAF7" />
    <link rel="icon" type="image/png" href="/assets/logo.png" />
    <link rel="apple-touch-icon" href="/assets/logo.png" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@1,700&family=JetBrains+Mono:wght@500;700;800&display=swap" rel="stylesheet" />

    <!-- Schema.org JSON-LD Structured Data (Article + BreadcrumbList) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["Article", "MedicalWebPage"],
          "@id": "${canonicalUrl}#article",
          "url": "${canonicalUrl}",
          "headline": "${article.title}",
          "description": "${article.metaDesc}",
          "datePublished": "2026-11-20T00:00:00Z",
          "dateModified": "${article.lastUpdated}T00:00:00Z",
          "inLanguage": "en-US",
          "author": {
            "@type": "Organization",
            "name": "instilll",
            "url": "${BASE_URL}/"
          },
          "publisher": {
            "@type": "Organization",
            "name": "instilll",
            "url": "${BASE_URL}/",
            "logo": {
              "@type": "ImageObject",
              "url": "${BASE_URL}/assets/logo.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "${canonicalUrl}"
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": "${canonicalUrl}#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "${BASE_URL}/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Wellness Library",
              "item": "${BASE_URL}/learn"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "${article.title}",
              "item": "${canonicalUrl}"
            }
          ]
        }
      ]
    }
    </script>

    <style>${commonStyles}</style>
  </head>
  <body>
    <div class="container">
      <!-- Brand Header -->
      <a href="/" class="brand-header">
        <div class="brand-logo">
          <img src="/assets/logo.png" alt="instilll Logo" />
        </div>
        <div class="brand-name">
          <span class="l1">instil</span><span class="l2">l</span><span class="l3">l</span>
        </div>
      </a>

      <!-- Breadcrumbs -->
      <nav aria-label="Breadcrumb" class="breadcrumb-nav">
        <a href="/">Home</a>
        <span>/</span>
        <a href="/learn">Wellness Library</a>
        <span>/</span>
        <span>${article.category}</span>
      </nav>

      <!-- Main Article Card -->
      <article class="card-box">
        <div class="badge">${article.category} • ${article.readTime}</div>
        <h1>${article.icon} ${article.title}</h1>
        <p class="lead-para">${article.lead}</p>

        <!-- Fun Fact Callout -->
        <div class="fact-callout">
          <div class="fact-title">💡 Mindful Science • Fun Fact</div>
          <div class="fact-body">${article.funFactCallout}</div>
        </div>

        <!-- Article Body Sections -->
        ${sectionsHtml}

        <!-- Try This in instilll CTA -->
        <div class="cta-tool-box">
          <div>
            <div style="font-size: 11px; font-family: 'JetBrains Mono', monospace; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; color: var(--pop-lime);">
              ✨ Try This in instilll
            </div>
            <h3>${article.instilllFeature.name}</h3>
            <p>${article.instilllFeature.description}</p>
          </div>
          <a href="${article.instilllFeature.href}" class="btn-launch">
            <span>Open Tool</span>
            <span>&rarr;</span>
          </a>
        </div>

        <!-- Related Guides -->
        ${relatedHtml}
      </article>

      <!-- Medical & Educational Disclaimer + 988 Lifeline -->
      <div class="disclaimer-banner">
        <div class="title">🛡️ Medical &amp; Educational Disclaimer</div>
        <p>
          This guide is for educational and wellness purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. If you are experiencing a mental health crisis or thoughts of self-harm, call or text <strong>988</strong> (Suicide &amp; Crisis Lifeline, US &amp; Canada, free and confidential 24/7) or contact your local emergency services immediately.
        </p>
        <a href="tel:988" class="btn-lifeline">📞 Call or Text 988 (24/7 Lifeline)</a>
      </div>

      <div class="footer">
        &copy; 2026 instilll Systems. Mindful Presence &amp; Daily Balance.
      </div>
    </div>
  </body>
</html>`;
}

// Helper: Generate Wellness Library Hub (/learn/index.html)
function generateLearnHubHtml() {
  const canonicalUrl = `${BASE_URL}/learn`;

  const articlesHtml = WELLNESS_ARTICLES.map(
    (article) => `
    <a href="/learn/${article.slug}" class="hub-article-card">
      <div>
        <div class="tag-row">
          <span>${article.category}</span>
          <span>${article.readTime}</span>
        </div>
        <h2>${article.icon} ${article.title}</h2>
        <p>${article.summary}</p>
      </div>
      <div class="bottom-row">
        <span class="feature-tag">✨ ${article.instilllFeature.name.split('(')[0].trim()}</span>
        <span class="read-btn">Read &rarr;</span>
      </div>
    </a>
  `
  ).join('');

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    
    <!-- Primary SEO Meta Tags -->
    <title>Wellness Library &amp; Mental Health Guides | instilll</title>
    <meta name="title" content="Wellness Library &amp; Mental Health Guides | instilll" />
    <meta name="description" content="Explore science-backed guides on anxiety, insomnia, burnout, doomscrolling, trauma recovery, and vagal breathwork designed for daily calm." />
    <meta name="keywords" content="wellness library, mental health guides, vagal breathwork, doomscrolling reset, insomnia sleep hygiene, burnout recovery, somatic EMDR, mindful science" />
    <meta name="author" content="instilll Systems" />
    <meta name="publisher" content="instilll" />

    <!-- Crawlers & Canonical -->
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="en" href="${canonicalUrl}" />

    <!-- Open Graph -->
    <meta property="og:site_name" content="instilll" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="Wellness Library &amp; Mental Health Guides | instilll" />
    <meta property="og:description" content="Explore science-backed guides on anxiety, insomnia, burnout, doomscrolling, trauma recovery, and vagal breathwork designed for daily calm." />
    <meta property="og:image" content="${BASE_URL}/assets/logo.png" />
    <meta property="og:image:width" content="1024" />
    <meta property="og:image:height" content="1024" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@instilllapp" />
    <meta name="twitter:title" content="Wellness Library &amp; Mental Health Guides | instilll" />
    <meta name="twitter:description" content="Explore science-backed guides on anxiety, insomnia, burnout, doomscrolling, trauma recovery, and vagal breathwork." />
    <meta name="twitter:image" content="${BASE_URL}/assets/logo.png" />

    <!-- Favicon & Theming -->
    <meta name="theme-color" content="#FAFAF7" />
    <link rel="icon" type="image/png" href="/assets/logo.png" />
    <link rel="apple-touch-icon" href="/assets/logo.png" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@1,700&family=JetBrains+Mono:wght@500;700;800&display=swap" rel="stylesheet" />

    <!-- Schema.org JSON-LD Structured Data (CollectionPage + BreadcrumbList) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["CollectionPage", "MedicalWebPage"],
          "@id": "${canonicalUrl}#collection",
          "url": "${canonicalUrl}",
          "name": "Wellness Library & Mindful Science Guides",
          "description": "Explore science-backed guides on anxiety, insomnia, burnout, doomscrolling, trauma recovery, and vagal breathwork designed for daily calm.",
          "isPartOf": {
            "@type": "WebSite",
            "@id": "${BASE_URL}/#website",
            "url": "${BASE_URL}/",
            "name": "instilll"
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": "${canonicalUrl}#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "${BASE_URL}/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Wellness Library",
              "item": "${canonicalUrl}"
            }
          ]
        }
      ]
    }
    </script>

    <style>${commonStyles}</style>
  </head>
  <body>
    <div class="container">
      <!-- Brand Header -->
      <a href="/" class="brand-header">
        <div class="brand-logo">
          <img src="/assets/logo.png" alt="instilll Logo" />
        </div>
        <div class="brand-name">
          <span class="l1">instil</span><span class="l2">l</span><span class="l3">l</span>
        </div>
      </a>

      <!-- Breadcrumbs -->
      <nav aria-label="Breadcrumb" class="breadcrumb-nav">
        <a href="/">Home</a>
        <span>/</span>
        <span>Wellness Library</span>
      </nav>

      <div style="text-align: center; margin-bottom: 36px;">
        <div class="badge">📚 Mindful Library • Clinical &amp; Wellness Guides</div>
        <h1>Understand Your Nervous System</h1>
        <p style="max-width: 620px; margin: 0 auto; font-size: 16px; color: #475569;">
          Evidence-informed guides on anxiety, sleep, burnout, attention recovery, and somatic calm—paired directly with instilll's daily tools.
        </p>
      </div>

      <!-- Hub Grid -->
      <div class="hub-grid">
        ${articlesHtml}
      </div>

      <!-- Medical & Educational Disclaimer + 988 Lifeline -->
      <div class="disclaimer-banner">
        <div class="title">🛡️ Medical &amp; Educational Disclaimer</div>
        <p>
          This library is for educational and wellness purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. If you are experiencing a mental health crisis or thoughts of self-harm, call or text <strong>988</strong> (Suicide &amp; Crisis Lifeline, US &amp; Canada, free and confidential 24/7) or contact your local emergency services immediately.
        </p>
        <a href="tel:988" class="btn-lifeline">📞 Call or Text 988 (24/7 Lifeline)</a>
      </div>

      <div class="footer">
        &copy; 2026 instilll Systems. Mindful Presence &amp; Daily Balance.
      </div>
    </div>
  </body>
</html>`;
}

// Main Execution
console.log('Generating Wellness Library Hub and 8 Article Pages...');

// 1. Generate /learn/index.html
if (!fs.existsSync(learnDir)) {
  fs.mkdirSync(learnDir, { recursive: true });
}
fs.writeFileSync(path.join(learnDir, 'index.html'), generateLearnHubHtml(), 'utf-8');
console.log('Generated: learn/index.html');

// 2. Generate each /learn/<slug>/index.html
for (const article of WELLNESS_ARTICLES) {
  const articleDir = path.join(learnDir, article.slug);
  if (!fs.existsSync(articleDir)) {
    fs.mkdirSync(articleDir, { recursive: true });
  }
  fs.writeFileSync(path.join(articleDir, 'index.html'), generateArticleHtml(article), 'utf-8');
  console.log(`Generated: learn/${article.slug}/index.html`);
}

console.log('Successfully generated all 8 wellness articles and library hub!');
