﻿using BlogSite.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace BlogSite.Concrete
{
    public class Article : IEntity,ISoftDelete
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string SlugTitle { get; set; }
        public string ContentText { get; set; }
        public string ContentHtml { get; set; }
        public DateTime PublishDate { get; set; }
        public bool IsBanner { get; set; }
        public int LikeNumber { get; set; }
        public string HeaderImagePath { get; set; }
        public string SmallImagePath { get; set; }

        //Relations
        public List<ArticleCategory> ArticleCategories { get; set; }
        public List<ArticleTag> ArticleTags { get; set; }
        public bool IsDeleted { get; set; }
    }
}
