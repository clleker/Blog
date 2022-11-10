using AutoMapper;
using BlogSite.Concrete;
using BlogSite.Dto.TagDtos;
using BlogSite.Dto.UserDtos;

namespace BlogSite.Mapping
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<ProfileAdminRequestDto, User>();
        }
    }
}
