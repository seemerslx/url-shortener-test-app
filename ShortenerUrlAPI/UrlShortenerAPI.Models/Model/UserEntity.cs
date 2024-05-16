using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UrlShortenerAPI.Models.Model
{
    public class UserEntity: IdentityUser
    {
        public ICollection<UrlEntity> Urls { get; set; }
    }
}
