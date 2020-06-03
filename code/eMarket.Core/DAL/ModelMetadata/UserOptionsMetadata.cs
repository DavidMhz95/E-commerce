using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Doorway.Core.DAL {

    [MetadataType(typeof(UserOption))]
    partial class UserOptionMetadata {

        [Required(ErrorMessage = "*")]
        [Display(Name = "Code")]
        public int Id { get; set; }

        [Required(ErrorMessage = "*")]
        [Display(Name = "User")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "*")]
        [Display(Name = "Name")]
        [StringLength(50, ErrorMessage = "Maximum length is 50 chars")]
        public string Name { get; set; }

        [Required(ErrorMessage = "*")]
        [Display(Name = "Value")]
        [StringLength(255, ErrorMessage = "Maximum length is 255 chars")]
        public string Value { get; set; }
    }
}
