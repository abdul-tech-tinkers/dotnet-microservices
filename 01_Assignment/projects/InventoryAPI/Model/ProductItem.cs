using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace InventoryAPI.Model
{
    [Table("ProductItems")]
    public class ProductItem
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Lot { get; set; }

        [Required]
        public string SerializedGlobalTradeItemNumber { get; set; }

        [Required]
        public DateTime ExpirationDate { get; set; }

        public CheckoutReason ReasonForCheckout { get; set; }

        public DateTime CheckInDate { get; set; } = DateTime.Now;


        public DateTime CheckOutDate { get; set; } = DateTime.MinValue;

        public string ProductId { get; set; } // GlobalTradeItemNumber
    }
    public enum CheckoutReason
    {
        None,
        Expired,
        Consumption,
        LostAndNotFound,
        Leakage,
        RemovedFromSystem
    }
}
