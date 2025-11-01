import Image from 'next/image'
import fs from 'fs/promises'
import path from 'path'
import styles from './Tweet.module.css'

interface TweetData {
  id_str: string
  full_text: string
  user: {
    name: string
    screen_name: string
    profile_image_url_https: string
  }
  entities: {
    urls?: Array<{
      url: string
      display_url: string
    }>
    user_mentions?: Array<{
      screen_name: string
    }>
    hashtags?: Array<{
      text: string
    }>
    media?: Array<{
      url: string
      media_url_https: string
    }>
  }
  in_reply_to_screen_name?: string
}

interface TweetProps {
  id: string
}

export default async function Tweet({ id }: TweetProps) {
  // In production, you might want to fetch tweets from an API
  // For now, we'll read from the fixtures
  const fetchedFile = path.join(process.cwd(), `fixtures/tweets/${id}.json`)
  
  let data: TweetData
  try {
    const content = await fs.readFile(fetchedFile, 'utf-8')
    data = JSON.parse(content)
  } catch (err) {
    // If file doesn't exist, return a placeholder
    return <div>Tweet {id} not found</div>
  }
  
  let fullText = data.full_text
  
  if (data.in_reply_to_screen_name) {
    fullText = fullText.replace(`@${data.in_reply_to_screen_name}`, '')
  }
  
  // Replace URLs
  data.entities.urls?.forEach((url) => {
    fullText = fullText.replace(
      url.url,
      `<a rel="noreferrer noopener" target="_blank" href="${url.url}">${url.display_url}</a>`
    )
  })
  
  // Replace mentions
  data.entities.user_mentions?.forEach((mention) => {
    fullText = fullText.replace(
      `@${mention.screen_name}`,
      `<a rel="noreferrer noopener" target="_blank" href="https://twitter.com/${mention.screen_name}">@${mention.screen_name}</a>`
    )
  })
  
  // Replace hashtags
  data.entities.hashtags?.forEach((hashtag) => {
    fullText = fullText.replace(
      `#${hashtag.text}`,
      `<a rel="noreferrer noopener" target="_blank" href="https://twitter.com/hashtag/${hashtag.text}">#${hashtag.text}</a>`
    )
  })
  
  // Remove media URLs from text
  if (data.entities.media) {
    data.entities.media.forEach((media) => {
      fullText = fullText.replace(media.url, '')
    })
  }
  
  return (
    <div className={styles.astroTweet}>
      {data.entities?.media && data.entities.media.length > 0 && (
        <div className={styles.astroTweetMedia}>
          <img
            src={data.entities.media[0].media_url_https}
            alt="unknown tweet media content"
          />
        </div>
      )}
      
      <div className={styles.astroTweetHeader}>
        <img
          className={styles.astroTweetHeaderProfilePicture}
          src={data.user.profile_image_url_https}
          alt={`${data.user.name} profile image`}
        />
        <div className={styles.astroTweetHeaderNames}>
          <div className={styles.astroTweetHeaderNamesFull}>
            {data.user.name}
          </div>
          <div className={styles.astroTweetHeaderNamesUsername}>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href={`https://twitter.com/${data.user.screen_name}`}
            >
              @{data.user.screen_name}
            </a>
          </div>
        </div>
        <div className={styles.astroTweetHeaderTwitterLogo}>
          <a
            rel="noreferrer noopener"
            target="_blank"
            href={`https://twitter.com/${data.user.screen_name}/status/${data.id_str}`}
          >
            <Image src="/assets/twitter.svg" width={20} height={20} alt="Twitter" />
          </a>
        </div>
      </div>
      <div 
        className={styles.astroTweetBody}
        dangerouslySetInnerHTML={{ __html: fullText }}
      />
    </div>
  )
}
