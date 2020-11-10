using FluentValidation;
using PYBS.Entity.Dtos.AppUserDtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Business.ValidationRules.FluentValidation
{
    public class AppUserAddDtoValidator : AbstractValidator<AppUserAddDto>
    {
        public AppUserAddDtoValidator()
        {
            RuleFor(x => x.Username).NotEmpty().WithMessage("Kullanıcı adı boş geçilemez");
            RuleFor(x => x.Password).NotEmpty().WithMessage("Şifre alanı boş geçilemez");
        }
    }
}
