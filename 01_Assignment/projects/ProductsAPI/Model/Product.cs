using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductsAPI.Model
{
    [Table("Products")]
    public class Product
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string GlobalTradeItemNumber { get; set; }

        [Required]
        public string MaterialNumber { get; set; }

        [Required]
        public string Vendoer { get; set; }

        public string UnitOfMeasure { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime UpdatedDate { get; set; } = DateTime.Now;

        [Required]
        public Category ProductCategory { get; set; }

        [Required]
        public bool IsActive { get; set; } = true;
    }
    public enum Category
    {
        Reagent,
        Consumable
    }
}
