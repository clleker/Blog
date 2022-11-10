import * as apiArticle from "../../api/article-api";
import React,{useState,useEffect} from 'react'
import "../../style/TagList.css"
import "../../style/ArticleDetail.css"
import moment from "moment";
import {connect} from "react-redux";
import {filter} from '../../redux/actions/articleFilterAction'
import { useParams } from "react-router-dom";
import initialStates from "../../redux/initialStates";

  function ArticleDetail(props) {
  const params = useParams();
  const {filter} = props;
  const [article, setArticle] = useState(null); 

  useEffect(() => {
    getDetail();
    window.scrollTo(0, 0)
  }, [params.slug]); 

  const getDetail = async() => {
   await  apiArticle.getArticleDetail(params.slug).then((result) => {
      if(result.successful) {
        setArticle(result.data);
      }
    });
  };


  const submit = (tag) => {
    filter({...initialStates.articleFilter,tagId:tag.id})
   }

  return (
 
    <article className="post-item post-52 post type-post status-publish format-standard has-post-thumbnail hentry category-frontend-development category-programming-patterns tag-css tag-development tag-frontend tag-html tag-sass">
    <div className="post-banner-wrap inner-detail">
      {/* <div className="post-banner">
        <div className="background" 
        style={{backgroundImage: `url(${apiUrl + article?.headerImagePath})`}} 
        />
        <a className="category" style={{background: '#4285f4'}} href="https://severn-wp.ecko.me/category/frontend-development/">Frontend Development</a>
      </div> */}
    </div>
    <section id="post-52" className="post-item-header inner-detail"> 
    <div className="meta">
    <ul className="breadcrumb">
            {article?.tags.map(x=> (
              <>
              <li key={x.id} className="breadcrumb-item"><a 
               onClick={()=>submit(x)}
              >{x.tagName}</a></li>
              </>
            ))}
      </ul>
     </div>
     <div className="separator-5"></div>
     <div className="meta">
        <span className="author">Yazar <a href="#!">CllEker</a> — </span>
        <span className="date">
          <a >
            <time dateTime="2015-05-14" itemProp="datePublished">{moment(article?.publishDate).format("LL")}</time>
          </a>
        </span>
      </div>
      <h1 style={{margin:"0px"}} itemProp="name headline">{article?.title}</h1>
    </section>
    <section className="article-detail-content inner-detail" itemProp="articleBody">
     <div dangerouslySetInnerHTML={{__html:article?.contentHtml}}></div>
    </section>
 
  </article>
    // <div className="container" dangerouslySetInnerHTML={{__html: article?.contentHtml}}></div>
  )
}


const mapDispatchToProps = {filter}
const mapStateToProps = (state) => (
  { tags: state.tagListReducer});

export default connect(mapStateToProps,mapDispatchToProps)(ArticleDetail)