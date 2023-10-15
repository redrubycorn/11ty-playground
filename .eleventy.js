const yaml = require("js-yaml");
const readingTime = require("eleventy-plugin-reading-time");
const { DateTime } = require("luxon");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = eleventyConfig => {

    // added yaml support
    eleventyConfig.addDataExtension("yaml, yml", contents => yaml.load(contents));

    
    // ---------------------------------
    // FILTERS
    // ---------------------------------
    eleventyConfig.addFilter("readablePostDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj, {
            zone: "Europe/Vienna",
        }).setLocale('en').toLocaleString(DateTime.DATE_FULL);
    });

    
    // ---------------------------------
    // PLUGINS
    // ---------------------------------
    // reading time plugin
    eleventyConfig.addPlugin(readingTime);

    // add html base element
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);


    // ---------------------------------
    // COLLECTIONS
    // ---------------------------------

    // POSTS
    eleventyConfig.addCollection('blog', collection => {
        return [...collection.getFilteredByGlob('./src/content/posts/**/*.md')].reverse();
    });

    // TAGS
    eleventyConfig.addCollection('tagList', collection => {
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


    // ---------------------------------
    // PASSTHROUGH
    // ---------------------------------
    // webfonts folder for fontawesome
    eleventyConfig.addPassthroughCopy({ "src/assets/webfonts": "webfonts" })

    // js folder
    eleventyConfig.addPassthroughCopy({ "src/assets/js": "js" })

    // images
    eleventyConfig.addPassthroughCopy({ "src/content/images": "images" })


    // ---------------------------------
    // RETURN
    // ---------------------------------
    return {
        // set template engine so that md, data and html files are processed by nunjucks
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',

        // add a pathPrefix
        pathPrefix: "/11ty-playground/",

        // specify input and output dirs
        dir: {
            input: 'src',
            output: '_site'
        }
    };
};