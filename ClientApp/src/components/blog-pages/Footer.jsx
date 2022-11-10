import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as apiSocialMedia from "../../api/socialmedia-api";
import React,{useEffect,useState} from "react";

export default function Footer() {

  const [socialMedia, setSocialMedia] = useState([]); //initial value

  useEffect(() => {
    getList();
  }, []); //Tek sefer çalış document ready

  const getList = () => {
    apiSocialMedia.getList().then((result) => {
      setSocialMedia(result.data);
    });
  };

  return (
    <>
      <footer className="page-footer">
        <section className="widget copyright">
          <p className="main">
          Bu sitedeki tüm içerik ©<a href="https://severn-wp.ecko.me/">Celal Eker'e</a> aittir. Sitenin tüm hakkı gizlidir, çalıntı ve kaynaksız alıntı yapılmadığı taktirde hakkım hepinize helaldir.
          </p>
          <p className="alt">
            <span className="ecko">
              <a target="_blank" href="http://ecko.me/themes/wordpress/severn/">
               Sitenin FullStack Geliştirmesi  
              </a>{" "}
              <a target="_blank" href="http://ecko.me">
              Celal Eker{" "} 
              </a>
              Tarafından yapılmıştır.
            </span>
          </p>
        </section>
        <ul className="social">
        {
            socialMedia.map(x=>
              <li key={x.id}>
              <a
                href={x.link}
                target="_blank"
                title={x.title}
                className={`socialbutton ${x.className}`}
              >
                <FontAwesomeIcon icon={x.icon} />
              </a>
            </li>
            )
          }
        </ul>
      </footer>
    </>
  );
}
