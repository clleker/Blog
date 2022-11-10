using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Text;

namespace BlogSite.Dto.ArticleDtos
{
    public class ArticleAddOrUpdateRequestDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string SlugTitle { get; set; }
        public string ContentText { get; set; }
        public string ContentHtml { get; set; }
        public DateTime PublishDate { get; set; }
        public IFormFile BannerImage { get; set; }
        public int[] TagIds { get; set; }
        public int[] CategoryIds { get; set; }
    }
}
