using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UrlShortenerAPI.Models.Model;

namespace UrlShortenerApi.Core.Context
{
    public class ApplicationDbContext: IdentityDbContext<UserEntity>
    {
        public DbSet<UrlEntity> Urls { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {
            
        }

    }
}
