import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";
import "../../style/SearchBar.css";
import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import {filter} from '../../redux/actions/articleFilterAction'
import { connect } from "react-redux";
import initialStates from "../../redux/initialStates";

 function SearchBar(props) {
  const {filter,filterResult} = props;

  const navigate = useNavigate();

  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  const submit = () => {
    // if(navigate.arguments)
   filter({...initialStates.articleFilter,search:props.searchText?.trim()})
  }

 const handleResetSearch=()=> {
    filter(initialStates.articleFilter)
  }


  return (
    <>
      <div
        className="searchform"
      >
        <input
          type="text"
          name="s"
          value={props.searchText}
          className={isMobile ? "query-mobile" : "query"}
          onChange={props.handleSearchText}
          placeholder="Ara..."
        />
        <FontAwesomeIcon
          className={`fa ${isMobile ? "fa-search-mobile" : "fa-search"}`}
          icon={"fa fa-search"}
        />
        <FontAwesomeIcon
          className={`fa fa-chevron-circle-right ${isMobile ? "submit-mobile" : "submit"}`}
          onClick={()=>submit()}
          icon={"fa fa-chevron-circle-right"}
        />
      </div>
      {filterResult.filterType &&
 <div   style={{borderTop:"none",fontWeight:400}} className="ant-alert ant-alert-success" role="alert">
  <span
    style={{color:"#7fbb00"}}
    role="img"
    aria-label="check-circle"
    className="anticon anticon-check-circle ant-alert-icon"
  >
    <svg
      viewBox="64 64 896 896"
      focusable="false"
      data-icon="check-circle"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" />
    </svg>
  </span>
  <div className="ant-alert-content">
    <div className="ant-alert-message">
    {`${filterResult.filterType} : ${filterResult.filterName} (${filterResult.totalCount})`}
    </div>
  </div>
  <button type="button" className="ant-alert-close-icon" onClick={handleResetSearch} tabIndex={0}>
    <span  className="anticon anticon-close">
      <svg
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="close"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
      </svg>
    </span>
  </button>
</div>
   
    }
    </> )}
const mapDispatchToProps = {filter}
const mapStateToProps = (state) => ({
    articleFilter: state.changeArticleFilterReducer,
    filterResult:state.setFilterResultReducer
  });

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
