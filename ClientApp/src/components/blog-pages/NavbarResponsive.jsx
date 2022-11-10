import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React,{ useState,useEffect } from "react";
import "../../style/Navbar.css";
import {Select,Col,Row} from "antd";
import {connect} from "react-redux";
import { apiUrl } from "../../helper/constant/api-constant";
import { useNavigate } from 'react-router-dom';
import {filter} from '../../redux/actions/articleFilterAction'
import initialStates from "../../redux/initialStates";

const Option = Select;

  function NavbarResponsive(props) {
   const navigate = useNavigate();
   const {tags,categories,socialMedia,profile,filter,articleFilter} = props;
   const [toggleNav, setToggleNav] = useState(false);

   const onChangeCategory = (_categoryId) => {
     filter({...initialStates.articleFilter,categoryId:_categoryId})
    }   

    const onChangeTag = (_tagId) => {
     filter({...initialStates.articleFilter,tagId:_tagId})
   }

   useEffect(() => {
    setToggleNav(false)
  }, [articleFilter]); 


  const toggleNavbar = () => {
    setToggleNav(!toggleNav);
  };

  return (
    <>
      <div className="upper">
        <Row>
        <Col   style={{margin:"auto"}} sm={20} xs={22}>
          <td style={{verticalAlign:"middle"}}>
        <a 
         onClick={()=>navigate("/")}
         className="logo">
          <img
            src={apiUrl+profile.mobilIconPath}
            itemProp="image"
            alt={profile.fullName}
            data-no-retina="true"
            width={0}
            height={0}
          />
        </a>
        </td>
        <td style={{verticalAlign:"middle",textAlign:"center"}}>{profile.mobilDescription}</td>
        </Col>
        <Col sm={4} xs={2} style={{margin:"auto"}}><FontAwesomeIcon
          className="show-nav"
          icon={"fa fa-navicon"}
          onClick={toggleNavbar}
        />
            </Col>
            </Row>
      </div>
      {/* <div className={`lower ${toggleNav ? "lower-slideUp":"lower-slideDown"}`}> */}
      {toggleNav && (
        <div className="lower">
          <nav>
            <ul id="menu-main-1" className="menu">
          
              <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-634">
                <a href="#">KATEGORİLER</a>
                <ul className="sub-menu">
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-723">
                  <Col md={12} sm={16} xs={20} style={{margin:"auto"}}>
                  <Select
                      size={"large"}
                      style={{width:"100%"}}
                      showSearch
                      placeholder="KATEGORİLER"
                      optionFilterProp="children"
                      onChange={onChangeCategory}
                      // onSearch={onSearch}
                      filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    >
                      {categories?.map(x => (
                          <Option key={x.id} value={x.id}>{x.categoryName}</Option>
                      ))}
                    </Select>   
                    </Col>               
                    </li>
                </ul>
              </li>
              <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-628">
                <a href="#">ETİKETLER</a>
                <ul className="sub-menu">
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-629">
                  <Col md={12} sm={16} xs={20} style={{margin:"auto"}}>
                  <Select
                      size={"large"}
                      style={{width:"100%",margin:"auto"}}
                      showSearch
                      placeholder="ETİKETLER"
                      optionFilterProp="children"
                      onChange={onChangeTag}
                      // onSearch={onSearch}
                      filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    >
                      {tags?.map(x => (
                          <Option key={x.id} value={x.id}>{x.tagName}</Option>
                      ))}
                    </Select>   
                    </Col>  
                  </li>
                </ul>
              </li>
              <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-736">
                <a href="/shortcodes/"></a>
                <div className="nav-socialmedia">
                  <ul className="social">
                {
                    socialMedia.map(x=>
                      <li>
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
                </div>
              </li>
              <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-628">
                <a href="#">HAKKIMDA</a>
              </li>
            </ul>{" "}
          </nav>
        </div>
      )}
    </>
  );
}


const mapDispatchToProps = {filter}
const mapStateToProps = (state) => ({
    categories: state.categoryListReducer,
    tags: state.tagListReducer,
    socialMedia: state.socialMediaListReducer,
    profile: state.profileReducer,
    articleFilter: state.changeArticleFilterReducer
  });

export default connect(mapStateToProps,mapDispatchToProps)(NavbarResponsive)