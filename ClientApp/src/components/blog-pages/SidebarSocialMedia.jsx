import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React,{useEffect,useState} from "react";
import {connect} from "react-redux";

  function SidebarSocialMedia(props) {
    const {socialMedia} = props;


  return (
    <>
      <section className="widget social">
        <nav className="social">
          <ul>
          {
            socialMedia?.map(x=>
              <li key={x.id}> 
              <a
                href={x.link}
                target="_blank"
                title={x.title}
                className={`socialdark ${x.className}`}
              >
                <FontAwesomeIcon icon={x.icon} />
              </a>
            </li>
            )
          }
         
          </ul>
        </nav>
      </section>
    </>
  );
}

const mapStateToProps = (state) => { 
  return{
    socialMedia: state.socialMediaListReducer,
  }};

export default connect(mapStateToProps)(SidebarSocialMedia)
