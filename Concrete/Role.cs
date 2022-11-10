using BlogSite.Abstract;
using System.Collections.Generic;

namespace BlogSite.Concrete
{
    public class Role:IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public List<UserRole> UserRoles { get; set; }

    }
}
