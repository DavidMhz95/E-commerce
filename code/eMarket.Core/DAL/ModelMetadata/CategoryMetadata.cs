using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;

namespace Doorway.Core.DAL {
    
    [MetadataType(typeof(CategoryMetadata))]
    partial class Category { }

    public class CategoryMetadata {

        [Required(ErrorMessage = "*")]
        [Display(Name = "Code")]
        public int Id { get; set; }

        [Required(ErrorMessage = "*")]
        [Display(Name="Name")]
        [StringLength(50, ErrorMessage ="Maximum lenght is 50 chars")]
        public string Name { get; set; }

        [Display(Name="Color")]
        public string Color { get; set; }

        [Display(Name="Contribute to worktime")]
        public Nullable<byte> ContributeToWorktime { get; set; }

        [Required(ErrorMessage = "*")]
        [Display(Name= "Created")]
        public System.DateTime CreatedOn { get; set; }

        [Display(Name = "Updated")]
        public Nullable<System.DateTime> UpdatedOn { get; set; }

        [Display(Name = "Deleted")]
        public Nullable<System.DateTime> DeletedOn { get; set; }
    }
}
