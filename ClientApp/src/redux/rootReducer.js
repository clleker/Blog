
import { combineReducers } from 'redux'
import { authReducer }  from './reducers/authReducer'; 
import { changeArticleFilterReducer }  from './reducers/filter/changeArticleFilterReducer'; 
import { categoryListReducer }  from './reducers/category/categoryListReducer'; 
import { tagListReducer }  from './reducers/tag/tagListReducer'; 
import { socialMediaListReducer }  from './reducers/social-media/socialMediaListReducer'; 
import { profileReducer }  from './reducers/profile/profileReducer'; 
import { setFilterResultReducer }  from './reducers/filter/setFilterResultReducer'; 

const rootReducer = combineReducers({
    authReducer,
    changeArticleFilterReducer,
    categoryListReducer,
    tagListReducer,
    socialMediaListReducer,
    profileReducer,
    setFilterResultReducer
})


export default rootReducer;