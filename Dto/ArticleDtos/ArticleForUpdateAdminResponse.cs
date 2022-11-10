using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace BlogSite.Dto.ArticleDtos
{
    public class ArticleForUpdateAdminResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string SlugTitle { get; set; }
        public string ContentHtml { get; set; }
        public DateTime PublishDate { get; set; }
        public string HeaderImagePath { get; set; }
        public IEnumerable TagIds { get; set; }
        public IEnumerable CategoryIds { get; set; }
    }
}
