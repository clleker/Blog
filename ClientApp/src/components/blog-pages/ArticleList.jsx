import * as apiArticle from "../../api/article-api";
import React,{useState,useEffect} from 'react'
import moment from "moment";
import { setStrLengthLimitByNumber } from '../../helper/helper-methods';
import { apiUrl } from '../../helper/constant/api-constant';
import { useNavigate } from 'react-router-dom';
import { slugify } from "../../helper/slug";
import { connect } from "react-redux";
import initialStates from "../../redux/initialStates";
import {setFilterResult,filter} from '../../redux/actions/articleFilterAction'
import { Spin,Alert } from "antd";

 function ArticleList(props) {
    const {articleFilterStore,categories,tags,setFilterResult,filter} = props;
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]); 
    const [articleBanner, setArticleBanner] = useState(null); 
    const [isFilter, setIsFilter] = useState(false); 
    const [searchCountResult,setSearchCountResult] = useState(0)
    const [pagination,setPagination] = useState({current:1, pageSize:10, totalPage:0})
    const [spin,setSpin] = useState(true)

      useEffect(() => {
        getList();
      }, [articleFilterStore]); 

      const getList = async() => {
       await  apiArticle.getListForWeb(articleFilterStore).then((result) => {
          if(result.successful) {
            setSpin(false)
            //UI tarafına listeyi ayarlamak için APİ'DEn gelen listenin ilk elemanını listeden kopardım ve 2 ayrı 1 liste ve bir banner modele ayırdım ve liste zaten Backende'den sıralı geliyor. 
             if(!checkFilterStatus()){
              setArticleBanner(result?.data?.items[0]) //banner 
              setArticles(createSplitArrayByNumber(result?.data?.items?.slice(1,result?.data?.items?.length),2)); //Banner'ı Listeden Çıkart ve 2'şerli dizilere ayır
             }else{
               setArticles(createSplitArrayByNumber(result?.data?.items,2)); 
             }
            getAritcleApiResult(result.data.totalCount)
            setSearchCountResult(result.data.totalCount)
            setPagination({...pagination,
              current:result.data.pageIndex,
              totalPage:result.data.totalPages,
             })
          }
        });
      };

  const getAritcleApiResult = (totalCount) => { 
    for (const key in articleFilterStore) {
      if(initialStates.articleFilter[key] != articleFilterStore[key]){
     let type = "";
     let name ="";
     switch (key) {
      case "tagId": 
      type ="ETİKET";
      name = tags?.find(x=>x.id==articleFilterStore[key])?.tagName;break;
      case "categoryId": 
      type = "KATEGORİ";
      name = categories?.find(x=>x.id==articleFilterStore[key])?.categoryName;break
      case "search":
       type = "ARAMA";
       name = articleFilterStore[key]; break
     }
     setFilterResult({filterType:type,filterName:name,totalCount:totalCount})
     return;
  }}
setFilterResult(initialStates.filterResult)
}

   const checkFilterStatus = () => {
      for (const key in articleFilterStore) {
      if(initialStates.articleFilter[key] != articleFilterStore[key]){
        setIsFilter(true);
        return true;
      }}
     setIsFilter(false);
     return false;
    }

   function createSplitArrayByNumber(inputArray,perChunk){

   return inputArray.reduce((resultArray, item, index) => { 
      const chunkIndex = Math.floor(index/perChunk)
      if(!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
      }
      resultArray[chunkIndex].push(item)
      return resultArray }, [])
    }

    const handleClickTag=(tagId)=>{
      filter({...initialStates.articleFilter,tagId:tagId})
    }



    const goArticleDetail = (article) => {
        const slug = slugify(`${article.title}`)
        navigate(`${slug}`)
    }

const bannerHtml = (
  <article
  id="post-328"
  className="post-standard post-standard-header post-328 post type-post status-publish format-standard has-post-thumbnail hentry category-system-administration tag-project tag-server tag-software tag-web"
>
  <div className="post-header">
    <a 
    onClick={()=>goArticleDetail(articleBanner)}
    >
       <img
        src={`${apiUrl + articleBanner?.headerImagePath}`}
        className="background"
      />
    </a>
    <a
      className="category"
      style={{ background: "#7fbb00" }}
    >
     {articleBanner?.categories[0]?.categoryName}
    </a>{" "}
  </div>
  <div className="separator-10"></div>
  <div className="inner">
    <ul className="breadcrumb">
      {articleBanner?.tags.map(x=> (
        <>
        <li key={x.id}  className="breadcrumb-item"><a 
        
        onClick={()=>handleClickTag(x.id)}
        
        >{x.tagName}</a></li>
        </>
      ))}
      <li className="breadcrumb-item">{moment(articleBanner?.publishDate).format('LL')}</li>
     </ul>
    <h2 style={{margin: "0px"}}>
    <a 
       
       onClick={()=>goArticleDetail(articleBanner)}
    >
    {articleBanner?.title}                            
    </a>
    </h2>
    <div className="excerpt">
      <p>
       {setStrLengthLimitByNumber(articleBanner?.contentText,240)} [...]
      </p>
    </div>
  </div>
</article>
)

const searchEmptyResult = <div style={{marginTop:"50px"}} className="ant-result-title">Aradığınız kriterde bir veri bulunamadı.</div>



const cardListHtml =   (    
  articles?.map((items,i) => (
  <div key={i} className="post-half-wrapper inner"> 
    <article
     style={{float:items.length < 2 && "left"}}
      id="post-52"
      className="post-standard post-standard-banner post-52 post type-post status-publish format-standard has-post-thumbnail hentry category-frontend-development category-programming-patterns tag-css tag-development tag-frontend tag-html tag-sass"
    >
      <div className="inner">
        <div className="post-banner">
            <a 
            
            onClick={()=>goArticleDetail(items[0])}
          >
            {/* <div
              className="background"
              style={{
                backgroundImage:
                `url(${apiUrl + items[0]?.headerImagePath})`
              }}
            /> */}
                <img
              className="background"
              src={`${apiUrl + items[0]?.headerImagePath}`}
            /> 
          </a>
          <a
            className="category"
            style={{ background: "#4285f4" }}
            
          >
              {items[0]?.categories[0]?.categoryName}
          </a>{" "}
        </div>
        <ul className="breadcrumb">
                      {items[0]?.tags.map(tag=> (
                        <>
                        <li key={tag.id} className="breadcrumb-item "><a 
                        
                        onClick={()=>handleClickTag(tag.id)}
                        >{tag?.tagName}</a></li>
                        </>
                      ))}
                      <li className="breadcrumb-item">{moment(items[0]?.publishDate).format('LL')}</li>
            </ul>
            <div className="separator-5"></div>
            <h2 style={{margin:"auto",fontSize:"1.5em" ,lineHeight:"1.5em"}}>
            <a 
              
              onClick={()=>goArticleDetail(items[0])}
            >
                {items[0]?.title}                            
            </a>
        </h2>
        <div className="excerpt">
          <p>
          {setStrLengthLimitByNumber(items[0]?.contentText,240)} [...]
          </p>
        </div>
      </div>
  
    </article>
    <hr />
    {items.length > 1 &&
    <article
      id="post-387"
      className="post-standard post-standard-banner post-387 post type-post status-publish format-standard has-post-thumbnail hentry category-system-administration tag-development tag-project tag-server tag-software"
    >
      <div className="inner">
        <div className="post-banner">
        <a 
            
            onClick={()=>goArticleDetail(items[1])}
          >
            {/* <div
              className="background"
              style={{
                backgroundImage:
                `url(${apiUrl + items[1]?.headerImagePath})`
              }}
            /> */}
                 <img
              className="background"
              src={`${apiUrl + items[1]?.headerImagePath}`}
            /> 
          </a>
          <a
            className="category"
            style={{ background: "#4285f4" }}
          >
              {items[1]?.categories[0].categoryName}
          </a>{" "}
        </div>
        <ul className="breadcrumb">
                      {items[1]?.tags.map(tag=> (
                        <>
                        <li key={tag.id} className="breadcrumb-item ">
                          <a 
                         onClick={()=>handleClickTag(tag.id)}
                        >{tag?.tagName}</a></li>
                        </>
                      ))}
                      <li className="breadcrumb-item">{moment(items[1]?.publishDate).format('LL')}</li>
            </ul>
            <div className="separator-5"></div>
        <h2 style={{margin:"auto",fontSize:"1.5em" ,lineHeight:"1.5em"}}>
        <a 
              onClick={()=>goArticleDetail(items[1])}
            >
                {items[1]?.title}                            
            </a>
        </h2>
        <div className="excerpt">
          <p>
          {setStrLengthLimitByNumber(items[1]?.contentText,240)} [...]
          </p>
        </div>
      </div>
    </article>
    }
    <hr />
    </div>
    )))


  return (  
   spin ? <div></div>: searchCountResult < 1 ?  searchEmptyResult:
    <section className="post-list">
         {!isFilter && bannerHtml}
              <hr /> 
         {cardListHtml}
     <nav className="pagination">
      <div className="wrapper">
        <ul className="page-numbers">
        {/* {...convertNumberToArray(pagination?.totalPage)} */}
        <li><span aria-current="page" className="page-numbers current">1</span></li>
        
         </ul>
        <a
          href="https://severn-wp.ecko.me/page/2/"
          className="button rounded light previous"
        >
          {/* <span className="main">Older Posts</span> */}
          {/* <span className="sub">
            <i className="fa fa-chevron-right" />
          </span> */}
        </a>{" "}
         </div>
       </nav>
    </section>
  )
}
const mapDispatchToProps = {setFilterResult,filter}
const mapStateToProps = (state) => { 
  return{
    articleFilterStore: state.changeArticleFilterReducer,
    categories: state.categoryListReducer,
    tags: state.tagListReducer,
  }};

export default connect(mapStateToProps,mapDispatchToProps)(ArticleList)

