using BlogSite.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace BlogSite.Concrete
{
    public class ArticleTag : IEntity
    {
        public int Id { get; set; }
        public int ArticleId { get; set; }
        public int TagId { get; set; }

        //Relations
        public Article Article { get; set; }
        public Tag Tag { get; set; }
    }
}
