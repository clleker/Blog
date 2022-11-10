using BlogSite.Abstract;
using System.Collections.Generic;

namespace BlogSite.Concrete
{
    public class Tag : IEntity, ISoftDelete
    {
        public int Id { get; set; }
        public string TagName { get; set; }

        public bool IsDeleted { get; set; }
        //Relations
        public List<ArticleTag> ArticleTags { get; set; }

    }
}
