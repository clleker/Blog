using AutoMapper;
using BlogSite.Concrete;
using BlogSite.Dto.SocialMediaDtos;


namespace BlogSite.Mapping
{
    public class CommentProfile : Profile
    {
        public CommentProfile()
        {
            CreateMap<SocialMediaAddOrUpdateRequestDto, Comment>();
        }
    }
}
