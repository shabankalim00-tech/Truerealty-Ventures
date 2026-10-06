// ============================================================================
// BLOG API (Dedicated API for all Real Estate Insights, News & Articles)
// ============================================================================

import { BLOGS } from '../data/mockData';

// Local storage helper
function getStored(key, defaultVal) {
  try {
    const val = localStorage.getItem(`truerealty_${key}`);
    return val ? JSON.parse(val) : defaultVal;
  } catch (e) {
    return defaultVal;
  }
}

function setStored(key, value) {
  try {
    localStorage.setItem(`truerealty_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
}

let blogsList = getStored('blogs', BLOGS);

export const BLOG_CATEGORIES = [
  'All',
  'Market Trends',
  'Investment Guide',
  'Home Buying Tips',
  'Legal & Tax',
  'City Insights',
  'Interior Design',
];

// ==========================================
// BLOG API METHODS
// ==========================================
export const blogApi = {
  // 1. Get all articles with category, tag & search filters
  async getBlogs(params = {}) {
    await new Promise((r) => setTimeout(r, 60));
    let filtered = [...blogsList];

    const { category, tag, search, page = 1, limit = 9 } = params;

    if (category && category !== 'All') {
      filtered = filtered.filter((b) => b.category?.toLowerCase() === category.toLowerCase());
    }
    if (tag) {
      filtered = filtered.filter((b) => b.tags?.includes(tag));
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter((b) => b.title?.toLowerCase().includes(q) || b.excerpt?.toLowerCase().includes(q));
    }

    const total = filtered.length;
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 9;
    const totalPages = Math.ceil(total / limitNum) || 1;
    const paginated = filtered.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    return {
      success: true,
      data: { articles: paginated },
      pagination: { page: pageNum, limit: limitNum, total, totalPages },
    };
  },

  // 2. Get Single Blog by Slug
  async getBlogBySlug(slug) {
    await new Promise((r) => setTimeout(r, 60));
    const article = blogsList.find((b) => b.slug === slug || b._id === slug);
    if (!article) {
      throw { statusCode: 404, message: 'Article not found' };
    }

    // Increment view count
    article.views = (article.views || 0) + 1;
    setStored('blogs', blogsList);

    const related = blogsList
      .filter((b) => b._id !== article._id && b.category === article.category)
      .slice(0, 3);

    return {
      success: true,
      data: {
        article,
        relatedArticles: related.length ? related : blogsList.filter((b) => b._id !== article._id).slice(0, 3),
      },
    };
  },

  // 3. Get Blog Categories
  getCategories() {
    return BLOG_CATEGORIES;
  },

  // 4. Create New Blog
  async createBlog(blogData) {
    await new Promise((r) => setTimeout(r, 60));
    const newArticle = {
      _id: `blog-${Date.now()}`,
      ...blogData,
      slug: blogData.slug || blogData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString(36),
      views: 0,
      publishedAt: new Date().toISOString(),
      isPublished: true,
    };
    blogsList = [newArticle, ...blogsList];
    setStored('blogs', blogsList);
    return { success: true, data: { article: newArticle } };
  },

  // 5. Update Blog
  async updateBlog(id, blogData) {
    await new Promise((r) => setTimeout(r, 60));
    blogsList = blogsList.map((b) => (b._id === id ? { ...b, ...blogData } : b));
    setStored('blogs', blogsList);
    return { success: true, data: { article: blogData } };
  },

  // 6. Delete Blog
  async deleteBlog(id) {
    await new Promise((r) => setTimeout(r, 60));
    blogsList = blogsList.filter((b) => b._id !== id);
    setStored('blogs', blogsList);
    return { success: true };
  },
};

export default blogApi;
