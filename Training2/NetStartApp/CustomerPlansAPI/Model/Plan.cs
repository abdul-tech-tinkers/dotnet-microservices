using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CustomerPlansAPI.Model
{
    [Table("CustomerPlans")]
    public class Plan
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name of plan cannot be empty")]
        public string? Name { get; set; }

        [Required]
        public string? Description { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Invalid cost value")]
        public double MonthlyCost { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public double QuarterlyCost { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public double HalfYearlyCost { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public double YearlyCost { get; set; }

        [Required]
        [Range(1, 100)]
        public int MaxDeviceSupport { get; set; }

        [Required]
        public string? Features { get; set; }
    }
}
