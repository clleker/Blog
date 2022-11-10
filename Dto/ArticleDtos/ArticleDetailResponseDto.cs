using BlogSite.Dto.CategoryDtos;
using BlogSite.Dto.TagDtos;
using System;
using System.Collections.Generic;

namespace BlogSite.Dto.ArticleDtos
{
    public class ArticleDetailResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string SlugTitle { get; set; }
        public string ContentHtml { get; set; }
        public string HeaderImagePath { get; set; }
        public bool IsBanner { get; set; }
        public DateTime PublishDate { get; set; }
        public IEnumerable<TagListResponseDto> Tags { get; set; }
        public IEnumerable<CategoryAdminResponseForArticleList> Categories { get; set; }
        public int LikeNumber { get; set; }
    }
}
