using BlogSite.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace BlogSite.Dto.ArticleDtos
{
    public class ArticleWebRequestFilterDto : PaginationParams
    {
        public int TagId { get; set; }
        public int CategoryId { get; set; }
        public string Search { get; set; }
        public bool OrderByAsc { get; set; }
    }
}
