import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Tag } from 'lucide-react';
import api from '../services/api';
import { formatDate } from '../utils/formatters';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/blog/${slug}`);
        if (res.success && res.data.article) {
          setArticle(res.data.article);
          setRelated(res.data.relatedArticles || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Article Not Found</h2>
        <Link to="/blog" className="mt-4 text-primary-600 font-bold hover:underline">
          Browse Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <Link
          to="/blog"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-primary-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-100 text-primary-800">
            {article.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif text-slate-900 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-y border-slate-200 py-3">
            <span className="flex items-center font-semibold text-slate-800">
              <User className="w-3.5 h-3.5 mr-1 text-primary-600" />
              {article.author || 'True Realty Venture Research'}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              {formatDate(article.publishedAt)}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {article.readTimeMinutes || 5} min read
            </span>
          </div>
        </div>

        {/* Feature Visual */}
        <div className="rounded-3xl overflow-hidden aspect-[16/9] bg-slate-100 shadow-md">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <p className="text-base text-slate-800 font-medium leading-relaxed italic border-l-4 border-gold-500 pl-4">
            {article.excerpt}
          </p>

          <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {article.content}
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 flex items-center">
                <Tag className="w-3 h-3 mr-1" /> Tags:
              </span>
              {article.tags.map((t, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-xs text-slate-600">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
