import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { getBlogPostBySlug, getBlogPosts } from "@/data/index";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const allPosts = getBlogPosts();
  const related = allPosts.filter(p => p.slug !== slug).slice(0, 2);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!post) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".post-hero-el",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power3.out", delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, [post]);

  if (!post) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <p className="font-serif text-3xl text-white mb-4">Post not found</p>
        <Link to="/journal" className="text-white/40 text-xs tracking-widest uppercase hover:text-white transition-colors">
          Back to Journal
        </Link>
      </main>
    );
  }

  const paragraphs = post.body.split("\n\n").filter(Boolean);

  return (
    <main className="min-h-screen bg-background text-foreground pt-20" data-testid="page-blog-post">
      {/* Hero image */}
      <div className="relative h-[60vh] overflow-hidden">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
        <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-6 pb-14">
          <p className="post-hero-el text-white/40 text-[10px] tracking-[0.35em] uppercase mb-4">
            {post.category} — {post.date}
          </p>
          <h1 className="post-hero-el font-serif text-4xl md:text-6xl text-white leading-tight mb-4">{post.title}</h1>
          <p className="post-hero-el text-white/60 text-lg leading-relaxed">{post.subtitle}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-6 mb-14 pb-10 border-b border-white/8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs tracking-[0.2em] uppercase group"
            data-testid="button-back"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            Journal
          </button>
          <div className="flex items-center gap-2 text-white/30 text-xs">
            <Clock size={12} />
            <span>{post.readTime} min read</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {post.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase text-white/25 border border-white/10 px-2 py-1">
                <Tag size={9} /> {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Body */}
        <article className="space-y-6 mb-16" data-testid="post-body">
          {paragraphs.map((para, i) => {
            if (para.startsWith("**") && para.endsWith("**")) {
              return (
                <h3 key={i} className="font-serif text-2xl text-white pt-4">
                  {para.replace(/\*\*/g, "")}
                </h3>
              );
            }
            return (
              <p key={i} className="text-white/60 leading-relaxed text-[17px]">
                {para}
              </p>
            );
          })}
        </article>

        {/* Inline photos */}
        {post.photos.length > 0 && (
          <div className="grid grid-cols-2 gap-px bg-white/5 mb-16" data-testid="post-photos">
            {post.photos.map(photo => (
              <div key={photo.id} className="aspect-[4/3] overflow-hidden">
                <img
                  src={`${photo.url.split("?")[0]}?w=700&q=80`}
                  alt={photo.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        )}

        {/* Author byline */}
        <div className="flex items-center gap-5 py-10 border-t border-b border-white/8 mb-16">
          <div className="w-14 h-14 overflow-hidden shrink-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
              alt="Ammar Shahid"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-white text-sm font-medium">Ammar Shahid</p>
            <p className="text-white/40 text-xs">Photographer & Writer — Lahore, Pakistan</p>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div>
            <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-8">More from the Journal</p>
            <div className="grid md:grid-cols-2 gap-px bg-white/5">
              {related.map(r => (
                <Link
                  key={r.id}
                  to={`/journal/${r.slug}`}
                  className="group bg-black overflow-hidden"
                  data-testid={`link-related-${r.id}`}
                >
                  <div className="aspect-[3/2] overflow-hidden">
                    <img src={r.coverImage} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-2">{r.category}</p>
                    <p className="font-serif text-lg text-white group-hover:text-white/80 transition-colors">{r.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
