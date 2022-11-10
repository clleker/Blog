export default {
 token : localStorage.getItem("token"),
 categories :[],
 tags:[],
 socialMedia:[],
 profile:{},
 articleFilter: {orderByAsc: false,categoryId:0,tagId:0,search:"",pageSize:10,pageNumber:1},
 filterResult: {totalCount:0 ,filterName:"",filterType:""},
}
