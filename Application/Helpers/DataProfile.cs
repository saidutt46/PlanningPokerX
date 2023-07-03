using System;
using Application.Models;
using AutoMapper;
using Domain.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Application.Helpers
{
    public class DataProfile : Profile
    {
        public DataProfile()
        {
            CreateMap<ApplicationUser, UserProfileDto>();
        }
    }
}

