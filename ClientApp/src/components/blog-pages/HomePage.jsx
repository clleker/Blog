import Footer from "./Footer";
import NavbarResponsive from "./NavbarResponsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Profile from "./Profile";
import SearchBar from "./SearchBar";
import SidebarSocialMedia from "./SidebarSocialMedia";
import LatestArticles from "./LatestArticles";
import Subscribe from "./Subscribe";
import Tag from "./Tag";
import "../../style/ScrollToTop.css"
import React,{useState,useEffect} from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Category from "./Category";
import {getCategories} from '../../redux/actions/categoryAction'
import {getTags} from '../../redux/actions/tagAction'
import {getSocialMedia} from '../../redux/actions/socialMediaAction'
import {getProfile} from '../../redux/actions/profileAction'
import {connect} from 'react-redux';
import { BackTop } from "antd";

 function HomePage(props) {
  const navigate = useNavigate();
  const {getCategories,getTags,getSocialMedia,getProfile,articleFilter} = props;
  
  useEffect(() => {
    getCategories();
    getTags();
    getSocialMedia();
    getProfile();
  }, []); 

  const [searchText,setSearchText] = useState("")
  const [scrollBtnHidden,setScrollBtnHidden] = useState(true)

  useEffect(() => {
    setSearchText("")
    navigate("/")
  }, [articleFilter]); 

  const handleSearchText = (e) => {
    setSearchText(e.target.value)
  };

  const searchBar = (
    <SearchBar searchText={searchText} handleSearchText={handleSearchText} />
  );

  return (
    <>
      <main className="page-wrapper">
        <aside className="sidebar sidebar-left">
          <div className="sidebar-fixed">
            <Profile />
            <section className="widget">{searchBar}</section>
            <Tag />
            <Category/>
          </div>
        </aside>
        <section className="page-body ">
          <section className="page-content">
            <section className="nav-responsive">
              <NavbarResponsive />
              <hr className="separator-10" />
              {searchBar}
            </section>
            {/* #PAGE-CONTENT */}
            <Outlet/>
    
       </section>
        
          <aside className="sidebar sidebar-right">
            <div className="sidebarright-fixed">
              <LatestArticles/>
              <Subscribe />
              <SidebarSocialMedia />{" "}
              {/* <section className="widget widget_archive">
                <h3 className="widget-title">Archives</h3>
                <hr />
                <ul>
                  <li>
                    <a href="https://severn-wp.ecko.me/2015/05/">May 2015</a>
                  </li>
                  <li>
                    <a href="https://severn-wp.ecko.me/2015/04/">April 2015</a>
                  </li>
                  <li>
                    <a href="https://severn-wp.ecko.me/2015/03/">March 2015</a>
                  </li>
                  <li>
                    <a href="https://severn-wp.ecko.me/2015/02/">
                      February 2015
                    </a>
                  </li>
                  <li>
                    <a href="https://severn-wp.ecko.me/2015/01/">
                      January 2015
                    </a>
                  </li>
                </ul>
              </section> */}
            </div>
          </aside>
        </section>
        {/* #PAGE-BODY */}
      </main>
      {/* #PAGE-WRAPPER */}
          <BackTop style={{zIndex:1000}}>
          <FontAwesomeIcon
          id="scrollTopBtn"
          className={`fa fa-chevron-circle-right`}
          icon={"fa fa-chevron-circle-up"}
                  />
          </BackTop>

      <Footer />
    </>
  );

}

const mapDispatchToProps = {
  getCategories,
  getTags,
  getSocialMedia,
  getProfile
}
const mapStateToProps = (state) => ({
  articleFilter: state.changeArticleFilterReducer,
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)




