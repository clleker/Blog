import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import React,{useEffect,useState} from "react";
import { apiUrl } from "../../helper/constant/api-constant";
import {connect} from "react-redux";
import initialStates from "../../redux/initialStates";
import {filter} from '../../redux/actions/articleFilterAction'

 function Profile(props) {
  const {socialMedia,profile,filter} = props;

  const navigate = useNavigate();

  const goHome = () => {
    navigate(`/`)
    filter(initialStates.articleFilter)
  }


  return (
    <section className="author-profile">
      <div
        onClick={()=> goHome()}
        className="info"
        itemProp="author"
        itemScope=""
        itemType="http://schema.org/Person"
      >
        <a
          className="profile gravatar"
        >
          <img
            src={apiUrl+profile.imagePath}
            itemProp="image"
            alt={profile.fullName}
            data-no-retina="true"
          />
        </a>
        <div className="meta">
          <span className="title">Author</span>
          <a
          className="twittertag"
          rel="noreferrer"
          >
           {profile.title}
          </a>{" "}
          <h3 itemProp="name">
            <a
             itemProp="url"
              rel="author"
            >
             {profile.fullName}
            </a>
          </h3>
        </div>
      </div>
      <hr />
      <p>
        {profile.description}
      </p>
      <ul className="authorsocial">
      {
            socialMedia?.map(x=>
              <li key={x.id}>
              <a
                href={x.link}
                target="_blank"
                title={x.title}
                className={`socialminimal ${x.className}`}
              >
                <FontAwesomeIcon icon={x.icon} />
              </a>
            </li>
            )
          }
      </ul>
    </section>
  );
}
const mapDispatchToProps = {filter}
const mapStateToProps = (state) => { 
  return{
    socialMedia: state.socialMediaListReducer,
    profile: state.profileReducer,
  }};

export default connect(mapStateToProps,mapDispatchToProps)(Profile)




