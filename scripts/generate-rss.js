const fs = require('fs');
const path = require('path');
const { Feed } = require('feed');
const matter = require('gray-matter');
const glob = require('glob');

const config = {
  lang: "zh-CN",
  site: "https://zihua.li",
  name: "子骅的个人站",
  description: "偶尔在这里写一些互联网技术、管理等相关的文章。",
  email: "blog@zihua.li",
  twitter: "luinlee",
  github: "luin",
};

function getSlugFromFilename(filename) {
  const basename = path.basename(filename, '.md');
  const matched = basename.split('-');
  return `${matched[0]}/${matched[1]}/${matched.slice(3).join('-')}`;
}

function parseDescription(content) {
  const text = content
    .split('\n')
    .filter(Boolean)[0]
    .replace(/<[^>]*>?/gm, '')
    .replace(/[*]/gm, '')
    .trim();
  const terminators = ['。', '！', '？', '. '];
  for (const terminator of terminators) {
    const index = text.indexOf(terminator);
    if (index > -1) {
      return text.slice(0, index + terminator.length);
    }
  }
  return text;
}

async function generateRssFeed() {
  const postsDirectory = path.join(process.cwd(), 'src/posts');
  const files = glob.sync('**/*.md', { cwd: postsDirectory });
  
  const posts = files
    .map((file) => {
      const fullPath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const filename = path.basename(file);
      const dateMatch = filename.match(/^(\d{4})-(\d{2})-(\d{2})/);
      
      if (!dateMatch) return null;
      
      const slug = getSlugFromFilename(filename);
      const publishDate = `${dateMatch[1]}/${dateMatch[2]}/${dateMatch[3]}`;
      
      return {
        title: data.title,
        description: data.description || parseDescription(content),
        slug,
        path: `/${slug}`,
        permalink: `${config.site}/${slug}`,
        publishDate,
      };
    })
    .filter(Boolean)
    .sort((a, b) => 
      new Date(b.publishDate).valueOf() - new Date(a.publishDate).valueOf()
    );

  const feed = new Feed({
    title: config.name,
    description: "Web developer and designer, technical book author. I build tools that help people do things better.",
    id: config.site,
    link: config.site,
    language: config.lang,
    favicon: `${config.site}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} Zihua Li`,
    author: {
      name: 'Zihua Li',
      email: config.email,
      link: config.site,
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: post.permalink,
      link: post.permalink,
      description: post.description,
      date: new Date(post.publishDate),
    });
  });

  const rss = feed.rss2();
  
  // Ensure public directory exists
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Write the RSS feed to public/feed.xml
  fs.writeFileSync(path.join(publicDir, 'feed.xml'), rss);
  console.log('RSS feed generated successfully at public/feed.xml');
}

generateRssFeed().catch(console.error);
