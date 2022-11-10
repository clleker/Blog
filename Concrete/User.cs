using BlogSite.Abstract;
using System.Collections.Generic;

namespace BlogSite.Concrete
{
    public class User : IEntity
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }        
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImagePath { get; set; }
        public string MobilIconPath { get; set; }
        public string FooterCopyRight { get; set; }
        public string FooterDescription { get; set; }
        public string MobilDescription { get; set; }
        public List<UserRole> UserRoles { get; set; }

    }
}
