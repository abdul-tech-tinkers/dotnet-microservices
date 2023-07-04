using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CartsAPI.Model
{
    public class CartItem
    {
        [Required]
        public string SerializedGlobalTradeItemNumber { get;set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public string ProductName { get; set; }

        [Required]
        public string VendorName { get; set; }
    }
}
