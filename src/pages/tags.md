---
layout: "layouts/feed.html"
pagination:
  data: collections.tagList
  size: 1
  alias: tag
permalink: /tags/{{ tag }}/
eleventyComputed:
  title: "Posts tagged [{{ tag }}]"
---

