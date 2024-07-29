const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const readingTime = require('eleventy-plugin-reading-time');
const yaml = require("js-yaml");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = config => {
    config.amendLibrary("md", (mdLib) => mdLib.enable("code"));

    // added yaml support
    config.addDataExtension("yaml, yml", contents => yaml.load(contents));

    // Add plugins
    config.addPlugin(syntaxHighlight);
    config.addPlugin(readingTime);
    config.addPlugin(EleventyHtmlBasePlugin);

    // passthrough copy
    config.addPassthroughCopy("src/posts/**/*.jpg");
    config.addPassthroughCopy("src/posts/**/*.png");

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
        pathPrefix: "/eleventy-playground/",
        dir: {
            input: 'src',
            output: '_site'
        }
    };
  };
  