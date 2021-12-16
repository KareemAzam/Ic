using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities.Identity
{
    [Table("AspNetUserProfile")]
    public class IdentityUserProfile
    {
        public int Id { get; set; }
        
        [StringLength(50)]
        public string FirstName { get; set; }
        
        [StringLength(50)]
        public string LastName { get; set; }
        
        [StringLength(100)]
        [Required]
        public string DisplayName { get; set; }

        [Required]
        public string UserId { get; set; }
        public IdentityUserExtend User { get; set; }
    }
}