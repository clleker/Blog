import React,{useEffect,useState}from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as apiArticle from "../../api/article-api";
import { setStrLengthLimitByNumber } from '../../helper/helper-methods';
import moment from "moment";
import { apiUrl } from '../../helper/constant/api-constant';
import { useNavigate } from 'react-router-dom';

export default function LatestArticles() {
    const navigate = useNavigate();
    const [lastArticles, setLastArticles] = useState([]); 

    useEffect(() => {
        getList();
      }, []); 
    
      const getList = async() => {
       await  apiArticle.getLastArticles().then((result) => {
          if(result.successful) {
            setLastArticles(result?.data)
          }
        });
      };

      const goArticleDetail = (article) => {
        navigate(`${article.slugTitle}`)
      }
  return (
    <section className="widget latestposts">
    <h3 className="widget-title">Son Makaleler</h3>
    <hr />
  {lastArticles?.map(x=> (
     <article key={x.id} className="post">
 <div className="top">
   <a
       
       onClick={()=>goArticleDetail(x)}
        className="thumbnail"
   >
<FontAwesomeIcon className='fa-link' icon="fa-solid fa-link" />
<span>
       <img
              className="background"
              src={`${apiUrl + x?.smallImagePath}`}
            /> 
            </span>
      {/* <span  style={{
                backgroundImage:
                `url(${apiUrl + x?.headerImagePath})`
        }}>
        </span> */}
   
   </a>
   <div className="info">
     <a
       href="https://severn-wp.ecko.me/category/system-administration/"
       className="button rounded grayoutline tiny category"
     >
       System Administration
     </a>{" "}
     <h5 className="title">
       <a 
       onClick={()=>goArticleDetail(x)}
       
       >
         {x.title}
       </a>
     </h5>
     <section className="meta">
       <span className="posted">Posted </span>
       <span className="author">
         <span>by</span>{" "}
         <a 
          onClick={()=>goArticleDetail(x)}
          
         >
           <img
             src="https://severn-wp.ecko.me/wp-content/uploads/2017/10/cropped-harveys-24x24.jpg"
             className="gravatarsmall"
             alt=""
             data-no-retina="true"
           />{" "}
           Harvey Specter
         </a>
       </span>
       <span className="date">
         <span>on</span>{" "}
         <a 
              onClick={()=>goArticleDetail(x)}
              
         >
           <i className="fa fa-clock-o" />{" "}
           <time >{moment(x?.publishDate).format('LL')}</time>
         </a>
       </span>
     </section>
   </div>
 </div>
 <p className="excerpt">
  {x.contentText}
 </p>
    </article>
    ))}
   

  </section>
  )
}
