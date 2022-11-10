using BlogSite.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace BlogSite.Concrete
{
   public class Subscribe:IEntity,ISoftDelete
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public bool IsDeleted { get; set; }
    }
}
