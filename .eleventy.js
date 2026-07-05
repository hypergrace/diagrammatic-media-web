const { DateTime } = require("luxon");
const pluginSEO = require("eleventy-plugin-seo");
// Disabled eleventy-plugin-clean to avoid LMDB key-size errors
// const clean = require("eleventy-plugin-clean");
const { EleventyRenderPlugin } = require("@11ty/eleventy");
/**
 * This is the JavaScript code that determines the config for your Eleventy site
 *
 * You can add lost of customization here to define how the site builds your content
 * Try extending it to suit your needs!
 */

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  // eleventyConfig.addPlugin(clean);
  eleventyConfig.addPassthroughCopy("*.pdf");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.setTemplateFormats([
    // Templates:
    "html",
    "njk",
    "md",
    // Static Assets:
    "css",
    "jpeg",
    "jpg",
    "png",
    "svg",
    "woff",
    "woff2",
  ]);

  /* From: https://github.com/artstorm/eleventy-plugin-seo
  
  Adds SEO settings to the top of all pages
  The "glitch-default" bit allows someone to set the url in seo.json while
  still letting it have a proper glitch.me address via PROJECT_DOMAIN
  */
  const seo = require("./src/seo.json");
  if (seo.url === "glitch-default") {
    seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
  }
  eleventyConfig.addPlugin(pluginSEO, seo);

  // Add shortcode for responsive YouTube embeds
  eleventyConfig.addShortcode("youtube", function (videoId) {
    return `<div class="youtube-embed">
      <iframe 
        src="https://www.youtube-nocookie.com/embed/${videoId}?modestbranding=1&rel=0&showinfo=0" 
        title="YouTube video" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    </div>`;
  });

  // Add shortcode for SoundCloud embeds
  eleventyConfig.addShortcode("soundcloud", function (url, color = "ff5500") {
    const encodedUrl = encodeURIComponent(url);
    return `<div class="soundcloud-embed">
      <iframe 
        width="100%" 
        height="166" 
        scrolling="no" 
        frameborder="no" 
        allow="autoplay" 
        src="https://w.soundcloud.com/player/?url=${encodedUrl}&color=%23${color}&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true">
      </iframe>
    </div>`;
  });

  // Add shortcode for responsive Vimeo embeds
  // Usage: {% vimeo "216553103", "99d332195f", "16:9", "Lanterns performance" %}
  eleventyConfig.addShortcode(
    "vimeo",
    function (videoId, hash = "", aspect = "16:9", title = "Vimeo video") {
      const hashParam = hash ? `?h=${hash}` : "";
      const aspectRatio =
        typeof aspect === "string" && aspect.includes(":")
          ? aspect.replace(":", " / ")
          : "16 / 9";
      const safeTitle = String(title).replace(/"/g, "&quot;");

      return `<div class="vimeo-embed" style="--embed-aspect-ratio: ${aspectRatio};">
      <iframe 
        title="${safeTitle}" 
        src="https://player.vimeo.com/video/${videoId}${hashParam}" 
        frameborder="0" 
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
        allowfullscreen>
      </iframe>
    </div>`;
    },
  );

  // Add shortcode for responsive images
  eleventyConfig.addShortcode("image", function (src, alt = "") {
    return `<div class="responsive-image">
      <img src="${src}" alt="${alt}" loading="lazy">
    </div>`;
  });

  // Add filter to convert hashtags to links
  eleventyConfig.addFilter("linkifyHashtags", function (content) {
    if (!content) return content;
    // Match hashtags: # followed by alphanumeric, hyphens, or underscores
    return content.replace(/#([\w-]+)/g, function (match, tag) {
      const slug = tag.toLowerCase().replace(/_/g, "-");
      return `<a href="/projects/${slug}/">#${tag}</a>`;
    });
  });

  // Sort projects by year descending (handles ranges like "2025-26", "2013-2015")
  eleventyConfig.addFilter("sortByYearDesc", function (projects) {
    const getEndYear = (y) => {
      if (!y) return 0;
      const parts = String(y).split(/[-\/]/);
      const last = parts[parts.length - 1].trim();
      const n = parseInt(last);
      if (last.length <= 2) return 2000 + n;
      return n;
    };
    return [...projects].sort(
      (a, b) => getEndYear(b.data.year) - getEndYear(a.data.year),
    );
  });

  // Add collection to generate hashtag list
  eleventyConfig.addCollection("hashtagList", function (collectionApi) {
    const projects = collectionApi.getFilteredByTag("project");
    const allHashtags = new Set();

    projects.forEach((project) => {
      if (project.data.projecttags) {
        const tags = project.data.projecttags.split(",");
        tags.forEach((tag) => {
          const cleanTag = tag.trim();
          if (cleanTag) {
            allHashtags.add(cleanTag);
          }
        });
      }
    });

    return Array.from(allHashtags).sort();
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "docs",
    },
  };
};
