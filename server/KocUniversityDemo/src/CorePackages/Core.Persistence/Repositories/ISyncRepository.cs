using Core.Persistence.Pagination;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Persistence.Repositories
{
    public interface ISyncRepository<T> where T : Entity
    {
        // linq,predicate,expression,func...
        T Get(Expression<Func<T, bool>> predicate);

        PagedList<T> GetList(Expression<Func<T, bool>> predicate = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null,
            int index = 0,
            int size = 10,
            bool enableTracking = true);


        IQueryable<T> Query();
        T Add(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}
