using BlogSite.Concrete;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BlogSite.Concrete
{
    public class BlogContext:DbContext
    {
        //add-migration: .Net tarafında tablo değişikliklerini kaydeder. Ama Db'ye yansıtmaz
        //update-database: add-migration ile kaydedilen değişiklikleri Db'ye aktarır.
        //remove-migration: add-migration kaydını siler.
        // remove-migration -force: hem veritabanındaki hemde .Netteki değişiklikleri siler. 
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer(@"Server=94.73.170.49; Database=u0902580_cllblog; User Id=u0902580_clleker; Password=9kLNrwM58IcpP82");
            optionsBuilder.UseSqlServer(@"Server=94.73.170.49; Database=u0902580_cllblog; User Id=u0902580_clleker; Password=9kLNrwM58IcpP82");
        }

        public DbSet<Article> Articles { get; set; }
        public DbSet<ArticleCategory> ArticleCategories { get; set; }
        public DbSet<ArticleTag> ArticleTags { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Comment> Comment { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Subscribe> Subscribers { get; set; }
        public DbSet<SocialMedia> SocialMedia { get; set; }

    }
}
