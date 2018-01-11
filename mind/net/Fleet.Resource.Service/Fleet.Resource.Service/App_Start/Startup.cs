using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Owin;
using RedQuick.Configuration;
using RedQuick.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Fleet.Resource.Service
{
    public partial class Startup
    {
        public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }

        public static string PublicClientId { get; private set; }

        public void ConfigureAuth(IAppBuilder app)
        {


            var GoogleClientId = RedConfiguration.GoogleClientId;
            var GoogleClientSecret = RedConfiguration.GoogleClientSecret;

            var facebookClientId = RedConfiguration.FacebookClientId;
            var facebookSecret = RedConfiguration.FacebookClientSecret;

            var microsoftAccountClientId = RedConfiguration.MicrosoftClientId;
            var microsoftAccountSecret = RedConfiguration.MicrosoftClientSecret;

            var twitterAccountClientId = RedConfiguration.TwitterClientId;
            var twitterAccountSecret = RedConfiguration.TwitterClientSecret;


            //Func<IRedIdentityBridge> func = () =>
            //{
            //    return new RedIdentityBridge(ProjectStrapper.Resolve<IUserArbiter>(), ProjectStrapper.Resolve<IUserInfoService>());
            //};
            // StartupConfiguration.SetupHeroIdentityFactory(func);
            StartupConfiguration.SetupMicrosoftAccount(microsoftAccountClientId, microsoftAccountSecret);
            StartupConfiguration.SetupMicrosoftAccount(twitterAccountClientId, twitterAccountSecret);
            StartupConfiguration.SetupGoogle(GoogleClientId, GoogleClientSecret);
            StartupConfiguration.SetupFacebook(facebookClientId, facebookSecret);
            StartupConfiguration.RedQuickUrlScheme = "FleetWEB";
            // StartupConfiguration.SetupAbsoluteUriRedirect("/Home/Granted");
            var authserveroptions = StartupConfiguration.OAuthAuthorizationServerOptions();
            StartupConfiguration.ConfigureAuth("/Account/Login", app, authserveroptions, RedConfiguration.ConnectionString);

        }

    }
}