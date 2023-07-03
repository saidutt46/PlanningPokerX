using System;
using Application.Models;

namespace Application.ViewResponses
{
    public class LoginResponse
    {
        public string? Token { get; set; }
        public DateTime Expiration { get; set; }
        public UserProfileDto? UserProfile { get; set; }
    }
}

