using AutoMapper;
using BlogSite.Concrete;
using BlogSite.Dto.CategoryDtos;


namespace BlogSite.Mapping
{
    public class CategoryProfile : Profile
    {
        public CategoryProfile()
        {
            CreateMap<CategoryAddOrUpdateRequestDto, Category>();
        }
    }
}
