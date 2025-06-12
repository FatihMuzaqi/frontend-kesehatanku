import { useEffect, useState } from "react";
import { ArticlePresenter } from "../../Presenter/DetailArtikelPresenter";
import { FaCalendarAlt } from "react-icons/fa";

const ArtikelTersimpan = () => {
    const [artikel, setArtikel] = useState([]);

    const presenter = new ArticlePresenter({
        view: {
            setArtikel: setArtikel
        }
    });

    useEffect(() => {
        presenter.getAllArtikel();
    }, []);

  return (
    <div className="col-lg-4">
      <div className="bg-white mt-4 mb-3">
        <h4 className="mb-0">Semua Artikel</h4>
      </div>
      <div className="card-body">
        <div className="row">
          {artikel.map((item) => (
            <div key={item.id} className="col-12 mb-3">
              <a href={`/artikel/${item.id}`} className="text-black">
                <div className="d-flex rounded overflow-hidden shadow-none">
                  <img
                    src={item.images || "default-image.png"}
                    className="img-fluid"
                    alt={item.judul}
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />

                  <div className="p-2 d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-between align-items-center">
                      <span
                        className="badge bg-gradient mb-1"
                        style={{ width: "100px" }}
                      >
                      </span>
                      <p className="card-text small text-muted mb-0 title-createdAt">
                        <FaCalendarAlt className="me-1" />
                        {presenter.formatDate(item.createdAt)}
                      </p>
                    </div>
                    <div>
                      <h6 className="mb-1">{item.judul}</h6>
                      <p className="text-muted small">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.isi?.slice(0, 90) + "...",
                          }}
                        ></div>
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default ArtikelTersimpan;
