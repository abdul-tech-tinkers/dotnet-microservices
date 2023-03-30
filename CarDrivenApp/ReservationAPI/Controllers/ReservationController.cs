using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationAPI.Interface;
using ReservationAPI.Models;

namespace ReservationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReservation reservation;

        public ReservationController(IReservation reservation)
        {
            this.reservation = reservation;
        }
        [HttpGet]
        public Task<List<Reservation>> GetReservations()
        {
            return this.reservation.GetReservations();
        }
    }
}
