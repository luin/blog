import { Metadata } from "next";
import Article from "@/components/Article";
import config from "@/lib/config";

export const metadata: Metadata = {
  title: "关于我",
  description: "了解更多关于子骅的信息",
};

export default function AboutPage() {
  return (
    <Article>
      <h1>关于我</h1>

      <p>我是子骅，有时会用 luin 这个 ID。</p>

      <p>
        目前工作于 <a href="https://slab.com/">Slab</a>
        ，一个提供企业知识管理服务的 SaaS 产品。 曾就职于
        <a href="https://shimo.im">石墨文档</a>，管理一个将近一百人的技术团队。
      </p>

      <p>
        偶尔会写一些文章，出版过一本技术书{" "}
        <a href="https://book.douban.com/subject/24522045/">
          《Redis 入门指南》
        </a>
        。
      </p>

      <p>
        眼下（2022年）主要写一些 WYSIWYG 文档编辑器代码，部分工作会开源到{" "}
        <a href="https://quilljs.com">Quill</a> 项目中。 其他时间会写一些
        Elixir, Swift, Node.js 项目。
      </p>

      <p>
        欢迎与我联系 <a href={`mailto:${config.email}`}>{config.email}</a>。
      </p>
    </Article>
  );
}
