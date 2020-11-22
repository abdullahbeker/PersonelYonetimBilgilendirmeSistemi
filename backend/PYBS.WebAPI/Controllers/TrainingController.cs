using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PYBS.Business.Abstract.TrainingService;
using PYBS.Entity.Dtos.TrainingDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PYBS.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainingController : ControllerBase
    {
        private ITrainingService _trainingService;

        public TrainingController(ITrainingService trainingService)
        {
            _trainingService = trainingService;
        }

    }
}
