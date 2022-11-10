using AutoMapper;
using BlogSite.Concrete;
using BlogSite.Dto.ArticleDtos;
using System.Collections.Generic;
using System.Linq;

namespace BlogSite.Mapping
{
    public class ArticleProfile : Profile
    {
        public ArticleProfile()
        {
            CreateMap<ArticleAddOrUpdateRequestDto, Article>()
                .ForMember(dest => dest.ArticleCategories, x => x.MapFrom(y =>
                y.CategoryIds.Select(id => new ArticleCategory { CategoryId = id })))
                .ForMember(dest => dest.ArticleTags, x => x.MapFrom(y =>
                         y.TagIds.Select(id => new ArticleTag { TagId = id })));
        }
    }
}
