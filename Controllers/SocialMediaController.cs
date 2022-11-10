﻿using AutoMapper;
using BlogSite.Concrete;
using BlogSite.Dto.SocialMediaDtos;
using BlogSite.ObjectDesign;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;


namespace BlogSite.Controllers
{
 
    public class SocialMediaController : ApiBaseController
    {

        private readonly IValidator<SocialMedia> _validator;
        private readonly IMapper _mapper;
        BlogContext db = new BlogContext();

        public SocialMediaController(
            IValidator<SocialMedia> validator,
            IMapper mapper)
        {
            _validator = validator;
            _mapper = mapper;
        }


        [HttpGet("getList"), AllowAnonymous]
        public ServiceResponse<IList<SocialMediaListResponseDto>> GetList()
        {
            using BlogContext db = new BlogContext();

            var result = db.SocialMedia
                .Where(x => !x.IsDeleted)
                .Select(x => new SocialMediaListResponseDto
            {
                Id = x.Id,
                Link = x.Link,
                Icon = x.Icon,
                Title = x.Title,
                ClassName = x.ClassName
            }).AsNoTracking().ToList();

            return new ServiceResponse<IList<SocialMediaListResponseDto>>(result);
        }

        [HttpPost("addSocialMedia")]
        public ServiceResponse AddSocial(SocialMediaAddOrUpdateRequestDto request)
        {

            var socialMedia = _mapper.Map<SocialMedia>(request);

            var validationResult = _validator.Validate(socialMedia);

            if (!validationResult.IsValid)
            {
                return new ServiceResponse(string.Join(",", validationResult.Errors), false);
            }

            socialMedia.Link = socialMedia.Link.Trim();
            socialMedia.Title = socialMedia.Title.Trim();
            socialMedia.Icon = socialMedia.Icon.Trim();

            db.SocialMedia.Add(socialMedia);
            db.SaveChanges();
            // Service
           
            //DB
            db.SaveChanges();

            return new ServiceResponse("SocialMedia Eklendi");
        }

        [HttpPost("updateSocialMedia")]
        public ServiceResponse UpdateSocial(SocialMediaAddOrUpdateRequestDto request)
        {
            var socialMedia = _mapper.Map<SocialMedia>(request);

            var validationResult = _validator.Validate(socialMedia);

            if (!validationResult.IsValid)
            {
                return new ServiceResponse(string.Join(",", validationResult.Errors), false);
            }

            var result = db.SocialMedia.FirstOrDefault(x => x.Id == request.Id);

            if (result == null)
            {
                return new ServiceResponse("Bad Request --> Böyle bir kayıt bulunmuyor", false);
            }

            result.Link = socialMedia.Link.Trim();
            result.Title = socialMedia.Title.Trim();
            result.Icon = socialMedia.Icon.Trim();
            result.ClassName = socialMedia.ClassName.Trim();

            db.SaveChanges();
            return new ServiceResponse("Kayıt Güncellendi");
        }

        [HttpDelete("deleteSocialMedia/{id}")]
        public ServiceResponse Delete(int id)
        {
            var result = db.SocialMedia.FirstOrDefault(x => x.Id == id);

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
