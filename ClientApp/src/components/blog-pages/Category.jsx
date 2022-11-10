import React from "react";
import {connect} from "react-redux";
import {filter} from '../../redux/actions/articleFilterAction'

import initialStates from "../../redux/initialStates";

 function Category(props) {

   const {categories,filter} = props;

   const submit = (category) => {
    filter({...initialStates.articleFilter,categoryId:category.id})
   }

  return (
       <section className="widget widget_archive">
                <h3 className="widget-title">Kategoriler</h3>
                <hr />
                <ul>
                {
            categories?.map(category=>
                <li key={category.id}>
                <a 
                onClick={()=>submit(category)}
                >{category.categoryName} ({category.articleCount})</a>
                 </li>
                   )}
                </ul>
              </section>
  )
}
const mapDispatchToProps = {
  filter
}
const mapStateToProps = (state) => ({ 
    categories: state.categoryListReducer,
    articleFilter: state.changeArticleFilterReducer
  });

export default connect(mapStateToProps,mapDispatchToProps)(Category)