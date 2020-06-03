using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;

namespace Doorway.Core.DAL{

    [MetadataType(typeof(EventMetadata))]
    partial class Event { }

    public class EventMetadata {

        [Required(ErrorMessage = "*")]
        [Display(Name = "Code")]
        public int Id { get; set; }

        [Required(ErrorMessage = "*")]
        [Display(Name = "Start at")]
        public System.DateTime StartAt { get; set; }

        [Display(Name = "End at")]
        public Nullable<System.DateTime> EndAt { get; set; }

        [Display(Name = "Comments")]
        [StringLength(50, ErrorMessage ="Maximum length is 50 chars")]
        public string Comments { get; set; }

        [Required(ErrorMessage = "*")]
        [Display(Name = "Category")]
        public Nullable<int> Category { get; set; }

        [Required(ErrorMessage = "*")]
        [Display(Name = "User")]
        public Nullable<int> UserId { get; set; }

        [Required(ErrorMessage = "*")]
        [Display(Name = "Created")]
        public System.DateTime CreatedOn { get; set; }

        [Display(Name = "UPdated")]
        public Nullable<System.DateTime> UpdatedOn { get; set; }

        [Display(Name = "Deleted")]
        public Nullable<System.DateTime> DeletedOn { get; set; }
    }
}
