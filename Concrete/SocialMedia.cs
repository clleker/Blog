using BlogSite.Abstract;
using BlogSite.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BlogSite.Concrete
{
   public class SocialMedia : IEntity,ISoftDelete
    {
        public int Id { get; set; }
        public string Link { get; set; }
        public string Icon { get; set; }
        public string Title { get; set; }
        public string ClassName { get; set; }
        public bool IsDeleted { get; set; }
    }
}
