using System.ComponentModel.DataAnnotations;

namespace InventoryAPI.Model
{
    public class CheckoutRequest
    {
        [Required]
        public string SerializedGlobalTradeItemNumber { get; set; }

        [Required]
        public CheckoutReason ReasonForCheckout { get; set; }
    }
}
