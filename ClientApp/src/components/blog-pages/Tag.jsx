import React from "react";
import {connect} from "react-redux";
import {filter} from '../../redux/actions/articleFilterAction'
import initialStates from "../../redux/initialStates";

 function Tag(props) {

   const {tags,filter} = props;

   const submit = (tag) => {
   filter({...initialStates.articleFilter,tagId:tag.id})
  }


  return (
    <>
      <section className="widget widget_tag_cloud">
        <h3 className="widget-title">Etiketler</h3>
        <hr />
        <div className="tagcloud">
          {
            tags?.map(tag=>
              <a
              key={tag.id}
              onClick={()=>submit(tag)}
              className="tag-cloud-link tag-link-7 tag-link-position-1"
              style={{ fontSize: "8pt" }}
              aria-label={`${tag.tagName} (1 item)`}
            >
              {tag.tagName}
            </a>
            )
          }
        </div>
      </section>
    </>
  );
}

const mapDispatchToProps = {filter}
const mapStateToProps = (state) => (
  { tags: state.tagListReducer,
    articleFilter: state.changeArticleFilterReducer
  });

export default connect(mapStateToProps,mapDispatchToProps)(Tag)
