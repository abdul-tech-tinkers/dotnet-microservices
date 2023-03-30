using ReservationAPI.Models;

namespace ReservationAPI.Interface
{
    public interface IReservation
    {
        Task<List<Reservation>> GetReservations();
        Task UpdateMailStatus(int id);
    }
}
