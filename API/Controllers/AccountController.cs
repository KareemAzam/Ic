using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<IdentityUserExtend> _userManager;
        private readonly SignInManager<IdentityUserExtend> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(
            UserManager<IdentityUserExtend> userManager,
            SignInManager<IdentityUserExtend> signInManager,
            ITokenService tokenService,
            IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var identityUserExtend =
                await _userManager.FindUserAndUserProfileByEmailClaimsPrincipalAsync(HttpContext.User);
            // var email = HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Email)?.Value;

            // var identityUserExtend = await _userManager.FindByEmailAsync(email);
            //
            // identityUserExtend.IdentityUserProfile =
            //     _db.IdentityUserProfiles.SingleOrDefault(profile => profile.UserId == identityUserExtend.Id);

            return new UserDto
            {
                Email = identityUserExtend.Email,
                Token = _tokenService.CreateToken(identityUserExtend),
                DisplayName = identityUserExtend.IdentityUserProfile?.DisplayName
            };
        }

        [HttpGet("emailExists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            var identityUserExtend = await _userManager.FindUserAndAddressByEmailClaimsPrincipalAsync(HttpContext.User);

            return _mapper.Map<Address, AddressDto>(identityUserExtend.Address);
        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto addressDto)
        {
            var identityUserExtend = await _userManager.FindUserAndAddressByEmailClaimsPrincipalAsync(HttpContext.User);

            identityUserExtend.Address = _mapper.Map<AddressDto, Address>(addressDto);

            var identityResult = await _userManager.UpdateAsync(identityUserExtend);
            if (identityResult.Succeeded) return Ok(_mapper.Map<Address, AddressDto>(identityUserExtend.Address));
            
            return BadRequest("Problem Updating the User");
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var identityUserExtend =
                await _userManager.FindUserAndUserProfileByEmailClaimsPrincipalAsync(HttpContext.User);
            if (identityUserExtend == null) return Unauthorized(new ApiResponse(401));

            var signInResult =
                await _signInManager.CheckPasswordSignInAsync(identityUserExtend, loginDto.Password, false);
            if (!signInResult.Succeeded) return Unauthorized(new ApiResponse(401));

            return new UserDto
            {
                Email = identityUserExtend.Email,
                Token = _tokenService.CreateToken(identityUserExtend),
                DisplayName = identityUserExtend.IdentityUserProfile?.DisplayName
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (CheckEmailExistsAsync(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse
                {
                    Errors = new[] {"Email Address is in Use"}
                });
            }
            var identityUserExtend = new IdentityUserExtend()
            {
                Email = registerDto.Email,
                UserName = registerDto.Email,
                IdentityUserProfile = new IdentityUserProfile
                {
                    DisplayName = registerDto.DisplayName
                }
            };

            var identityResult = await _userManager.CreateAsync(identityUserExtend, registerDto.Password);
            if (!identityResult.Succeeded) return BadRequest(new ApiResponse(400));

            return new UserDto
            {
                Email = identityUserExtend.Email,
                Token = _tokenService.CreateToken(identityUserExtend),
                DisplayName = identityUserExtend.IdentityUserProfile.DisplayName
            };
        }
    }
}