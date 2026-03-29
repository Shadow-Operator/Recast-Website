import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Simple markdown-ish rendering: split by lines and handle headings, lists, bold
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;

    for (const line of lines) {
      i++;
      const trimmed = line.trim();
      if (!trimmed) continue;

      if (trimmed.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="font-display text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">
            {trimmed.replace("## ", "")}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="font-display text-xl md:text-2xl font-semibold text-foreground mt-8 mb-3">
            {trimmed.replace("### ", "")}
          </h3>
        );
      } else if (trimmed.startsWith("- **")) {
        const parts = trimmed.replace("- ", "").split("**");
        elements.push(
          <li key={i} className="text-muted-foreground text-base md:text-lg leading-relaxed ml-4 mb-2">
            <strong className="text-foreground">{parts[1]}</strong>{parts[2]}
          </li>
        );
      } else if (trimmed.match(/^\d+\.\s/)) {
        const text = trimmed.replace(/^\d+\.\s/, "");
        const parts = text.split("**");
        elements.push(
          <li key={i} className="text-muted-foreground text-base md:text-lg leading-relaxed ml-4 mb-2 list-decimal">
            {parts.length > 1 ? (
              <><strong className="text-foreground">{parts[1]}</strong>{parts[2]}</>
            ) : text}
          </li>
        );
      } else {
        // Render bold within paragraphs
        const parts = trimmed.split(/\*\*(.*?)\*\*/g);
        elements.push(
          <p key={i} className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
            {parts.map((part, idx) =>
              idx % 2 === 1 ? <strong key={idx} className="text-foreground">{part}</strong> : part
            )}
          </p>
        );
      }
    }
    return elements;
  };

  return (
    <main className="overflow-hidden bg-background text-foreground min-h-screen">
      <Helmet>
        <title>{post.title} - Recast Blog</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={`https://recast.gg/blog/${post.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            image: post.image,
            author: { "@type": "Organization", name: "Recast" },
            publisher: { "@type": "Organization", name: "Recast", url: "https://recast.gg" },
          })}
        </script>
      </Helmet>
      <Navbar />

      <article className="pt-32 md:pt-40 pb-16 md:pb-24 px-4 md:px-12 max-w-3xl mx-auto">
        <Link
          to="/blog"
          className="text-muted-foreground text-sm hover:text-foreground transition-colors mb-8 inline-block"
        >
          ← Back to Blog
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-[11px] uppercase tracking-[0.08em] font-semibold text-blue-accent">
            {post.category}
          </span>
          <span className="text-[11px] text-muted-foreground">{formattedDate}</span>
          <span className="text-[11px] text-muted-foreground">{post.readTime}</span>
          <span className="text-[11px] text-muted-foreground">By {post.author}</span>
        </div>

        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
          {post.title}
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8">
          {post.description}
        </p>

        <div className="aspect-[16/9] overflow-hidden rounded-sm mb-10">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div>{renderContent(post.content)}</div>

        {/* CTA Banner */}
        <div className="mt-16 border border-border p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight mb-3">
            Ready to work with us?
          </h3>
          <p className="text-muted-foreground font-light mb-6 max-w-lg mx-auto">
            Whether you're a creator looking to monetise or a brand looking for the right audience, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/creators"
              className="bg-blue-accent text-white font-semibold text-sm px-8 py-3 hover:bg-blue-glow transition-colors text-center"
            >
              Join as a Creator
            </a>
            <a
              href="/brands"
              className="border border-border text-foreground font-semibold text-sm px-8 py-3 hover:border-blue-accent/40 hover:text-blue-accent transition-all text-center"
            >
              Partner as a Brand
            </a>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
};

export default BlogPostPage;
