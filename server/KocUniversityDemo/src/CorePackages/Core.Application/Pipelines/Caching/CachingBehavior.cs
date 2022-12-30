using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application.Pipelines.Caching
{
    public class CachingBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : ICachableRequest, IRequest<TResponse>
    {
        IDistributedCache _cache;
        ILogger<CachingBehavior<TRequest, TResponse>> _logger;
        CacheSettings _settings;

        public CachingBehavior(IDistributedCache cache, ILogger<CachingBehavior<TRequest, TResponse>> logger, CacheSettings settings)
        {
            _cache = cache;
            _logger = logger;
            _settings = settings;
        }

        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            TResponse response;
            if (request.BypassCache) return await next();

            async Task<TResponse> GetResponseAndAddToCache()
            {
                response = await next();
                //var slidingExpiration = request.SlidingExpiration == null ? TimeSpan.FromMinutes(15) : request.SlidingExpiration;
                var slidingExpiration = request.SlidingExpiration == null ? TimeSpan.FromHours(_settings.SlidingExpiration) : request.SlidingExpiration;
                var cacheOptions = new DistributedCacheEntryOptions { SlidingExpiration = slidingExpiration };
                var serializedData = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(response));
                await _cache.SetAsync(request.CacheKey, serializedData, cacheOptions, cancellationToken);
                return response;
            }

            var cachedResponse = await _cache.GetAsync(request.CacheKey, cancellationToken);
            if (cachedResponse != null)
            {
                response = JsonConvert.DeserializeObject<TResponse>(Encoding.Default.GetString(cachedResponse)); // Default = UTF8
                _logger.LogInformation($"Fetched from Cache -> {request.CacheKey}");
            }
            else
            {
                response = await GetResponseAndAddToCache();
                _logger.LogInformation($"Added to cache -> {request.CacheKey}");
            }

            return response;
        }
    }
}