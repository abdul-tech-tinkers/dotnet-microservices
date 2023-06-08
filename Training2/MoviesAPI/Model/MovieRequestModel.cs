using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.Model
{
    public class MovieRequestModel
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Actors { get; set; } = string.Empty;

        [Required]
        public string Directors { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public int ReleaseYear { get; set; }

        [Required]
        public string Genres { get; set; } = string.Empty;

        [DataType(DataType.Url)]
        public string ThumbnailUrl { get; set; } = string.Empty;

        [DataType(DataType.Url)]
        public string ShortVideoUrl { get; set; } = string.Empty;
    }
}
