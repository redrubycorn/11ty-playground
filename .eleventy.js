const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const readingTime = require('eleventy-plugin-reading-time');
const yaml = require("js-yaml");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const { DateTime } = require("luxon");

// add markdown-it and toc plugin for table of content
const markdownit = require("markdown-it");
const anchor = require("markdown-it-anchor");
const tocPlugin = require("eleventy-plugin-toc")

module.exports = config => {
    config.amendLibrary("md", (mdLib) => mdLib.enable("code"));

    // add markdown-it to generate toc
    config.setLibrary("md", markdownit().use(anchor));
    config.addPlugin(tocPlugin, { tags: ["h2"]});

    // added yaml support
    config.addDataExtension("yaml, yml", contents => yaml.load(contents));

    // Add plugins
    config.addPlugin(syntaxHighlight);
    config.addPlugin(readingTime);
    config.addPlugin(EleventyHtmlBasePlugin);

    // passthrough copy
    config.addPassthroughCopy("src/posts/**/*.jpg");
    config.addPassthroughCopy("src/posts/**/*.png");
    config.addPassthroughCopy("src/assets");
    config.addPassthroughCopy("src/fonts");


    // date filter
    config.addFilter("luxonDate", (dateObj, format = "LLL d, yyyy") => {
        return DateTime.fromJSDate(new Date(dateObj), { zone: 'utc' }).toFormat(format);
    });

    // blog post collection
    // Returns work items, sorted by display order
    config.addCollection('blog', collection => {
        return [...collection.getFilteredByGlob('./src/posts/**/*.md')].reverse();
    });

    // tag collection; collection to list all tags used in posts
    config.addCollection('tagList', collection => {
        const tagsSet = {};
        collection.getAll().forEach(item => {
            if (!item.data.tags) return;
            item.data.tags.filter(
                tag => !['posts', 'all'].includes(tag)
            ).forEach(
                tag => {
                    if (!tagsSet[tag]) { tagsSet[tag] = []; }
                    tagsSet[tag].push(item)
                }
            );
        });
        return tagsSet;
    });

    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        pathPrefix: "/11ty-playground/",
        dir: {
            input: 'src',
            output: '_site'
        }
    };
  };
  