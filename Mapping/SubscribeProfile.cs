using AutoMapper;
using BlogSite.Concrete;
using BlogSite.Dto.SubscribeDtos;

namespace BlogSite.Mapping
{
    public class SubscribeProfile : Profile
    {
        public SubscribeProfile()
        {
            CreateMap<SubscribeAddOrUpdateRequestDto, Subscribe>();
        }
    }
}
