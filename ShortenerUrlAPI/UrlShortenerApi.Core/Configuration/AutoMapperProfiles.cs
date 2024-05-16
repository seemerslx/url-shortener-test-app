using AutoMapper;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UrlShortenerAPI.Models.DTO;
using UrlShortenerAPI.Models.Model;

namespace UrlShortenerApi.Core.Configurations
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UrlEntity, UrlDTO>()
                    .ForMember(dest => dest.ShortUrl, opt => opt.MapFrom<ShortUrlResolver>());
        }

    }

    public class ShortUrlResolver : IValueResolver<UrlEntity, UrlDTO, string>
    {
        private readonly HttpContext _httpContext;

        public ShortUrlResolver(IHttpContextAccessor httpContextAccessor)
        {
            _httpContext = httpContextAccessor.HttpContext;
        }

        public string Resolve(UrlEntity source, UrlDTO destination, string destMember, ResolutionContext context)
        {
            return $"{_httpContext.Request.Scheme}://{_httpContext.Request.Host}/{source.ShortUrl}";
        }
    }
}
