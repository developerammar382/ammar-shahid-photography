import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Clock } from "lucide-react";
import { getBlogPosts } from "@/data/index";

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  const posts = getBlogPosts();
  const featuredPost = posts[0];
  const restPosts = posts.slice(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(".blog-header-el",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }
      );
      gsap.utils.toArray<Element>(".blog-card").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground pt-24" data-testid="page-blog">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="py-16 border-b border-white/8 mb-16">
          <p className="blog-header-el text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Journal</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="blog-header-el font-serif text-5xl md:text-6xl text-white">Behind the Work</h1>
            <p className="blog-header-el text-white/40 text-sm max-w-xs leading-relaxed">
              Notes on craft, process, travel, and the occasional gear obsession.
            </p>
          </div>
        </div>

        {/* Featured post */}
        <Link
          to={`/journal/${featuredPost.slug}`}
          className="blog-card group grid md:grid-cols-2 gap-0 mb-16 border border-white/8 hover:border-white/20 transition-all duration-300 overflow-hidden"
          data-testid={`card-post-${featuredPost.id}-featured`}
        >
          <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
            <img
              src={featuredPost.coverImage}
              alt={featuredPost.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="p-10 md:p-14 flex flex-col justify-between bg-black">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-white/30 text-[10px] tracking-[0.25em] uppercase">{featuredPost.category}</span>
                <span className="text-white/15">·</span>
                <span className="text-white/30 text-[10px] tracking-[0.25em] uppercase">{featuredPost.date}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 leading-tight">{featuredPost.title}</h2>
              <p className="text-white/50 leading-relaxed text-sm">{featuredPost.subtitle}</p>
            </div>
            <div className="flex items-center justify-between mt-10">
              <div className="flex items-center gap-2 text-white/30 text-xs">
                <Clock size={12} />
                <span>{featuredPost.readTime} min read</span>
              </div>
              <span className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/50 group-hover:text-white transition-colors">
                Read <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </Link>

        {/* Rest of posts */}
        <div className="grid md:grid-cols-3 gap-px bg-white/5 mb-24">
          {restPosts.map((post) => (
            <Link
              key={post.id}
              to={`/journal/${post.slug}`}
              className="blog-card group bg-black overflow-hidden"
              data-testid={`card-post-${post.id}`}
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase">{post.category}</span>
                  <span className="text-white/15">·</span>
                  <span className="text-white/30 text-[10px]">{post.date}</span>
                </div>
                <h3 className="font-serif text-xl text-white mb-2 group-hover:text-white/80 transition-colors">{post.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed line-clamp-2">{post.subtitle}</p>
                <div className="flex items-center gap-2 mt-5 text-white/30 text-xs">
                  <Clock size={11} />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
