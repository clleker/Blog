using BlogSite.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace BlogSite.Validations
{
    public class TagValidator : AbstractValidator<Tag>
    {
        public TagValidator()
        {
            RuleFor(x => x.TagName).NotEmpty().WithMessage("Tag Name Boş olamaz");
        }

    
    }
}
