using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PYBS.Business.Abstract.TrainingService;
using PYBS.DataAccess.Concrete.EntityFrameworkCore.Context;
using PYBS.Entity.Concrete.TrainingEntities;
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
        private readonly IMapper _mapper;
        private PYBSContext context = new PYBSContext();

        public TrainingController(IMapper mapper)
        {
            _mapper = mapper;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddTraining(TrainingAddDto trainingAddDto)
        {
            try
            {
                var training = _mapper.Map<Training>(trainingAddDto);
                context.Trainings.Add(training);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllTrainings()
        {
            try
            {
                var trainings = await context.Trainings.ToListAsync();
                return Ok(trainings);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> GetTraining(int trainingId)
        {
            try
            {
                var training = await context.Trainings.FirstOrDefaultAsync(x=>x.Id== trainingId);
                if (training==null)
                {
                    return BadRequest();
                }
                return Ok(training);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteTraining(int trainingId)
        {
            try
            {
                var training = await context.Trainings.FirstOrDefaultAsync(x => x.Id == trainingId);
                if (training == null)
                {
                    return BadRequest();
                }
                context.Trainings.Remove(training);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
