using BlogSite.Concrete;
using FluentValidation;


namespace BlogSite.Validations
{
    public class SubscribeValidator : AbstractValidator<Subscribe>
    {
        public SubscribeValidator()
        {
            RuleFor(x => x.Email).NotEmpty().WithMessage("Email Boş olamaz");
            
        }
    }
}
