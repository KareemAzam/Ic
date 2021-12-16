using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class UserManagerExtension 
    {
        public static async Task<IdentityUserExtend> FindUserAndAddressByEmailClaimsPrincipalAsync(this UserManager<IdentityUserExtend> input,ClaimsPrincipal claimsPrincipal)
        {
            var email = claimsPrincipal.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Email)?.Value;
            return await input.Users
                .Include(x => x.Address)
                .SingleOrDefaultAsync(x=> x.Email == email);
        }

        public static async Task<IdentityUserExtend> FindUserByEmailClaimsPrincipal(this UserManager<IdentityUserExtend> input,ClaimsPrincipal claimsPrincipal)
        {
            var email = claimsPrincipal.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Email)?.Value;
            return await input.Users
                .SingleOrDefaultAsync(x=> x.Email == email);
        }
        
        public static async Task<IdentityUserExtend> FindUserAndUserProfileByEmailClaimsPrincipalAsync(this UserManager<IdentityUserExtend> input,ClaimsPrincipal claimsPrincipal)
        {
            var email = claimsPrincipal.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Email)?.Value;
            return await input.Users
                .Include(x => x.IdentityUserProfile)
                .SingleOrDefaultAsync(x=> x.Email == email);
        }
    }
}