using AutoMapper;
using BlogSite.Concrete;
using BlogSite.Dto.TagDtos;
using BlogSite.ObjectDesign;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace BlogSite.Controllers
{

    public class TagController : ApiBaseController
    {
        private readonly IValidator<Tag> _validator;
        private readonly IMapper _mapper;

        public TagController(
            IValidator<Tag> validator,
            IMapper mapper)
        {
            _validator = validator;
            _mapper = mapper;
        }



        [HttpGet("getListForWeb"),AllowAnonymous]
        public ServiceResponse<IList<TagListResponseDto>> GetListForWeb()
        {
           using BlogContext db = new BlogContext();

            var list = db.Tags
                .Include(x => x.ArticleTags)
                .ThenInclude(x => x.Article)
                .Where(x => !x.IsDeleted && x.ArticleTags.Any(y => !y.Article.IsDeleted))
                .Select(x => new TagListResponseDto
                {
                    Id = x.Id,
                    TagName = x.TagName,

                }).AsNoTracking().ToList();

            return new ServiceResponse<IList<TagListResponseDto>>(list);
        }

        [HttpGet("getListForAdmin"), AllowAnonymous]
        public ServiceResponse<IList<TagListResponseDto>> GetListForAdmin()
        {
            using BlogContext db = new BlogContext();

            var list = db.Tags
                .Include(x => x.ArticleTags)
                .ThenInclude(x => x.Article)
                .Where(x => !x.IsDeleted )
                .Select(x => new TagListResponseDto
                {
                    Id = x.Id,
                    TagName = x.TagName,

                }).AsNoTracking().ToList();

            return new ServiceResponse<IList<TagListResponseDto>>(list);
        }

        [HttpPost("addTag")]
        public ServiceResponse Add(TagAddOrUpdateRequestDto request)
        {
            var tag = _mapper.Map<Tag>(request);

            var validationResult = _validator.Validate(tag);

            if (!validationResult.IsValid)
            {
                return new ServiceResponse(string.Join(",", validationResult.Errors),false);
            }
            using BlogContext db = new BlogContext();

            // Service
            tag.TagName = tag.TagName.Trim();
            //DB
            db.Tags.Add(tag);
            db.SaveChanges();

            return new ServiceResponse("Etiket Eklendi");
        }

        [HttpPost("updateTag")]
        public ServiceResponse Update(TagAddOrUpdateRequestDto request)
        {
            var tag = _mapper.Map<Tag>(request);

            var validationResult = _validator.Validate(tag);

            if (!validationResult.IsValid)
            {
                return new ServiceResponse(string.Join(",", validationResult.Errors), false);
            }

            using BlogContext db = new BlogContext();

            var dbTag = db.Tags.FirstOrDefault(x => x.Id == request.Id);

            if (dbTag == null)
            {
                return new ServiceResponse("Bad Request --> Böyle bir kayıt bulunmuyor",false);
            }
            dbTag.TagName = tag.TagName.Trim();
            db.SaveChanges();
            return new ServiceResponse("Kayıt Güncellendi");
        }

        [HttpDelete("deleteTag/{id}")]
        public ServiceResponse Delete(int id)
        {
            using BlogContext db = new BlogContext();

            var result = db.Tags.FirstOrDefault(x => x.Id == id);

            if (result == null)
            {
                return new ServiceResponse("Bad Request --> Böyle bir kayıt bulunmuyor");
            }
            result.IsDeleted = true;
            db.SaveChanges();
            return new ServiceResponse("Kayıt Silindi");
        }
    }
}
