using AutoMapper;
using BlogSite.Concrete;
using BlogSite.Dto.SocialMediaDtos;

namespace BlogSite.Mapping
{
    public class SocialMediaProfile : Profile
    {
        public SocialMediaProfile()
        {
            CreateMap<SocialMediaAddOrUpdateRequestDto, SocialMedia>();
        }
    }
}
