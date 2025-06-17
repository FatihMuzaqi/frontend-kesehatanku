export default class DashboardPresenter {
  #model;
  #view;

  constructor({ model, view }) {
    this.#model = model;
    this.#view = view;
  }

  async getUsers() {
    try {
      const res = await this.#model.Users.getUsers();
      this.TotalPresentaseUsers(res.data);
      this.#view.setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async getArticles() {
    try {
      const resArticles = await this.#model.Dashboard.getArticle();
      this.TotalPresentaseArticles(resArticles.data);
      this.#view.setArticles(resArticles.data);

      const resCategories = await this.#model.Dashboard.getKategori();
      this.#view.setCategories(resCategories.data);
    } catch (err) {
      console.log(err);
    }
  }

  TotalPresentaseUsers(users) {
    const nowDate = new Date();
    let priceNowMount = 0;
    let priceOldMount = 0;
    for (const user of users) {
      let oldDate = new Date(user.createdAt);
      if (nowDate.getFullYear() === oldDate.getFullYear() && (nowDate.getMonth() - 1) === oldDate.getMonth()) {
        priceNowMount += 1;
      }
      if (nowDate.getFullYear() === oldDate.getFullYear() && (nowDate.getMonth() - 2) === oldDate.getMonth()) {
        priceOldMount += 1;
      }
    }
    if (priceNowMount === 0 || priceOldMount === 0) return;

    const presentase = ((priceNowMount - priceOldMount) / priceOldMount) * 100;
    console.log(presentase);
    this.#view.setPresentaseUsers(parseInt(presentase));
  }

  TotalPresentaseArticles(articles) {

    const nowDate = new Date();
    let priceNowMount = 0;
    let priceOldMount = 0;
    for (const article of articles) {
      let oldDate = new Date(article.createdAt);
      console.log(oldDate.getMonth())
      if (nowDate.getFullYear() === oldDate.getFullYear() && (nowDate.getMonth() - 1) === oldDate.getMonth()) {
        priceNowMount += 1;
      }
      if (nowDate.getFullYear() === oldDate.getFullYear() && (nowDate.getMonth() - 2) === oldDate.getMonth()) {
        priceOldMount += 1;
      }
    }
    if (priceNowMount === 0 || priceOldMount === 0) return;

    const presentase = ((priceNowMount - priceOldMount) / priceOldMount) * 100;
    this.#view.setPresentaseArticles(parseInt(presentase));
  }
}

