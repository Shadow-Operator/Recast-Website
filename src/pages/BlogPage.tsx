import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";

const BlogPage = () => {
  return (
    <main className="overflow-hidden bg-background text-foreground min-h-screen">
      <Helmet>
        <title>Blog – Recast | Creator Economy Insights & Industry Trends</title>
        <meta
          name="description"
          content="Expert insights on the creator economy, brand partnerships, and social media trends in gaming and betting. Stay ahead with Recast's industry analysis."
        />
        <link rel="canonical" href="https://recastgg.lovable.app/blog" />
      </Helmet>
      <Navbar />

      <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-4 md:px-12 max-w-6xl mx-auto">
        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
          Blog
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-12 md:mb-16">
          Insights, trends, and strategies from the frontlines of the creator economy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block border border-border rounded-sm overflow-hidden hover:border-muted-foreground/40 transition-colors"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5 md:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[11px] uppercase tracking-[0.08em] font-semibold text-blue-accent">
                    {post.category}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{post.readTime}</span>
                </div>
                <h2 className="font-display text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                  {post.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BlogPage;
