using System;
namespace Application.Models
{
    public class BaseDtoResponse<T>
    {
        public T? Payload { get; private set; }
        public DateTime MessageDateTime { get; set; }
        public string? Error { get; private set; }
        public bool Success { get; private set; }

        public BaseDtoResponse(T payload)
        {
            Payload = payload;
            Success = true;
            MessageDateTime = DateTime.UtcNow;
        }

        public BaseDtoResponse(string error)
        {
            MessageDateTime = DateTime.UtcNow;
            Success = false;
            Error = error;
        }
    }   
}

