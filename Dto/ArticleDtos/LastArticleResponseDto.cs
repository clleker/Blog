using System;
using System.Collections.Generic;
using System.Text;

namespace BlogSite.Dto.ArticleDtos
{
    public class LastArticleResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string SlugTitle { get; set; }
        public string ContentText { get; set; }
        public DateTime PublishDate { get; set; }
        public string SmallImagePath { get; set; }
    }
}
