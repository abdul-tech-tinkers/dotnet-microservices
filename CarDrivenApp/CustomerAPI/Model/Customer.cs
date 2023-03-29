using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CustomerAPI.Model
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }
    }

    public class Vehicle
    {
       [Key]
       [DatabaseGenerated(DatabaseGeneratedOption.None)]
       public int Id { get; set; }

        public string Name { get; set; }
    }
}
