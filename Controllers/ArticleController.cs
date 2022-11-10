using AutoMapper;
using BlogSite.Concrete;
using BlogSite.Dto.ArticleDtos;
using BlogSite.Dto.CategoryDtos;
using BlogSite.Dto.TagDtos;
using BlogSite.ObjectDesign;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BlogSite.Controllers
{
    public class ArticleController : ApiBaseController
    {
        private readonly IValidator<Article> _validator;
        private readonly IMapper _mapper;

        public ArticleController(
            IValidator<Article> validator,
            IMapper mapper)
        {
            _validator = validator;
            _mapper = mapper;
        }

        [HttpPost("getList")] 
        public async Task<ServiceResponse<PaginatedList<ArticleListResponseDto>>> GetListForAdmin (ArticleAdminRequestFilterDto filter)
        {
            using BlogContext db = new BlogContext();

            var query = db.Articles
                .Include(x => x.ArticleCategories).ThenInclude(x => x.Category)
                .Include(x => x.ArticleTags).ThenInclude(x => x.Tag)
                .Where(x => !x.IsDeleted
                && string.IsNullOrWhiteSpace(filter.ArticleTitle) || x.Title.Contains(filter.ArticleTitle)
                && filter.CategoryId == null || x.ArticleCategories.Any(x => x.Category.Id == filter.CategoryId)
                && filter.TagId == null || x.ArticleTags.Any(x => x.Tag.Id == filter.TagId)
                && filter.PublishDate == null || x.PublishDate >= filter.PublishDate).AsQueryable();

            var dto = query.Select(x => new ArticleListResponseDto
            {
                Id = x.Id,
                Title = x.Title,
                ContentText = x.ContentText,
                PublishDate = x.PublishDate,
                IsBanner = x.IsBanner,
                HeaderImagePath =x.HeaderImagePath,
                LikeNumber = x.LikeNumber,
                Categories = x.ArticleCategories
                      .Select(y => new CategoryAdminResponseForArticleList { Id = y.Category.Id, CategoryName = y.Category.CategoryName }),
                Tags = x.ArticleTags.Select(y => new TagListResponseDto { Id = y.Tag.Id, TagName = y.Tag.TagName }),
            });

            if (filter.IsOrderBy)
            {
                query = query.OrderByDescending(a => a.GetType().GetProperty(filter.ColumnNameForOrder).GetValue(a, null));
            }

            var result = await PaginatedList<ArticleListResponseDto>.CreateAsync(dto.AsNoTracking(), filter.PageNumber, filter.PageSize).ConfigureAwait(false);

            return new ServiceResponse<PaginatedList<ArticleListResponseDto>>(result);
        }

        [HttpGet("{slug}"),AllowAnonymous]
        public async Task<ServiceResponse<ArticleDetailResponseDto>> GetArticleDetailForWeb(string slug)
        {
            using BlogContext db = new BlogContext();

            var result = await db.Articles
                .Include(x => x.ArticleCategories).ThenInclude(x => x.Category)
                .Include(x => x.ArticleTags).ThenInclude(x => x.Tag)
                .Where(x => x.SlugTitle == slug && !x.IsDeleted).Select(x => new ArticleDetailResponseDto
                {
                    Id = x.Id,
                    Title = x.Title,        
                    SlugTitle = x.SlugTitle,
                    ContentHtml = x.ContentHtml,
                    PublishDate = x.PublishDate,    
                    IsBanner = x.IsBanner,
                    HeaderImagePath = x.HeaderImagePath,
                    LikeNumber = x.LikeNumber,
                    Categories = x.ArticleCategories
                      .Select(y => new CategoryAdminResponseForArticleList { Id = y.Category.Id, CategoryName = y.Category.CategoryName,ColorHex = y.Category.ColorHex }),
                    Tags = x.ArticleTags.Select(y => new TagListResponseDto { Id = y.Tag.Id, TagName = y.Tag.TagName }),
                }).AsNoTracking().FirstOrDefaultAsync();

            return new ServiceResponse<ArticleDetailResponseDto>(result);
        }

        [HttpGet("getLastArticles"), AllowAnonymous]
        public async Task<ServiceResponse<List<LastArticleResponseDto>>> GetLastArticles()
        {
            using BlogContext db = new BlogContext();

            var result = await db.Articles
                .Include(x => x.ArticleCategories).ThenInclude(x => x.Category)
                .Include(x => x.ArticleTags).ThenInclude(x => x.Tag)
                .Where(x => !x.IsDeleted)
                .OrderByDescending(x => x.PublishDate)
                .Take(4)
                .Select(x => new LastArticleResponseDto
                {
                    Id = x.Id,
                    Title = x.Title,
                    SlugTitle = x.SlugTitle,
                    PublishDate = x.PublishDate,
                    SmallImagePath = x.SmallImagePath,
                }).AsNoTracking().ToListAsync();


            return new ServiceResponse<List<LastArticleResponseDto>>(result);
        }



        [HttpGet("getListForWeb"),AllowAnonymous]
        public async Task<ServiceResponse<PaginatedList<ArticleListResponseDto>>> GetListForWeb([FromQuery]ArticleWebRequestFilterDto filter)
        {
            using BlogContext db = new BlogContext();

            var strTrim = filter.Search?.Trim();

            var query = db.Articles
                .Include(x => x.ArticleCategories).ThenInclude(x => x.Category)
                .Include(x => x.ArticleTags).ThenInclude(x => x.Tag)
                .Where(x => !x.IsDeleted
                && (string.IsNullOrWhiteSpace(strTrim) 
                || x.Title.Contains(strTrim) 
                || x.ContentText.Contains(strTrim)
                || x.ArticleCategories.Any(y => y.Category.CategoryName.Contains(strTrim))
                || x.ArticleTags.Any(y => y.Tag.TagName.Contains(strTrim)))
                //|| x.PublishDate.ToShortDateString().Contains(strTrim)    
                && (filter.CategoryId == 0 || x.ArticleCategories.Any(y => y.Category.Id == filter.CategoryId))
                && (filter.TagId == 0 ||  x.ArticleTags.Any(y => y.Tag.Id == filter.TagId)))
                .OrderByDescending(x => x.IsBanner).ThenByDescending(x=> x.PublishDate)
                .AsQueryable();

            var dto = query.Select(x => new ArticleListResponseDto
            {
                Id = x.Id,
                Title = x.Title,
                ContentText = x.ContentText,
                PublishDate = x.PublishDate,
                IsBanner = x.IsBanner,
                HeaderImagePath = x.HeaderImagePath,
                LikeNumber = x.LikeNumber,
                Categories = x.ArticleCategories
                      .Select(y => new CategoryAdminResponseForArticleList { Id = y.Category.Id, CategoryName = y.Category.CategoryName }).ToList(),
                Tags = x.ArticleTags.Select(y => new TagListResponseDto { Id = y.Tag.Id, TagName = y.Tag.TagName }).ToList(),
            });



             var result = await PaginatedList<ArticleListResponseDto>.CreateAsync(dto.AsNoTracking(), filter.PageNumber, filter.PageSize).ConfigureAwait(false);

                    return new ServiceResponse<PaginatedList<ArticleListResponseDto>>(result);
        }




        [HttpGet("getArticleById/{articleId}")]
        public async Task<ServiceResponse<ArticleForUpdateAdminResponse>> GetById(int articleId)
        {
            using BlogContext db = new BlogContext();

            var result = await db.Articles
                .Include(x => x.ArticleCategories).ThenInclude(x => x.Category)
                .Include(x => x.ArticleTags).ThenInclude(x => x.Tag)
                .Where(x => !x.IsDeleted && x.Id == articleId)
                .Select(x => new ArticleForUpdateAdminResponse
                {
                    Id = x.Id,
                    Title = x.Title,
                    SlugTitle = x.SlugTitle,
                    PublishDate = x.PublishDate,
                    HeaderImagePath = x.HeaderImagePath,
                    CategoryIds = x.ArticleCategories.Select(y=>y.CategoryId),
                    TagIds = x.ArticleTags.Select(y => y.TagId),
                    ContentHtml = x.ContentHtml,
                }).AsNoTracking().FirstOrDefaultAsync();


            return new ServiceResponse<ArticleForUpdateAdminResponse>(result);
        }

        [HttpPost("addArticle")]
        public ServiceResponse AddArticle([FromForm] ArticleAddOrUpdateRequestDto request)
        {
            var article = _mapper.Map<Article>(request);

            var validationResult = _validator.Validate(article);

            if (!validationResult.IsValid)
            {
                return new ServiceResponse(string.Join(",", validationResult.Errors), false);
            }
            using BlogContext db = new BlogContext();

            #region Add Banner Image 
            string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");

            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);

            using var fileStream = new FileStream(Path.Combine(path, request.BannerImage.FileName), FileMode.Create, FileAccess.ReadWrite, FileShare.Read);
            
                request.BannerImage.CopyTo(fileStream);
                article.HeaderImagePath = $@"images/{request.BannerImage.FileName}";

            #endregion

            article.Title = article.Title.Trim();
            //DB
            db.Articles.Add(article);

            db.SaveChanges();

            return new ServiceResponse("Makale Eklendi");
        }

        [HttpPost("updateArticle")]
        public ServiceResponse Update([FromForm] ArticleAddOrUpdateRequestDto request)
        {
            var article = _mapper.Map<Article>(request);

            var validationResult = _validator.Validate(article);

            if (!validationResult.IsValid)
            {
                return new ServiceResponse(string.Join(",", validationResult.Errors), false);
            }

            using BlogContext db = new BlogContext();

            var dbArticle = db.Articles
                .Include(x => x.ArticleCategories).ThenInclude(x => x.Category)
                .Include(x => x.ArticleTags).ThenInclude(x => x.Tag)
                .FirstOrDefault(x => x.Id == article.Id);

            if (dbArticle == null)
            {
                return new ServiceResponse("Bad Request --> Böyle bir kayıt bulunmuyor", false);
            }

            dbArticle.Title = article.Title.Trim();
            dbArticle.SlugTitle = article.SlugTitle.Trim();
            dbArticle.ContentHtml = article.ContentHtml.Trim();
            dbArticle.ContentText = article.ContentText.Trim();
            dbArticle.PublishDate = article.PublishDate;
            dbArticle.ArticleCategories = article.ArticleCategories;
            dbArticle.ArticleTags = article.ArticleTags;

            if (request.BannerImage != null)
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");

                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);

                using var fileStream = new FileStream(Path.Combine(path, request.BannerImage.FileName), FileMode.Create, FileAccess.ReadWrite, FileShare.Read);

                request.BannerImage.CopyTo(fileStream);
                dbArticle.HeaderImagePath = $@"images/{request.BannerImage.FileName}";
            }

            db.SaveChanges();
            return new ServiceResponse("Makale Güncellendi");
        }

        [HttpPost("updateBannerArticle")]
        public ServiceResponse SetBannerArticle([FromBody]int id)
        {
            using BlogContext db = new BlogContext();
            var dbArticle = db.Articles.FirstOrDefault(x => x.Id == id);

            if (dbArticle == null)
            {
                return new ServiceResponse("Bad Request --> Böyle bir kayıt bulunmuyor");
            }

            var bannerArticle = db.Articles.FirstOrDefault(x => x.IsBanner);
            bannerArticle.IsBanner = false;
            dbArticle.IsBanner = true;

            db.SaveChanges();
            return new ServiceResponse("Banner Ayarlandı");
        }

        [HttpDelete("deleteArticle/{id}")]
        public ServiceResponse Delete(int id)
        {
            using BlogContext db = new BlogContext();

            var result = db.Articles.FirstOrDefault(x => x.Id == id);

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
