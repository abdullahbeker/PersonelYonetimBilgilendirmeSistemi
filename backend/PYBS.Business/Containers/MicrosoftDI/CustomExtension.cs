using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using PYBS.Business.Abstract;
using PYBS.Business.Abstract.TrainingService;
using PYBS.Business.Concrete;
using PYBS.Business.Concrete.TrainingManager;
using PYBS.Business.ValidationRules.FluentValidation;
using PYBS.DataAccess.Abstract;
using PYBS.DataAccess.Abstract.TrainingDals;
using PYBS.DataAccess.Concrete.EntityFrameworkCore.Repositories;
using PYBS.DataAccess.Concrete.EntityFrameworkCore.Repositories.TrainingRepositories;
using PYBS.Entity.Dtos.AppUserDtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Business.Containers.MicrosoftDI
{
    public static class CustomExtension
    {
        public static void AddDependencies(this IServiceCollection services)
        {
            services.AddScoped(typeof(IGenericService<>), typeof(GenericManager<>));
            services.AddScoped(typeof(IGenericDal<>), typeof(EfGenericRepository<>));

            services.AddScoped<IAppUserDal, EfAppUserRepository>();
            services.AddScoped<IAppUserService, AppUserManager>();

            services.AddScoped<IAppRoleDal, EfAppRoleRepository>();
            services.AddScoped<IAppRoleService, AppRoleManager>();

            services.AddScoped<IAppUserRoleDal, EfAppUserRoleRepository>();
            services.AddScoped<IAppUserRoleService, AppUserRoleManager>();

            services.AddScoped<IJwtService, JwtManager>();

            services.AddTransient<IValidator<AppUserLoginDto>, AppUserLoginDtoValidator>();
            services.AddTransient<IValidator<AppUserAddDto>, AppUserAddDtoValidator>();

            services.AddScoped<ITrainingDal, EfTrainingRepository>();
            services.AddScoped<ITrainingService, TrainingManager>();

            services.AddScoped<ITrainingPersonnelDal, EfTrainingPersonnelRepository>();
            services.AddScoped<ITrainingPersonnelService, TrainingPersonnelManager>();

            services.AddScoped<ITrainingStatusDal, EfTrainingStatusRepository>();
            services.AddScoped<ITrainingStatusService, TrainingStatusManager>();
        }
    }
}
