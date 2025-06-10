import { useState, useEffect } from 'react';
import ArticleModel from '../Model/ArtikelModel';

class ArticlePresenter {
  constructor() {
    this.model = new ArticleModel();
  }

  useArticleLogic() {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeSubcategory, setActiveSubcategory] = useState("Semua");
    const [error, setError] = useState(null);

    useEffect(() => {
      this.loadData(setArticles, setCategories, setLoading, setError);
    }, []);

    const filteredArticles = this.model.filterArticlesByCategory(
      articles, 
      categories, 
      activeSubcategory
    );

    const subcategories = this.model.createSubcategories(categories, articles);

    return {
      articles,
      categories,
      loading,
      activeSubcategory,
      error,
      filteredArticles,
      subcategories,
      setActiveSubcategory,

      getCategoryName: (categoryId) => this.model.getCategoryName(categoryId, categories),
      formatDate: this.model.formatDate,
      truncateText: this.model.truncateText,

      handleSubcategoryChange: (subcategory) => {
        setActiveSubcategory(subcategory);
      },
      
      handleRefresh: () => {
        this.loadData(setArticles, setCategories, setLoading, setError);
      }
    };
  }

  async loadData(setArticles, setCategories, setLoading, setError) {
    try {
      setLoading(true);
      setError(null);

      const [articlesData, categoriesData] = await Promise.all([
        this.model.fetchArticles(),
        this.model.fetchCategories()
      ]);

      setArticles(articlesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error loading data:", error);
      setError(error.message || 'Terjadi kesalahan saat memuat data');
    } finally {
      setLoading(false);
    }
  }

  getArticlesBySection(articles, section) {
    switch (section) {
      case 'featured':
        return articles.slice(0, 2);
      case 'sidebar':
        return articles.slice(3);
      case 'main':
        return articles.slice(1);
      default:
        return articles;
    }
  }

  validateArticle(article) {
    return article && article.id && article.judul && article.isi;
  }

  validateCategory(category) {
    return category && category.id && category.nama_kategori;
  }

  searchArticles(articles, searchTerm) {
    if (!searchTerm) return articles;
    
    const term = searchTerm.toLowerCase();
    return articles.filter(article => 
      article.judul.toLowerCase().includes(term) ||
      article.isi.toLowerCase().includes(term)
    );
  }

  sortArticles(articles, sortBy = 'date') {
    switch (sortBy) {
      case 'date':
        return [...articles].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case 'title':
        return [...articles].sort((a, b) => a.judul.localeCompare(b.judul));
      case 'author':
        return [...articles].sort((a, b) => a.author.localeCompare(b.author));
      default:
        return articles;
    }
  }

  getArticleUrl(articleId) {
    return `/artikel/${articleId}`;
  }

  getCategoryUrl(categoryId) {
    return `/kategori/${categoryId}`;
  }

  getTrendingTags() {
    return ['Sehat', 'Gizi', 'Kehamilan', 'Mental', 'Nutrisi','Penyakit Kulit','Gaya Hidup','Kesehatan Diri'];
  }

  getHealthTools() {
    return [
      { title: 'Cek Kesehatan' },
      { title: 'Konsultasi Penyakit' },
    ];
  }

  getSocialMediaLinks() {
    return [
      { platform: 'facebook', url: '#' },
      { platform: 'twitter', url: '#' },
      { platform: 'whatsapp', url: '#' },
      { platform: 'instagram', url: '#' },
      { platform: 'email', url: '#' }
    ];
  }

}

const articlePresenter = new ArticlePresenter();
export { articlePresenter };