using AutoMapper;
using BlogSite.Concrete;
using BlogSite.Dto.TagDtos;

namespace BlogSite.Mapping
{
    public class TagProfile:Profile
    {
        public TagProfile()
        {
            CreateMap<TagAddOrUpdateRequestDto, Tag>();
        }
    }
}
