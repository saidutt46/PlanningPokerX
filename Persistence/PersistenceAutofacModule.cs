using System;
using Application.RepositoryInterfaces;
using Application.ServiceInterfaces;
using Application.Services;
using Autofac;
using Persistence.Repository;

namespace Persistence
{
	public class PersistenceAutofacModule : Module
	{
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<GameSessionRepository>().As<IGameSessionRepository>().InstancePerLifetimeScope();
        }
    }
}

