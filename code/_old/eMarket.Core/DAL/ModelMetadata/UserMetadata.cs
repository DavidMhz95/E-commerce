using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;

namespace Doorway.Core.DAL {

    [MetadataType(typeof(UserMetadata))]
    partial class User { }

    public class UserMetadata {

        [Required(ErrorMessage = "*")]
        [Display(Name="Code")]
        public int Id { get; set; }

        [Required(ErrorMessage = "*")]
        [Display(Name = "User Login")]
        public string Login { get; set; }

        [Display(Name = "User Name")]
        [StringLength(50, ErrorMessage = "Maximum length is 50 chars")]
        public string Name { get; set; }

        [Display(Name = "Picture")]
        public byte[] Picture { get; set; }

        [Required(ErrorMessage = "*")]
        [Display(Name = "Created")]
        //public System.DateTime CreatedOn { get { return CreatedOn.ToUniversalTime(); } set { } }
        public System.DateTime CreatedOn { get; set; }

        [Display(Name = "Updated")]
        public Nullable<System.DateTime> UpdatedOn { get; set; }

        [Display(Name = "Deleted")]
        public Nullable<System.DateTime> DeletedOn { get; set; }

        [Display(Name = "Role")]
        public Nullable<byte> Role { get; set; }
    }
}
