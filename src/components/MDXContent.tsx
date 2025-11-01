import { remark } from "remark";
import html from "remark-html";
import Tweet from "./Tweet";
import Hint from "./Hint";

interface MDXContentProps {
  content: string;
}

export async function MDXContent({ content }: MDXContentProps) {
  // Process the markdown content
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(content);

  const contentHtml = processedContent.toString();

  // For now, we'll render the HTML directly
  // In a production app, you might want to use a more sophisticated MDX processor
  // that can handle custom components like Tweet and Hint
  return <div dangerouslySetInnerHTML={{ __html: contentHtml }} />;
}
