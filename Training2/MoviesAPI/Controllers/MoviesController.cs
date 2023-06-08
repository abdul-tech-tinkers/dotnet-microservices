using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.Data;
using MoviesAPI.Model;
using System.Numerics;

namespace MoviesAPI.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly ILogger<MoviesController> logger;
        private readonly MoviesDbContext dbContext;

        public MoviesController(ILogger<MoviesController> logger, MoviesDbContext dbContext)
        {
            this.logger = logger;
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movie>>> GetMovies()
        {
            var Movies = await dbContext.Movies.ToListAsync();
            return Ok(Movies);
        }

        [HttpGet("GetMoviesByPage")]
        public async Task<ActionResult<IEnumerable<Movie>>> GetMoviesByPage([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            int recordsToSkip = (page - 1) * pageSize;
            var Movies = await dbContext.Movies.Skip(recordsToSkip).Take(pageSize).ToListAsync();
            return Ok(Movies);
        }

        [HttpGet("{id:int:min(1)}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Movie>> GetMoviesById(int id)
        {
            if (id <= 0)
            {
                return NotFound();
            }
            var Movie = await dbContext.Movies.FindAsync(id);
            if (Movie == null)
            {
                return NotFound();
            }
            return Ok(Movie);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Movie))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Movie>> CreateMovie([FromBody] MovieRequestModel movieRequestModel)
        {
            TryValidateModel(movieRequestModel);
            if (movieRequestModel == null || !ModelState.IsValid)
            {
                return BadRequest("Invalid Movie received");
            }

            Movie movie = new Movie()
            {
                Description = movieRequestModel.Description,
                Actors = movieRequestModel.Actors,
                Directors = movieRequestModel.Directors,
                Genres = movieRequestModel.Genres,
                ReleaseYear = movieRequestModel.ReleaseYear,
                ShortVideoUrl = movieRequestModel.ShortVideoUrl,
                Status = "Upcoming",
                ThumbnailUrl = movieRequestModel.ThumbnailUrl,
                Title = movieRequestModel.Title
            };

            await dbContext.AddAsync(movie);
            await dbContext.SaveChangesAsync();
            //return Created($"/api/Movies/{Movie.Id}", Movie);
            return CreatedAtAction(nameof(GetMoviesById), new { id = movie.Id }, movie);
        }


        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> Delete(int id)
        {
            var Movie = await dbContext.Movies.FindAsync(id);
            if (Movie == null)
            {
                return NotFound();
            }
            dbContext.Movies.Remove(Movie);
            await dbContext.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK, Type =typeof(Movie))]
        public async Task<ActionResult<Movie>> Update([FromRoute] int id, [FromBody] Movie Movie)
        {
            if (id != Movie.Id)
            {
                return BadRequest();
            }
            TryValidateModel(Movie);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var existingMovie = await dbContext.Movies.FindAsync(id);
            if (existingMovie == null)
            {
                return NotFound();
            }
            existingMovie.Title = Movie.Title;
            existingMovie.Description = Movie.Description;
            existingMovie.Actors = Movie.Actors;
            existingMovie.Directors = Movie.Directors;
            existingMovie.ReleaseYear = Movie.ReleaseYear;
            existingMovie.Genres = Movie.Genres;
            existingMovie.ThumbnailUrl = Movie.ThumbnailUrl;
            existingMovie.ShortVideoUrl = Movie.ShortVideoUrl;
            existingMovie.Status = Movie.Status;

            dbContext.Update(existingMovie);
            await dbContext.SaveChangesAsync();

            return Ok(existingMovie);


        }
    }
}
