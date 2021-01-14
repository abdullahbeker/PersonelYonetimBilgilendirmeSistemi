using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PYBS.DataAccess.Concrete.EntityFrameworkCore.Context;
using PYBS.Entity.Concrete;
using PYBS.Entity.Dtos.AssetsDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PYBS.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private PYBSContext context = new PYBSContext();
        public AssetsController(IMapper mapper)
        {
            _mapper = mapper;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddAsset(AssetAddDto assetAddDto)
        {
            try
            {
                var asset = _mapper.Map<Asset>(assetAddDto);
                await context.Assets.AddAsync(asset);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> UpdateAsset(AssetUpdateDto assetUpdateDto)
        {
            try
            {
                var asset = _mapper.Map<Asset>(assetUpdateDto);
                asset.UpdatedAt = DateTime.Now;
                context.Assets.Update(asset);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> GetAsset(int assetId)
        {
            try
            {
                var asset = await context.Assets.FirstOrDefaultAsync(a => a.Id == assetId);
                if (asset==null)
                {
                    return BadRequest();
                }
                return Ok(asset);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> GetAssetes()
        {
            try
            {
                var assetes = await context.Assets.ToListAsync();
                return Ok(assetes);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> GetAssetesByPersonnelId(int personnelId)
        {
            try
            {
                var assetes = await context.Assets.Where(a=>a.PersonnelId==personnelId).ToListAsync();
                return Ok(assetes);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteAsset(int assetId)
        {
            try
            {
                var asset = await context.Assets.FirstOrDefaultAsync(a => a.Id == assetId);
                if (asset == null)
                {
                    return BadRequest();
                }
                context.Assets.Remove(asset);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
