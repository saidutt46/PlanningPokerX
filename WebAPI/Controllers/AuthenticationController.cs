using Application.Helpers;
using Application.Models;
using Application.ViewResponses;
using AutoMapper;
using Azure;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Extensions;
using WebAPI.ViewModels;

namespace JWTAuthentication.Controllers
{
    [Route("user")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;


        public AuthenticateController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IMapper mapper)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());
            var user = await userManager.FindByNameAsync(model.Username!);
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password!) == false)
            {
                return BadRequest("Incorrect Password, please retry with a valid password for given user");
            }
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password!))
            {
                var userRoles = await userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName!),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]!));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );
                var convertedToken = new JwtSecurityTokenHandler().WriteToken(token);

                UserProfileDto currentUser = _mapper.Map<ApplicationUser, UserProfileDto>(user);
                LoginResponse response = new LoginResponse
                {
                    Token = convertedToken,
                    Expiration = token.ValidTo,
                    UserProfile = currentUser
                };
                return Ok(response);
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());
            try
            {
                var userExists = await userManager.FindByNameAsync(model.Username!);
                if (userExists != null)
                    return StatusCode(StatusCodes.Status500InternalServerError, new AuthResponse { Status = "Error", Message = "User already exists!" });

                ApplicationUser user = new ApplicationUser()
                {
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = model.Username
                };
                var result = await userManager.CreateAsync(user, model.Password!);
                if (!result.Succeeded)
                {
                    var message = "";
                    foreach (var error in result.Errors)
                    {
                        message += error.Description + ", ";
                    }

                    return StatusCode(StatusCodes.Status500InternalServerError, new AuthResponse { Status = "Error", Message = message });
                }

                return Ok(new AuthResponse { Success = true, Status = "Success", Message = "User created successfully!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterModel model)
        {
            var userExists = await userManager.FindByNameAsync(model.Username!);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new AuthResponse { Status = "Error", Message = "User already exists!" });

            ApplicationUser user = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await userManager.CreateAsync(user, model.Password!);
            if (!result.Succeeded)
            {
                var message = "";
                foreach (var error in result.Errors)
                {
                    message += error.Description + ", ";
                }

                return StatusCode(StatusCodes.Status500InternalServerError, new AuthResponse { Status = "Error", Message = message });
            }

            if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
            if (!await roleManager.RoleExistsAsync(UserRoles.User))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.User));

            if (await roleManager.RoleExistsAsync(UserRoles.Admin))
            {
                await userManager.AddToRoleAsync(user, UserRoles.Admin);
            }

            return Ok(new AuthResponse { Success = true, Status = "Success", Message = "User created successfully!" });
        }
    }
}