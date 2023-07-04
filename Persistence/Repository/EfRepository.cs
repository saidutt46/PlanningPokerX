﻿using System;
using Application.RepositoryInterfaces;
using Domain.Common;
using Microsoft.EntityFrameworkCore;
using Persistence.Context;

namespace Persistence.Repository
{
    public abstract class EfRepository<T> : IRepository<T> where T : BaseEntity
    {
        protected readonly ApplicationDbContext _appDbContext;

        protected EfRepository(ApplicationDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public virtual async Task<T> GetById(Guid id)
        {
            return await _appDbContext.Set<T>().FindAsync(id);
        }

        public async Task<IList<T>> ListAll()
        {
            return await _appDbContext.Set<T>().ToListAsync();
        }

        //public async Task<T> GetSingleBySpec(ISpecification<T> spec)
        //{
        //    var result = await List(spec);
        //    return result.FirstOrDefault();
        //}

        //public async Task<IList<T>> List(ISpecification<T> spec)
        //{
        //    // fetch a Queryable that includes all expression-based includes
        //    var queryableResultWithIncludes = spec.Includes
        //        .Aggregate(_appDbContext.Set<T>().AsQueryable(),
        //            (current, include) => current.Include(include));

        //    // modify the IQueryable to include any string-based include statements
        //    var secondaryResult = spec.IncludeStrings
        //        .Aggregate(queryableResultWithIncludes,
        //            (current, include) => current.Include(include));

        //    // return the result of the query using the specification's criteria expression
        //    return await secondaryResult
        //                    .Where(spec.Criteria)
        //                    .ToListAsync();
        //}


        public async Task<T> Add(T entity)
        {
            _appDbContext.Set<T>().Add(entity);
            await _appDbContext.SaveChangesAsync();
            return entity;
        }

        public async Task Update(T entity)
        {
            _appDbContext.Entry(entity).State = EntityState.Modified;
            await _appDbContext.SaveChangesAsync();
        }

        public async Task Delete(T entity)
        {
            _appDbContext.Set<T>().Remove(entity);
            await _appDbContext.SaveChangesAsync();
        }
    }
}

