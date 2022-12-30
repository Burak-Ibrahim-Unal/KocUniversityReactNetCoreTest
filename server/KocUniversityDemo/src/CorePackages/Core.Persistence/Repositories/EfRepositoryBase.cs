﻿using Microsoft.EntityFrameworkCore.Query;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Core.Persistence.Pagination;

namespace Core.Persistence.Repositories
{
    public class EfRepositoryBase<TEntity, TContext> : IAsyncRepository<TEntity>, ISyncRepository<TEntity>
        where TEntity : Entity
        where TContext : DbContext
    {

        protected TContext Context { get; }

        public EfRepositoryBase(TContext context)
        {
            Context = context;
        }


        #region Async Codes
        // Async Codes

        /// <summary>
        /// This method finds related entity record by the predicate
        /// </summary>
        /// <param name="GetAsync"></param>
        /// <returns></returns>
        public async Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await Context.Set<TEntity>().FirstOrDefaultAsync(predicate); // find first record...
        }


        /// <summary>
        /// This method gets all related entity records with paginate properties...We can also use predicates.
        /// Entity framework tracking  disabled,paginate index starts from 0 and get 10 record by page
        /// </summary>
        /// <param name="GetListAsync"></param>
        /// <returns></returns>
        public async Task<PagedList<TEntity>> GetListAsync(Expression<Func<TEntity,
            bool>> filter = null, Func<IQueryable<TEntity>,
            IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            int pageNumber = 1, int pageSize = 10, bool enableTracking = true,
            CancellationToken cancellationToken = default)
        {
            //IQueryable<TEntity> queryable = Query();
            IQueryable<TEntity> queryable = Context.Set<TEntity>();

            if (!enableTracking) queryable = queryable.AsNoTracking();
            if (include != null) queryable = include(queryable);
            if (filter != null) queryable = queryable.Where(filter);
            if (orderBy != null) queryable = orderBy(queryable);

            return await PagedList<TEntity>.ToPageListAsync(queryable, pageNumber, pageSize);
        }

        /// <summary>
        /// This method finds related entity record by the query
        /// </summary>
        /// <param name="Query"></param>
        /// <returns></returns>
        public IQueryable<TEntity> Query()
        {
            return Context.Set<TEntity>();
        }


        /// <summary>
        /// This method adds related entity record
        /// </summary>
        /// <param name="AddAsync"></param>
        /// <returns></returns>
        public async Task<TEntity> AddAsync(TEntity entity)
        {
            Context.Entry(entity).State = EntityState.Added; // entity framework tracking
            await Context.SaveChangesAsync();
            return entity;

        }


        /// <summary>
        /// This method removes related entity record
        /// </summary>
        /// <param name="DeleteAsync"></param>
        /// <returns></returns>
        public async Task<TEntity> DeleteAsync(TEntity entity)
        {
            Context.Entry(entity).State = EntityState.Deleted; // entity framework tracking
            await Context.SaveChangesAsync();
            return entity;
        }


        /// <summary>
        /// This method updates related entity record
        /// </summary>
        /// <param name="UpdateAsync"></param>
        /// <returns></returns>
        public async Task<TEntity> UpdateAsync(TEntity entity)
        {
            Context.Entry(entity).State = EntityState.Modified; // entity framework tracking
            await Context.SaveChangesAsync();
            return entity;
        }
        #endregion

        #region Sync Codes
        // Sync Codes

        /// <summary>
        /// This method finds related entity record by the predicate
        /// </summary>
        /// <param name="Get"></param>
        /// <returns></returns>
        public TEntity Get(Expression<Func<TEntity, bool>> predicate)
        {
            return Context.Set<TEntity>().FirstOrDefault(predicate);
        }



        /// <summary>
        /// This method gets all related entity records with paginate properties...We can also use predicates.
        /// Entity framework tracking  disabled,paginate index starts from 0 and get 10 record by page
        /// </summary>
        /// <param name="GetList"></param>
        /// <returns></returns>
        public PagedList<TEntity> GetList(Expression<Func<TEntity, bool>> predicate = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            int pageNumber = 0, int pageSize = 10,
            bool enableTracking = true)
        {
            IQueryable<TEntity> queryable = Query();

            if (!enableTracking) queryable = queryable.AsNoTracking();
            if (include != null) queryable = include(queryable);
            if (predicate != null) queryable = queryable.Where(predicate);
            if (orderBy != null) queryable = orderBy(queryable);


            return PagedList<TEntity>.ToPageList(queryable, pageNumber, pageSize);
        }



        /// <summary>
        /// This method adds related entity record
        /// </summary>
        /// <param name="Add"></param>
        /// <returns></returns>
        public TEntity Add(TEntity entity)
        {
            Context.Entry(entity).State = EntityState.Added;
            Context.SaveChanges();
            return entity;
        }


        /// <summary>
        /// This method updates related entity record
        /// </summary>
        /// <param name="Update"></param>
        /// <returns></returns>
        public void Update(TEntity entity)
        {
            Context.Entry(entity).State = EntityState.Modified;
            Context.SaveChanges();
        }


        /// <summary>
        /// This method removes related entity record
        /// </summary>
        /// <param name="Delete"></param>
        /// <returns></returns>
        public void Delete(TEntity entity)
        {
            Context.Entry(entity).State = EntityState.Deleted;
            Context.SaveChanges();
        }
        #endregion
    }
}
