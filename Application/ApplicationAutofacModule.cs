using System;
using Application.ServiceInterfaces;
using Application.Services;
using Autofac;

namespace Application
{
	public class ApplicationAutofacModule : Module
	{
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<GameSessionService>().As<IGameSessionService>().InstancePerLifetimeScope();
        }
    }
}   