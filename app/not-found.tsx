import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "4rem 0" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>404</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>页面未找到</p>
      <Link href="/" style={{ fontSize: "1.1rem" }}>
        返回首页
      </Link>
    </div>
  );
}
