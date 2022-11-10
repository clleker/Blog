using System;
using System.Collections.Generic;
using System.Text;

namespace BlogSite.Dto.CategoryDtos
{
   public class CategoryListResponseDto
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }
        public string Description { get; set; }
        public string ColorHex { get; set; }
        public int ArticleCount { get; set; }
    }
}
