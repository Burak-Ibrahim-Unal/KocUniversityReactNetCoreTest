using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application.Pipelines.Caching
{
    public class CacheSettings
    {
        IConfiguration _configuration;

        public int SlidingExpiration { get; set; }

        public CacheSettings(IConfiguration configuration)
        {
            _configuration = configuration;
            SlidingExpiration = configuration.GetValue<int>("CacheSettings:SlidingExpiration");
        }
    }
}
