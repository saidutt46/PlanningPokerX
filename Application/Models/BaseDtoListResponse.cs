using System;
namespace Application.Models
{
    public class BaseDtoListResponse<T>
    {
        public IList<T>? Payload { get; set; }
        public DateTime MessageDateTime { get; set; }
        public string? Error { get; set; }
        public bool Success { get; set; }

        public BaseDtoListResponse(IList<T> payload)
        {
            Payload = payload;
            Success = true;
            MessageDateTime = DateTime.UtcNow;
        }

        public BaseDtoListResponse(string error)
        {
            Error = error;
            Success = false;
            MessageDateTime = DateTime.UtcNow;
        }
    }
}

