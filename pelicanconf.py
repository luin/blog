#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Zihua Li'
SITENAME = u'Zihua Li'
SITESUBTITLE = u'设计师、全栈工程师（Web, iOS）<br>90 后，法号 Luin'
SITEURL = 'http://zihua.li'

LOCALE = 'en_US'
TIMEZONE = 'Europe/Paris'

# Feed generation is usually not desired when developing
FEED_DOMAIN = SITEURL
FEED_ALL_RSS = 'feed'
FEED_MAX_ITEMS = 6
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None

# Blogroll
LINKS =  (('Pelican', 'http://getpelican.com/'),
          ('Python.org', 'http://python.org/'),
          ('Jinja2', 'http://jinja.pocoo.org/'),
          ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = 5
DEFAULT_DATE_FORMAT = '%d %b %Y'

FILENAME_METADATA = '(?P<date>\d{4}-\d{2}-\d{2})_(?P<slug>.*)'

# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = True

ARTICLE_URL = '{date:%Y}/{date:%m}/{slug}/'
ARTICLE_SAVE_AS = '{date:%Y}/{date:%m}/{slug}/index.html'

SUMMARY_END_MARKER = '<!-- more -->'
SUMMARY_MAX_LENGTH = None

ARTICLE_EXCLUDES = ('pages', 'novel')

DISQUS_SITENAME = 'zihuali'

PAGINATION_PATTERNS = (
    (1, '{base_name}/', '{base_name}/index.html'),
    (2, '{base_name}/page/{number}/', '{base_name}/page/{number}/index.html'),
)

THEME = "themes"

PAGE_URL = 'pages/{category}/{slug}/'
PAGE_SAVE_AS = PAGE_URL + 'index.html'
TAG_URL = 'tag/{slug}/'
TAG_SAVE_AS = TAG_URL + 'index.html'
TAGS_URL = 'tags/'
TAGS_SAVE_AS = TAGS_URL + 'index.html'
CATEGORY_URL = 'category/{slug}/'
CATEGORY_SAVE_AS = CATEGORY_URL + 'index.html'

PLUGIN_PATH = 'plugins'
PLUGINS = ['summary']

STATIC_PATHS = ['images', 'extra/CNAME']
