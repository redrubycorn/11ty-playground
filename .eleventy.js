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

    eleventyConfig.addFilter("filterTagList", filterTagList);

    
    // ---------------------------------
    // PLUGINS
    // ---------------------------------
    // reading time plugin
    eleventyConfig.addPlugin(readingTime);

    // add html base element
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);


    // ---------------------------------
    // FUNCTIONS
    // ---------------------------------

    // filter out certain tags, e.g. utility tags
    function filterTagList(tags) {
        return (tags || []).filter(
            (tag) => ["utility-tag", "unwanted-tag"].indexOf(tag) === -1
        );
    };

    // return a list of tags in a given collection
    function getTagList(collection) {
        let tagSet = new Set();
        collection.forEach((item) => {
            (item.data.tags || []).forEach((tag) => tagSet.add(tag));
        });
        return filterTagList([...tagSet]);
    };

    // return an object with arrays of posts by tag from the provided collections
    function createCollectionsByTag(collection) {
        // set the result as an object
        let resultArrays = {};
        // loop through each item in the provided collection
        collection.forEach((item) => {
            // loop through the tags of each item
            item.data.tags.forEach((tag) => {
                // if the tag has not already been added to the object, add it as an empty array
                if (!resultArrays[tag]) { resultArrays[tag] = []; }
                // add the item to the tag's array
                resultArrays[tag].push(item);
            });
        });
        // return the object containing tags and their arrays of posts
        // { tag-name: [post-object, post-object], tag-name: [post-object, post-object] }
        return resultArrays;
    };

    // Return a list of years in a given collection
    function getYearList(collection) {
        let years = new Set();
        collection.forEach((item) => {
            years.add(
                DateTime.fromJSDate(item.data.date, { zone: "utc" }).toFormat("yyyy")
            );
        });
        return [...years];
    }

    // Return an object with arrays of posts by year from the provided collection
    function createCollectionsByYear(collection) {
        // set the result as an object
        let resultArrays = {};
        // loop through each item in the provided collection
        collection.forEach((item) => {
            year = DateTime.fromJSDate(item.data.date, { zone: "utc" }).toFormat(
                "yyyy"
            );
            if (!resultArrays[year]) {
                resultArrays[year] = [];
            }
            resultArrays[year].push(item);
        });
        // Return the object containing tags and their arrays of posts
        // { year: [post-object, post-object], year: [post-object, post-object] }
        return resultArrays;
    }


    // ---------------------------------
    // COLLECTIONS
    // ---------------------------------

    // PROJECTS
    // Get a list of all posts with collections.posts
    eleventyConfig.addCollection("projects", function (collectionAPI) {
        return collectionAPI.getFilteredByGlob("./src/content/projects/**/*.md");
    });
    
    // Get a list of all tags used by posts with collections.postTags
    eleventyConfig.addCollection("projectTags", function (collectionAPI) {
        let collection = collectionAPI.getFilteredByGlob("./src/content/projects/**/*.md");
        return getTagList(collection);
    });

    // Get a list of all posts with a specific tag with collections.postsTagged["tag"]
    eleventyConfig.addCollection("projectsTagged", function (collectionAPI) {
        let collection = collectionAPI.getFilteredByGlob("./src/content/projects//**/*.md");
        return createCollectionsByTag(collection);
    });

    
    // POSTS
    // Get a list of all posts with collections.posts
    eleventyConfig.addCollection("posts", function (collectionAPI) {
        return collectionAPI.getFilteredByGlob("./src/content/posts/**/*.md");
    });
    
    // Get a list of all tags used by posts with collections.postTags
    eleventyConfig.addCollection("postTags", function (collectionAPI) {
        let collection = collectionAPI.getFilteredByGlob("./src/content/posts/**/*.md");
        return getTagList(collection);
    });

    // Get a list of all posts with a specific tag with collections.postsTagged["tag"]
    eleventyConfig.addCollection("postsTagged", function (collectionAPI) {
        let collection = collectionAPI.getFilteredByGlob("./src/content/posts/**/*.md");
        return createCollectionsByTag(collection);
    });

    // POSTS YEARS
    // Create a collection for post years (required for the generation of archive pages)
    eleventyConfig.addCollection("postYears", function (collectionAPI) {
        let collection = collectionAPI.getFilteredByGlob("./src/content/posts/**/*.md");
        return getYearList(collection);
    });
    // Create a collection for posts by year
    eleventyConfig.addCollection("postsByYear", function (collectionAPI) {
        let collection = collectionAPI.getFilteredByGlob("./src/content/posts/**/*.md");
        return createCollectionsByYear(collection);
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