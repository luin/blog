import BlogPostPreview from '@/components/BlogPostPreview'
import { getPosts } from '@/lib/posts'

export default async function HomePage() {
  const allPosts = await getPosts()
  
  return (
    <main>
      {allPosts.map((post) => (
        <BlogPostPreview key={post.slug} post={post} />
      ))}
    </main>
  )
}
