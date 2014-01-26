using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Werewolf2.Startup))]
namespace Werewolf2
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
