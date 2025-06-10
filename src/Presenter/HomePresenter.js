
import { HomeModel } from "../Model/modelHome";

export class HomePresenter {
  constructor(view) {
    this.view = view;
    this.model = new HomeModel();
  }

  // Initialize data loading
  async initialize() {
    this.view.setLoading(true);

    try {
      await this.loadAllData();
      this.view.setLoading(false);
    } catch (error) {
      console.error("Error initializing data:", error);
      this.view.setLoading(false);
      this.view.showError("Gagal memuat data. Silakan coba lagi.");
    }
  }

  // Load all required data
  async loadAllData() {
    try {
      const [artikel, kategoriKesehatan] = await Promise.all([
        this.model.fetchArtikel(),
        this.model.fetchKategoriKesehatan(),
      ]);

      // Process data
      const processedData = this.processData(artikel, kategoriKesehatan);

      // Update view with processed data
      this.view.updateData(processedData);
    } catch (error) {
      throw error;
    }
  }

  // Process and organize data for the view
  processData(artikel, kategoriKesehatan) {
    // Calculate article count per category
    const artikelCountPerKategori = this.model.calculateArtikelCountPerKategori(
      artikel,
      kategoriKesehatan
    );

    // Get top 3 categories
    const top3Kategori = this.model.getTop3Kategori(artikelCountPerKategori);

    // Shuffle and sort articles
    const shuffledArticles = this.model.shuffleArray(artikel);
    const sortedArticles = this.model.sortArticlesByDate(artikel);

    return {
      artikel,
      kategoriKesehatan,
      artikelCountPerKategori,
      top3Kategori,
      shuffledArticles,
      sortedArticles,
    };
  }

  // Handle user role checking
  checkUserRole() {
    const role = this.model.getUserRole();
    return role !== "admin";
  }

  // Get category name by ID
  getCategoryName(kategoriId, kategoriKesehatan) {
    return this.model.getNamaKategori(kategoriId, kategoriKesehatan);
  }

  // Handle navigation events
  onNavigateToArticle(articleId) {
    this.view.navigateToArticle(articleId);
  }

  onNavigateToCategory(categoryId) {
    this.view.navigateToCategory(categoryId);
  }

  onNavigateToAllArticles() {
    this.view.navigateToAllArticles();
  }

  onSearch(searchTerm) {
    // In a real application, this would filter articles
    console.log("Searching for:", searchTerm);
    // Implement search logic here
  }

  // Format date for display
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
  }

  // Truncate text for preview
  truncateText(text, maxLength = 100) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }
}

