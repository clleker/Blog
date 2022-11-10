﻿using BlogSite.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace BlogSite.Validations
{
    public class CategoryValidator : AbstractValidator<Category>
    {
        public CategoryValidator()
        {
            RuleFor(x => x.CategoryName).NotEmpty().WithMessage("Kategori İsmi Boş olamaz");
        }
    }
}
