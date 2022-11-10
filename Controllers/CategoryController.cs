using AutoMapper;
using BlogSite.Concrete;
using BlogSite.Dto.CategoryDtos;
using BlogSite.ObjectDesign;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogSite.Controllers
{
    public class CategoryController : ApiBaseController
    {
        private readonly IValidator<Category> _validator;
        private readonly IMapper _mapper;

        public CategoryController(
            IValidator<Category> validator,
            IMapper mapper)
        {
            _validator = validator;
            _mapper = mapper;
        }

        [HttpGet("getListForWeb"), AllowAnonymous]
        public async Task<ServiceResponse<List<CategoryListResponseDto>>> GetListForWeb()
        {
            using BlogContext db = new BlogContext();

            var result = await db.Categories
                 .Include(x => x.ArticleCategories)
                 .ThenInclude(x => x.Article)
                 .Where(x => !x.IsDeleted && x.ArticleCategories.Any(y => !y.Article.IsDeleted))
                 .Select(x => new CategoryListResponseDto
                 {
                     Id = x.Id,
                     CategoryName = x.CategoryName,
                     Description = x.Description,
                     ColorHex = x.ColorHex,
                     ArticleCount = x.ArticleCategories.Count()

                 }).AsNoTracking().ToListAsync();

            return new ServiceResponse<List<CategoryListResponseDto>>(result);
        }


        [HttpGet("getListForAdmin")]
        public async Task<ServiceResponse<List<CategoryListResponseDto>>> GetListForAdmin()
        {
            using BlogContext db = new BlogContext();

            var result = await db.Categories
                .Include(x => x.ArticleCategories)
                .ThenInclude(x => x.Article)
                .Where(x => !x.IsDeleted)
                .Select(x => new CategoryListResponseDto
                {
                    Id = x.Id,
                    CategoryName = x.CategoryName,
                    Description = x.Description,
                    ColorHex = x.ColorHex,
                    ArticleCount = x.ArticleCategories.Count()
                }).AsNoTracking().ToListAsync();

            return new ServiceResponse<List<CategoryListResponseDto>>(result);
        }

        [HttpPost("addCategory"), AllowAnonymous]
        public ServiceResponse Add(CategoryAddOrUpdateRequestDto request)
        {
            using BlogContext db = new BlogContext();

            var category = _mapper.Map<Category>(request);

            var validationResult = _validator.Validate(category);

            if (!validationResult.IsValid)
            {
                return new ServiceResponse(string.Join(",", validationResult.Errors), false);
            }
            // Service
            category.CategoryName = category.CategoryName.Trim();
            category.Description = category.Description?.Trim();
            category.ColorHex = category.ColorHex.Trim();

            //DB
            db.Categories.Add(category);
            db.SaveChanges();

            return new ServiceResponse("Kategori Eklendi");

        }

        [HttpPost("updateCategory")]
        public ServiceResponse Update(CategoryAddOrUpdateRequestDto request)
        {
            var category = _mapper.Map<Category>(request);

            var validationResult = _validator.Validate(category);

            if (!validationResult.IsValid)
            {
                return new ServiceResponse(string.Join(",", validationResult.Errors), false);
            }

            using BlogContext db = new BlogContext();

            var dbCategory = db.Categories.FirstOrDefault(x => x.Id == request.Id);

            if (dbCategory == null)
            {
                return new ServiceResponse("Bad Request --> Böyle bir kayıt bulunmuyor", false);
            }
            // Service
            dbCategory.CategoryName = category.CategoryName.Trim();
            dbCategory.Description = category.Description?.Trim();
            dbCategory.ColorHex = category.ColorHex.Trim();

            db.SaveChanges();
            return new ServiceResponse("Kayıt Güncellendi");
        }

        [HttpDelete("deleteCategory/{id}")]
        public ServiceResponse Delete(int id)
        {
            using BlogContext db = new BlogContext();

            var result = db.Categories.FirstOrDefault(x => x.Id == id);

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
