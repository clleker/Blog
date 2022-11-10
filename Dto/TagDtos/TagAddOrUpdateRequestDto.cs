using System;
using System.Collections.Generic;
using System.Text;

namespace BlogSite.Dto.TagDtos
{
    public class TagAddOrUpdateRequestDto
    {
        public int Id { get; set; }
        public string TagName { get; set; }
    }
}
