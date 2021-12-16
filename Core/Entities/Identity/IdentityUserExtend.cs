using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity
{
    public class IdentityUserExtend : IdentityUser
    {
        // navigation
        public Address Address { get; set; }
        public IdentityUserProfile IdentityUserProfile { get; set; }
    }
}