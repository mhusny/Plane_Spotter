using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlaneSpotterAPI.Data;
using PlaneSpotterAPI.Model;
using System.Net;

namespace PlaneSpotterAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaneSpotterController : ControllerBase
    {
        private readonly DataContext _context;

        public PlaneSpotterController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<PlaneSpotter>>> GetAllSightings()
        {
            return Ok(await _context.PlaneSpotters.ToListAsync());
        }


        [HttpPost]
        public async Task<ActionResult<List<PlaneSpotter>>> AddSighting(PlaneSpotter sighting)
        {
            try
            {
                //sighting.Id = Guid.NewGuid();
                _context.PlaneSpotters.Add(sighting);
                await _context.SaveChangesAsync();

                return Ok(await _context.PlaneSpotters.ToListAsync());
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPut]
        public async Task<ActionResult<List<PlaneSpotter>>> UpdateSighting(PlaneSpotter sighting)
        {
            try
            {
                var sightings = await _context.PlaneSpotters.FindAsync(sighting.Id);
                if (sightings == null)
                    return BadRequest("Sighting not found");

                sightings.Planemodel = sighting.Planemodel;
                sightings.Planemake =  sighting.Planemake;
                sightings.Planeregistration = sighting.Planeregistration;
                sightings.Location = sighting.Location;
                sightings.DateTime = sighting.DateTime;
                sightings.Photo = sighting.Photo;

                await _context.SaveChangesAsync();

                return Ok(await _context.PlaneSpotters.ToListAsync());

            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult<List<PlaneSpotter>>> Delete(Guid Id)
        {
            try
            {
                var sightings = await _context.PlaneSpotters.FindAsync(Id);
                if (sightings == null)
                    return BadRequest("Sighting not found");

                _context.PlaneSpotters.Remove(sightings);
                await _context.SaveChangesAsync();

                return Ok(await _context.PlaneSpotters.ToListAsync());
            }
            catch (Exception)
            {

                throw;
            }
        }

        //[HttpPost("AddProduct")]
        //public async Task<IActionResult> AddProduct(IFormFile files)
        //{
        //    string fileGuid = Guid.NewGuid().ToString();
        //    var pathImage = Path.Combine(_hostEnvironment.ContentRootPath, "Images", fileGuid);
        //    var streamImage = new FileStream(pathImage, FileMode.Append);
        //    await files.CopyToAsync(streamImage);

        //    return Ok();


        //}

        [HttpPost("import")]
        public HttpResponseMessage ImportFile()
        {
            try
            {
                var files = Request.Form.Files;
                string getEnv = Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location);

                foreach (IFormFile file in files)
                {
                    if (file.Length == 0)
                        continue;

                    string tempFilename = Path.Combine(getEnv, file.FileName);
                    System.Diagnostics.Trace.WriteLine($"Saved file to: {tempFilename}");

                    using (var fileStream = new FileStream(tempFilename, FileMode.Create))
                    {
                        file.CopyTo(fileStream);
                    }
                }

                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
    
}
