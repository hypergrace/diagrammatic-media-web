const { DateTime } = require("luxon");
const pluginSEO = require("eleventy-plugin-seo");
const clean = require("eleventy-plugin-clean");
const { EleventyRenderPlugin } = require("@11ty/eleventy");
/**
 * This is the JavaScript code that determines the config for your Eleventy site
 *
 * You can add lost of customization here to define how the site builds your content
 * Try extending it to suit your needs!
 */

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(clean);
  eleventyConfig.addPassthroughCopy("*.pdf");
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
