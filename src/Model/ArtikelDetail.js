
import { instance } from '.';

export class ArticleModel {

  async getArticleById(id) {
    try {
      const response = await instance.get(`/api/artikel/${id}`);
      return {
        success: true,
        data: response.data.data || response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getAllArticles() {
    try {
      const response = await instance.get(`/api/artikel`);
      return {
        success: true,
        data: response.data.data || response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getCategories() {
    try {
      const response = await instance.get(`/api/kategori`);
      return {
        success: true,
        data: response.data.data || response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async subscribeNewsletter(email) {
    try {
      const response = await instance.post(`/api/newsletter`, { email });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  filterArticlesByCategory(articles, categoryId) {
    return articles.filter(article => 
      String(article.kategori_id) === String(categoryId)
    );
  }

  getRandomArticles(articles, excludeId, excludeCategoryId, count = 3) {
    return articles
      .filter(a => a.kategori_id !== excludeCategoryId && a.id !== excludeId)
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  }

  getPopularArticles(articles, excludeId, count = 3) {
    return articles
      .filter(a => a.id !== excludeId)
      .sort((a, b) => b.id - a.id)
      .slice(0, count);
  }

  addCountToCategories(categories, articles) {
    return categories.map(kategori => {
      const count = articles.filter(
        a => String(a.kategori_id) === String(kategori.id)
      ).length;
      return { ...kategori, count };
    });
  }

  getCategoryName(categories, categoryId) {
    if (!categories || categories.length === 0) return 'Memuat kategori...';
    const kategori = categories.find(k => String(k.id) === String(categoryId));
    return kategori ? kategori.nama_kategori : 'Kategori tidak ditemukan';
  }

  async getlike(user_id, artikel_id) {
    const res = await instance.post(`/api/like`, {
      user_id: user_id,
      artikel_id: artikel_id
    });

    return res.data;
  }

  async createLike(user_id, artikel_id, status) {
    const res = await instance.post(`/api/likes`, {
      user_id: user_id,
      artikel_id: artikel_id,
      status: status
    });

    return res.data;
  }


  async getUser() {
    const cookie = await instance.get(`/token`, {
      withCredentials: true
    });
    const res = await instance.get(`/api/user`, {
      headers: {
        Authorization: `Bearer ${cookie.data.accessToken}`
      }
    });

    return res.data;
  }

  async getLikes(id) {
    const res = await instance.get(`/api/likes/${id}`);
    return res.data;
  }
}